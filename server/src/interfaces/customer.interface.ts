import { Address } from "./address.interface";
import { Person } from "./person.interface";

interface Customer extends Person {
    uuid: string;
    habilitado: boolean;
    rg: string;
    rne: string;
    orgaoEmissor: {
        nome: string;
        uf: string;
    };
    cnh: {
        documento: string;
        codigoSeguranca: string;
    };
    endereco: Address;
    observacao: string;
}

export {
    Customer
};
