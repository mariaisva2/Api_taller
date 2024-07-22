# Proyecto de Gestión de Libros con TypeScript

Este proyecto es un software en TypeScript que permite consumir una API de libros, realizando operaciones CRUD (Crear, Actualizar, Eliminar). Utiliza clases e interfaces para estructurar el código.

# Inicializa el archivo de configuración de TypeScript

tsc --init

# El archivo tsconfig.json debe estar configurado de la siguiente manera:

{
  "compilerOptions": {
    "target": "ES6",
    "module": "ES2015",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}

# Para compilar el codigo:

tsc --watch

## Descripción de la Clase `BooksController`

La clase `BooksController` maneja las operaciones CRUD para interactuar con la API de libros. 

### Métodos

- allBooks(token: string, limit: number, page: number): Promise<BodyResponseGetAllBooks>

# Realiza una solicitud GET para obtener todos los libros, con paginación. Requiere un token de autenticación.

  ```typescript
- const books = await booksController.allBooks(token, 10, 1);

# Realiza una solicitud PATCH para actualizar los detalles de un libro existente. Requiere los detalles del libro y un token de autenticación.

- const updatedBook = await booksController.update(bookId, titleInput, authorInput, descriptionInput, summaryInput, publicationDateInput, token);

# Realiza una solicitud DELETE para eliminar un libro por su ID. Requiere un token de autenticación.

const deleteResponse = await booksController.delete(bookId, token);

Headers: Cada método establece los headers necesarios, incluyendo el token de autenticación.

Errores: Si la solicitud falla, se lanza un error con un mensaje descriptivo.

## Descripción de las Interfaces

El proyecto utiliza varias interfaces para definir las estructuras de datos que se manejan en las operaciones CRUD con la API de libros. A continuación se detallan estas interfaces:

`BodyResponseGetAllBooks`

Define la estructura de la respuesta al obtener todos los libros.

message: `string` - Mensaje de la respuesta.
data: `Datum[]` - Array de objetos `Datum` que contienen la información de cada libro.

 `Datum`

Define la estructura de un libro en la respuesta.

- id: `string` - ID del libro.
- title: `string` - Título del libro.
- author: `string` - Autor del libro.
- description: `string` - Descripción del libro.
- summary: `string` - Resumen del libro.
- publicationDate: `string` - Fecha de publicación del libro
- createdBy: `string` - Usuario que creó el libro.
- updatedBy: `null | string` - Usuario que actualizó el libro.
- deletedBy: `null | string` - Usuario que eliminó el libro.
- createdAt: `Date` - Fecha de creación del libro.
- updatedAt: `Date` - Fecha de última actualización del libro.
- deletedAt: `null | Date` - Fecha de eliminación del libro.
- files: `any[]` - Archivos asociados con el libro.

`BodyRequestCreateBook`

Define la estructura del cuerpo de la solicitud para crear un nuevo libro.

- title: `string` - Título del libro.
- author: `string` - Autor del libro.
- description: `string` - Descripción del libro.
- summary: `string` - Resumen del libro.
- publicationDate: `string` - Fecha de publicación del libro.

`BodyResponseCreateBook`

Define la estructura de la respuesta al crear un nuevo libro.

- message: `string` - Mensaje de la respuesta.
- data: `Record<string, string>` - Datos del libro creado.`BodyResponseGetById`

Define la estructura de la respuesta al obtener un libro por su ID.

- message: `string` - Mensaje de la respuesta.
- data: `Record<string, string>` - Datos del libro obtenido.

`BodyRequestUpdateBook`

Define la estructura del cuerpo de la solicitud para actualizar un libro existente.

- title: `string` - Título del libro.
- author: `string` - Autor del libro.
- description: `string` - Descripción del libro.
- summary: `string` - Resumen del libro.
- publicationDate: `string` - Fecha de publicación del libro.

 `BodyResponseUpdateBook`

Define la estructura de la respuesta al actualizar un libro.

message: `string` - Mensaje de la respuesta.


`BodyResponseDeleteBook`

Define la estructura de la respuesta al eliminar un libro.

message: `string` - Mensaje de la respuesta.
data: `null` - No hay datos en la respuesta al eliminar un libro.



