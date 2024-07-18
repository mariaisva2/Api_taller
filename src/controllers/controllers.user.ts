import {BodyRequestLogin, BodyResponseLogin} from "../models/auth.model"; //importamos la peticion y la respuesta

export class UsersController { //Creamos una clase para crear las variables que se necesitan
    public domain: string; //es un dominio numero que le vamos a enviar que es de tipo string

    constructor (domain:string){//
        this.domain = domain;//Debe ser con this para referenciar el domain y que pueda entender lo que se le esta pasando
    }
async login (email: HTMLInputElement, password:HTMLInputElement): Promise<BodyResponseLogin>{

    //lo que necesita para enviar
    const userData: BodyRequestLogin = {//Utilizamos la interface del BodyRequest para mandarselo
        email: email.value,
        password: password.value
    } 
    const headers: Record<string, string>={//es un string y le responde otro string
        'acept': '*/*',
        'Content-Type': 'application/json'
    }
    console.log(JSON.stringify(userData));
    
    const reqOptions: RequestInit = { //Objeto:metodo,headers,body. Se crea la constante para indicar el metodo que se va a utilizar
        method: 'POST',
        headers: headers,
        body: JSON.stringify(userData)//se transforma a formato json
    }
    const response:Response = await fetch(`${this.domain}/api/v1/auth/login`, reqOptions) //peticion de la url y el enpoint
    console.log(response.status);
    
    if(!response.ok ){//si response es falso va a generar un objeto de error
        console.log(`Response body: ${(await response.json()).message}`);
        throw new Error(`Error: ${response.status}: ${response.statusText}`)
    }
    const responseBodyLogin: BodyResponseLogin = await response.json();
    return responseBodyLogin;
}    
}