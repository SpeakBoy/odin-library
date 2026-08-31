const myLibrary = [];
const tableBody = document.querySelector("tbody");

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