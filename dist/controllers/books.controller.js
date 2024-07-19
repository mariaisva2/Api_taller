var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class BooksController {
    constructor(domain) {
        this.domain = domain;
    }
    allBooks(token, limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "accept": "/",
                "content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };
            const reqOptions = {
                method: "GET",
                headers: headers
            };
            const response = yield fetch(`${this.domain}api/v1/books?limit=${limit}&page=${page}`, reqOptions);
            console.log(response);
            if (!response.ok) {
                throw new Error(`Error al obtener los libros${response.statusText}: ${response.status}`);
            }
            const responseBodyResponseGetAllBooks = yield response.json();
            return responseBodyResponseGetAllBooks;
        });
    }
    createBook(title, author, description, summary, publicationDate, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBook = {
                title: title.value,
                author: author.value,
                description: description.value,
                summary: summary.value,
                publicationDate: publicationDate.value
            };
            const headers = {
                "accept": "/",
                "content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };
            const reqOptions = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(newBook)
            };
            const response = yield fetch(`${this.domain}/api/v1/books`, reqOptions);
            if (!response.ok) {
                throw new Error(`Error al obtener los libros${response.statusText}: ${response.status}`);
            }
            const responseBodyResponseCreateBook = yield response.json();
            return responseBodyResponseCreateBook;
        });
    }
    getById(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "accept": "/",
                "content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };
            const reqOptions = {
                method: "GET",
                headers: headers
            };
            const response = yield fetch(`${this.domain}/api/v1/books/id${id}`, reqOptions);
            if (!response.ok) {
                throw new Error(`Error al obtener los libros${response.statusText}: ${response.status}`);
            }
            ;
            const responseBodyGetById = yield response.json();
            return responseBodyGetById;
        });
    }
    ;
    update(idcatche, title, author, description, summary, publicationDate, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateBook = {
                title: title.value,
                author: author.value,
                description: description.value,
                summary: summary.value,
                publicationDate: publicationDate.value
            };
            const headers = {
                "accept": "/",
                "content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };
            const reqOptions = {
                method: "PATCH",
                headers: headers,
                body: JSON.stringify(updateBook)
            };
            const response = yield fetch(`${this.domain}/api/v1/books/${idcatche}`, reqOptions);
            if (!response.ok) {
                throw new Error(`Error al obtener los libros${response.statusText}: ${response.status}`);
            }
            const responseBodyUpdateBook = yield response.json();
            return responseBodyUpdateBook;
        });
    }
    ;
    delete(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "accept": "/",
                "Authorization": `Bearer ${token}`,
            };
            const reqOptions = {
                method: "DELETE",
                headers: headers
            };
            const response = yield fetch(`${this.domain}/api/v1/books/${id}`, reqOptions);
            if (!response.ok) {
                throw new Error(`Error al obtener los libros${response.statusText}: ${response.status}`);
            }
            const responseBodyDeleteBook = yield response.json();
            return responseBodyDeleteBook;
        });
    }
}
