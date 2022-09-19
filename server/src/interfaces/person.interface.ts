import { Phone } from "./phone.interface";

interface Person {
    nome: string;
    cpf: string;
    dataNascimento: Date;
    email: string;
    telefone: Phone;
    celular: Phone;
}

export {
    Person
};
