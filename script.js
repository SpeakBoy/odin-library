const myLibrary = [];

const tableBody = document.querySelector("tbody");
const newBookButton = document.querySelector("#new-book-button");
const newBookForm = document.querySelector("form");
const newBookDialog = document.querySelector("#new-book-dialog");
const cancelNewBookButton = document.querySelector("#cancel-new-book");
const confirmNewBookButton = document.querySelector("#confirm-new-book");

newBookButton.addEventListener("click", () => newBookDialog.showModal());
cancelNewBookButton.addEventListener("click", (e) => {
    e.preventDefault();

    newBookDialog.close();
    
    newBookForm.reset();
});
confirmNewBookButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (!newBookForm.checkValidity())
    {
        newBookForm.reportValidity();
        return;
    }

    newBookDialog.close();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    addBookToLibrary(title, author, pages, read);
    displayBooks();

    newBookForm.reset();
});

function Book(title, author, pages, read)
{
    if (!new.target)
    {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read)
{
    let newBook = new Book(title, author, pages, read);
    newBook.id = crypto.randomUUID();
    myLibrary.push(newBook);
}

function displayBooks()
{
    // Clear book entries before displaying again
    while (tableBody.hasChildNodes())
    {
        tableBody.removeChild(tableBody.lastChild);
    }

    for (const book of myLibrary)
    {
        const row = document.createElement("tr");

        const title = document.createElement("td");
        title.textContent = book.title;

        const author = document.createElement("td");
        author.textContent = book.author;

        const pages = document.createElement("td");
        pages.textContent = book.pages;

        const read = document.createElement("td");
        read.textContent = book.read ? "Yes" : "No";

        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(read);

        tableBody.appendChild(row);
    }
}