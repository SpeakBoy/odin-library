const myLibrary = [];

const tableBody = document.querySelector("tbody");
const newBookButton = document.querySelector("#new-book-button");
const newBookForm = document.querySelector("form");
const newBookDialog = document.querySelector("#new-book-dialog");
const cancelNewBookButton = document.querySelector("#cancel-new-book");
const confirmNewBookButton = document.querySelector("#confirm-new-book");
const titleError = document.querySelector("#title-error");
const authorError = document.querySelector("#author-error");
const pagesError = document.querySelector("#pages-error");

newBookButton.addEventListener("click", () => newBookDialog.showModal());
cancelNewBookButton.addEventListener("click", (e) => {
    e.preventDefault();

    newBookDialog.close();
    
    newBookForm.reset();
});
confirmNewBookButton.addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;
    
    Validator.reportErrors(title, author, pages);

    if (!Validator.isValid(title, author, pages))
    {
        return;
    }

    newBookDialog.close();



    addBookToLibrary(title, author, pages, read);
    displayBooks();

    newBookForm.reset();
});

class Validator
{
    static isValid(title, author, pages)
    {
        if (
            title.length === 0 ||
            author.length === 0 ||
            pages < 1
        )
        {
            return false;
        }
        return true;
    }

    static reportErrors(title, author, pages)
    {
        titleError.textContent = title.length === 0 ? "The title field must be filled!" : "";
        authorError.textContent = author.length === 0 ? "The author field must be filled!" : "";
        pagesError.textContent = pages < 1 ? "There must be a positive number of pages in a book!" : "";
    }
}

class Book
{
    constructor(title, author, pages, read)
    {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead()
    {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read)
{
    const newBook = new Book(title, author, pages, read);
    newBook.id = crypto.randomUUID();
    myLibrary.push(newBook);
}

function removeBookFromLibrary(id)
{
    const bookToRemove = myLibrary.find(book => book.id === id);
    const indexToRemove = myLibrary.indexOf(bookToRemove);
    myLibrary.splice(indexToRemove, 1);
}

function displayBooks()
{
    // Clear display table before displaying again
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

        const actionsCell = document.createElement("td");

        const toggleReadButton = document.createElement("button");
        toggleReadButton.textContent = "Toggle Read Status";
        toggleReadButton.addEventListener("click", () => {
            book.toggleRead();
            displayBooks();
        });
        actionsCell.appendChild(toggleReadButton);

        const removeBookButton = document.createElement("button");
        removeBookButton.textContent = "Remove";
        removeBookButton.addEventListener("click", () => {
            removeBookFromLibrary(book.id);
            displayBooks();
        });
        actionsCell.appendChild(removeBookButton);

        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(read);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    }
}