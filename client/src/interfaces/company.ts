import { Address } from "./address";
import { Person } from "./person";

interface Company {
    uuid?: string;
    habilitado: boolean;
    nomeFantasia: string;
    razaoSocial: string;
    cnpj: string;
    ie: string;
    im: string;
    responsavel: Person;
    endereco: Address;
    observacao: string;
}

export type {
    Company
};
