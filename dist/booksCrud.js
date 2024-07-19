var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CardTemplateController, } from "./controllers/cardTemplate.controller.js";
import { BooksController } from "./controllers/books.controller.js";
const URL_BOOKS = "http://190.147.64.47:5155";
const btnLogout = document.getElementById("btn-logout");
const prevPage = document.getElementById("prev-page");
const nextPage = document.getElementById("next-page");
const token = localStorage.getItem("authToken");
let currentPage = 1;
const limit = 10;
btnLogout.addEventListener("click", (e) => {
    localStorage.removeItem("authToken");
    window.location.href = "index.html";
});
if (!token) {
    alert("Authentication token is missigin. Please log in");
    window.location.href = "index.html";
}
else {
    const containerBooks = document.querySelector(".container-books");
    const form = document.querySelector("form");
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const description = document.getElementById("description");
    const summary = document.getElementById("summary");
    const publicationDate = document.getElementById("publication-date");
    let idcatche;
    const cardTemplate = new CardTemplateController(containerBooks);
    prevPage.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (currentPage >= 1) {
            currentPage--;
            yield allBooks(limit, currentPage);
        }
    }));
    nextPage.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (currentPage >= 1) {
            currentPage++;
            yield allBooks(limit, currentPage);
        }
    }));
    form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const crudBooks = new BooksController(URL_BOOKS);
        if (idcatche === undefined) {
            yield crudBooks.create(title, author, description, summary, publicationDate, token);
        }
        else {
            yield crudBooks.update(idcatche, title, author, description, summary, publicationDate, token);
            idcatche = undefined;
        }
        form.reset();
        yield allBooks(limit, currentPage);
    }));
    containerBooks.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (e.target instanceof HTMLButtonElement) {
            const crudBooks = new BooksController(URL_BOOKS);
            if (e.target.classList.contains("btn-warning")) {
                idcatche = e.target.dataset.id;
                if (idcatche) {
                    const book = yield crudBooks.getById(idcatche, token);
                    title.value = book.data.title;
                    author.value = book.data.author;
                    description.value = book.data.description;
                    summary.value = book.data.summary;
                    publicationDate.value = book.data.publicationDate;
                }
            }
            else if (e.target.classList.contains("btn-danger")) {
                const bookId = e.target.dataset.id;
                if (bookId) {
                    const confirmDelete = confirm("Are you sure you want to delet?");
                    if (confirmDelete) {
                        yield crudBooks.delete(bookId, token);
                        idcatche = undefined;
                        yield allBooks(limit, currentPage);
                    }
                }
            }
        }
    }));
    function allBooks(limit, currentPage) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Mostrar");
            const crudBooks = new BooksController(URL_BOOKS);
            try {
                const response = yield crudBooks.allBooks(token, limit, currentPage);
                console.log(`Respuesta de allbooks: ${response} `);
                const books = response.data;
                containerBooks.innerHTML = '';
                for (const book of books) {
                    cardTemplate.render(book.id, book.title, book.author, book.description, book.summary, book.publicationDate);
                }
            }
            catch (error) {
                console.error("Error fetching books: ", error);
            }
        });
    }
    allBooks(limit, currentPage);
}
