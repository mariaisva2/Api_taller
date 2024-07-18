var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class UsersController {
    constructor(domain) {
        this.domain = domain; //Debe ser con this para referenciar el domain y que pueda entender lo que se le esta pasando
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            //lo que necesita para enviar
            const userData = {
                email: email.value,
                password: password.value
            };
            const headers = {
                'acept': '*/*',
                'Content-Type': 'application/json'
            };
            console.log(JSON.stringify(userData));
            const reqOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(userData) //se transforma a formato json
            };
            const response = yield fetch(`${this.domain}/api/v1/auth/login`, reqOptions); //peticion de la url y el enpoint
            console.log(response.status);
            if (!response.ok) { //si response es falso va a generar un objeto de error
                console.log(`Response body: ${(yield response.json()).message}`);
                throw new Error(`Error: ${response.status}: ${response.statusText}`);
            }
            const responseBodyLogin = yield response.json();
            return responseBodyLogin;
        });
    }
}
