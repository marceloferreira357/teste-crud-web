import { v4 as uuidv4 } from 'uuid';
import { Customer } from "../../interfaces/customer.interface";
import { FindResult } from '../../interfaces/find-result.interface';
import * as pagination from '../../utils/pagination.util';
import { logger } from '../logger.service';

const customers: Map<string, Customer> = new Map<string, Customer>();

const insert = (customer: Customer): string => {
    logger.info("Inserindo novo cliente no banco de dados");
    const uuid: string = uuidv4();
    for (const value of customers.values()) {
        if (value.email === customer.email) {
            throw new Error(`Cliente com email ${value.email} ja existe no banco de dados`);
        }
        if (customer.cpf && value.cpf === customer.cpf) {
            throw new Error(`Cliente com cpf ${value.cpf} ja existe no banco de dados`);
        }
        if (customer.rg && value.rg === customer.rg) {
            throw new Error(`Cliente com rg ${value.rg} ja existe no banco de dados`);
        }
        if (customer.rne && value.rne === customer.rne) {
            throw new Error(`Cliente com rne ${value.rne} ja existe no banco de dados`);
        }
        if (customer.cnh && JSON.stringify(value.cnh) === JSON.stringify(customer.cnh)) {
            throw new Error(`Cliente com cnh ${value.cnh} ja existe no banco de dados`);
        }
    }
    customer.uuid = uuid;
    customers.set(uuid, customer);
    logger.info("Cliente inserido no banco de dados");
    return uuid;
}

const findById = (uuid: string): Customer | undefined => {
    logger.info(`Obtendo cliente com id ${uuid} do banco de dados`);
    const customer: Customer | undefined = customers.get(uuid);
    if (!customer) {
        logger.info(`Cliente com id ${uuid} nao encontrado no banco de dados`);
    }
    return customer;
}

const findAll = (page: number, size: number, nome: string | undefined): FindResult<Customer> => {
    const nameLog: string = ` com nome ${nome}`;
    logger.info(`Obtendo todos os clientes do banco de dados${nome ? nameLog : ""}`);
    const list: Customer[] = [];
    for (const value of customers.values()) {
        if (value.habilitado) {
            if (nome) {
                if (new RegExp(nome, "i").test(value.nome)) {
                    list.push(value);
                }
            } else {
                list.push(value);
            }
        }
    }
    logger.info("Clientes obtidos do banco de dados");
    return {
        result: pagination.paginate<Customer>(list, page, size),
        page: page,
        size: size,
        total: list.length,
        totalPages: pagination.estimateTotalPages(list.length, size)
    };
}

const updateById = (uuid: string, customer: Customer): void => {
    logger.info(`Atualizando cliente com id ${uuid} no banco de dados`);
    const customer_: Customer | undefined = customers.get(uuid);
    if (!customer_) {
        throw new Error(`Cliente com id ${uuid} nao encontrado`);
    }
    if (customer.nome !== undefined) {
        logger.info(`Atualizando atributo nome do cliente com id ${uuid}`);
        customer_.nome = customer.nome;
    }
    if (customer.cpf !== undefined) {
        for (const value of customers.values()) {
            if (value.cpf === customer.cpf && value.uuid !== customer.uuid) {
                throw new Error(`Cliente com cpf ${value.cpf} ja existe no banco de dados`);
            }
        }
        logger.info(`Atualizando atributo cpf do cliente com id ${uuid}`);
        customer_.cpf = customer.cpf;
    }
    if (customer.dataNascimento !== undefined) {
        logger.info(`Atualizando atributo dataNascimento do cliente com id ${uuid}`);
        customer_.dataNascimento = customer.dataNascimento;
    }
    if (customer.email !== undefined) {
        for (const value of customers.values()) {
            if (value.email === customer.email && value.uuid !== customer.uuid) {
                throw new Error(`Cliente com email ${value.email} ja existe no banco de dados`);
            }
        }
        logger.info(`Atualizando atributo email do cliente com id ${uuid}`);
        customer_.email = customer.email;
    }
    if (customer.telefone !== undefined) {
        logger.info(`Atualizando atributo telefone do cliente com id ${uuid}`);
        customer_.telefone = customer.telefone;
    }
    if (customer.celular !== undefined) {
        logger.info(`Atualizando atributo celular do cliente com id ${uuid}`);
        customer_.celular = customer.celular;
    }
    if (customer.habilitado !== undefined) {
        logger.info(`Atualizando atributo habilitado do cliente com id ${uuid}`);
        customer_.habilitado = customer.habilitado;
    }
    if (customer.rg) {
        for (const value of customers.values()) {
            if (value.rg === customer.rg && value.uuid !== customer.uuid) {
                throw new Error(`Cliente com rg ${value.rg} ja existe no banco de dados`);
            }
        }
        logger.info(`Atualizando atributo rg do cliente com id ${uuid}`);
        customer_.rg = customer.rg;
    }
    if (customer.rne) {
        for (const value of customers.values()) {
            if (value.rne === customer.rne && value.uuid !== customer.uuid) {
                throw new Error(`Cliente com rne ${value.rne} ja existe no banco de dados`);
            }
        }
        logger.info(`Atualizando atributo rne do cliente com id ${uuid}`);
        customer_.rne = customer.rne;
    }
    if (customer.orgaoEmissor) {
        logger.info(`Atualizando atributo orgaoEmissor do cliente com id ${uuid}`);
        customer_.orgaoEmissor = customer.orgaoEmissor;
    }
    if (customer.cnh) {
        for (const value of customers.values()) {
            if (JSON.stringify(value.cnh) === JSON.stringify(customer.cnh) && value.uuid !== customer.uuid) {
                throw new Error(`Cliente com cnh ${value.cnh} ja existe no banco de dados`);
            }
        }
        logger.info(`Atualizando atributo cnh do cliente com id ${uuid}`);
        customer_.cnh = customer.cnh;
    }
    if (customer.endereco) {
        logger.info(`Atualizando atributo endereco do cliente com id ${uuid}`);
        customer_.endereco = customer.endereco;
    }
    if (customer.observacao) {
        logger.info(`Atualizando atributo observacao do cliente com id ${uuid}`);
        customer_.observacao = customer.observacao;
    }
    customers.set(uuid, customer_);
    logger.info(`Cliente com id ${uuid} atualizado no banco de dados`);
}

const deleteById = (uuid: string): boolean => {
    logger.info(`Deletando cliente com id ${uuid} do banco de dados`);
    const deleted: boolean = customers.delete(uuid);
    if (deleted) {
        logger.info(`Cliente com id ${uuid} deletado do banco de dados`);
        return true;
    } else {
        logger.warn(`Cliente com id ${uuid} nao encontrado no banco de dados`);
        return false;
    }
}

export {
    insert,
    findById,
    findAll,
    updateById,
    deleteById
};
