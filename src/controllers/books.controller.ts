import { BodyResponseGetAllBooks, BodyRequestCreateBook, BodyResponseCreateBook, BodyResponseGetById, BodyRequestUpdateBook, BodyResponseDeleteBook } from "../models/books.model";


export class BooksController{
    public domain: string;

    constructor(domain:string){
        this.domain = domain;
    }
    async allBooks(token: string, limit:number, page:number): Promise<BodyResponseGetAllBooks>{
        const headers: Record<string, string> = {
           "accept":"/",
            "content-Type":"application/json",
            "Authorization":`Bearer ${token}`,
        };
        const reqOptions: RequestInit = {
            method: "GET",
            headers: headers
        }
        const response:Response = await fetch(`${this.domain}/api/v1/books?limit=${limit}&page=${page}`, reqOptions);
        console.log(response);
        if(!response.ok){
            throw new Error(`Error al obtener los libros${response.statusText}: ${response.status}`);
        }
        const responseBodyResponseGetAllBooks: BodyResponseGetAllBooks = await response.json();
        return responseBodyResponseGetAllBooks;
    }    
    async create(title: HTMLInputElement, author: HTMLInputElement, description: HTMLInputElement, summary: HTMLInputElement, publicationDate: HTMLInputElement, token: string): Promise<BodyResponseCreateBook>{
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
        const responseBodyCreateBook: BodyResponseCreateBook = await response.json();
        return responseBodyCreateBook;
    }
    async getById(id: string, token: string): Promise<BodyResponseGetById>{
        const headers: Record<string, string> = {
            "accept":"/",
             "content-Type":"application/json",
             "Authorization":`Bearer ${token}`,
         };
         const reqOptions: RequestInit = {
            method: "GET",
            headers: headers
        };
        const response: Response = await fetch(`${this.domain}/api/v1/books/${id}`, reqOptions);
        if(!response.ok){
            throw new Error(`Error al obtener los libros${response.statusText}: ${response.status}`)
        };
        const responseBodyGetById: BodyResponseGetById = await response.json();
        return responseBodyGetById
    };
    async update(idcatche: string, title: HTMLInputElement, author: HTMLInputElement, description: HTMLInputElement,
        summary: HTMLInputElement, publicationDate: HTMLInputElement, token: string): Promise<BodyRequestUpdateBook>{
        const updateBook : BodyRequestUpdateBook  = {
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
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(updateBook)
         };
         const response:Response = await fetch(`${this.domain}/api/v1/books/${idcatche}`, reqOptions)
         if(!response.ok){
            throw new Error(`Error al obtener los libros${response.statusText}: ${response.status}`);
        }
        const responseBodyUpdateBook: BodyRequestUpdateBook = await response.json();
        return responseBodyUpdateBook;
    };
    async delete(id: string, token: string): Promise<BodyResponseDeleteBook>{
        const headers: Record<string, string> = {
            "accept":"/",
             "Authorization":`Bearer ${token}`,
         };
         const reqOptions: RequestInit = {
            method: "DELETE",
            headers: headers
        };
        const response:Response = await fetch(`${this.domain}/api/v1/books/${id}`, reqOptions)
        if(!response.ok){
           throw new Error(`Error al obtener los libros${response.statusText}: ${response.status}`);
       }
       const responseBodyDeleteBook: BodyResponseDeleteBook = await response.json();
       return responseBodyDeleteBook;
    }

}