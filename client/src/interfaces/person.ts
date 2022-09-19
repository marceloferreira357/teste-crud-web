import { Phone } from "./phone";

interface Person {
    nome: string;
    cpf: string;
    dataNascimento: Date;
    email: string;
    telefone: Phone;
    celular: Phone;
}

export type {
    Person
};
