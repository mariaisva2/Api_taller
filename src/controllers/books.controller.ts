import { BodyResponseGetAllBooks, BodyRequestCreateBook, BodyResponseCreateBook } from "../models/books.model";


export class BooksController{
    public domain: string;

    constructor(domain:string){
        this.domain = domain;
    }
    async allBooks(token: string, limit:number, page:string): Promise<BodyResponseGetAllBooks>{
        const headers: Record<string, string> = {
           "accept":"/",
            "content-Type":"application/json",
            "Authorization":`Bearer ${token}`,
        };
        const reqOptions: RequestInit = {
            method: "GET",
            headers: headers
        }
        const response:Response = await fetch(`${this.domain}api/v1/books?limit=${limit}&page=${page}`, reqOptions);
        console.log(response);
        if(!response.ok){
            throw new Error(`Error al obtener los libros${response.statusText}: ${response.status}`);
        }
        const responseBodyResponseGetAllBooks: BodyResponseGetAllBooks = await response.json();
        return responseBodyResponseGetAllBooks;
    }    
    async createBook(title: HTMLInputElement, author: HTMLInputElement, description: HTMLInputElement, summary: HTMLInputElement, publicationDate: HTMLInputElement, token: string): Promise<BodyResponseCreateBook>{
        const newBook : BodyRequestCreateBook = {
            title: title.value,
            author: author.value,
            description: description.value,
            summary: summary.value,
            publicationDate: publicationDate.value
        };
        const headers: Record<string, string> = {
            "accept":"/",
             "content-Type":"application/json",
             "Authorization":`Bearer ${token}`,
         };
         const reqOptions: RequestInit = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(newBook)
         }
         const response:Response = await fetch(`${this.domain}/api/v1/books`, reqOptions)
         if(!response.ok){
            throw new Error(`Error al obtener los libros${response.statusText}: ${response.status}`);
        }
        const responseBodyResponseCreateBook: BodyResponseCreateBook = await response.json();
        return responseBodyResponseCreateBook;
    }

    
}