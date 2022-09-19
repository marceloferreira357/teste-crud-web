import { Address } from "./address.interface";
import { Person } from "./person.interface";

interface Company {
    uuid: string;
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

export {
    Company
};
