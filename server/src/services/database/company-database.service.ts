import { v4 as uuidv4 } from 'uuid';
import { Company } from "../../interfaces/company.interface";
import { FindResult } from '../../interfaces/find-result.interface';
import * as pagination from '../../utils/pagination.util';
import { logger } from '../logger.service';

const companies: Map<string, Company> = new Map<string, Company>();

const insert = (company: Company): string => {
    logger.info("Inserindo nova empresa no banco de dados");
    const uuid: string = uuidv4();
    for (const value of companies.values()) {
        if (value.cnpj === company.cnpj) {
            throw new Error(`Empresa com cpnj ${value.cnpj} ja existe no banco de dados`);
        }
        if (value.ie === company.ie) {
            throw new Error(`Empresa com ie ${value.ie} ja existe no banco de dados`);
        }
        if (value.im === company.im) {
            throw new Error(`Empresa com im ${value.im} ja existe no banco de dados`);
        }
    }
    company.uuid = uuid;
    companies.set(uuid, company);
    logger.info("Empresa inserida no banco de dados");
    return uuid;
}

const findById = (uuid: string): Company | undefined => {
    logger.info(`Obtendo empresa com id ${uuid} do banco de dados`);
    const company: Company | undefined = companies.get(uuid);
    if (!company) {
        logger.info(`Empresa com id ${uuid} nao encontrado no banco de dados`);
    }
    return company;
}

const findAll = (
    page: number,
    size: number,
    nomeFantasia: string | undefined,
    razaoSocial: string | undefined
): FindResult<Company> => {
    const nomeFantasiaRazaoSocialLog: string = ` com nome fantasia ${nomeFantasia} e razao social ${razaoSocial}`;
    logger.info(`Contando todas as empresas no banco de dados${nomeFantasia
        ? nomeFantasiaRazaoSocialLog
        : ""}`);

    const list: Company[] = [];
    for (const value of companies.values()) {
        if (value.habilitado) {
            if (nomeFantasia && razaoSocial) {
                if (new RegExp(nomeFantasia, "i").test(value.nomeFantasia) ||
                    new RegExp(razaoSocial, "i").test(value.razaoSocial)) {
                    list.push(value);
                }
            } else {
                list.push(value);
            }
        }
    }
    logger.info("Empresas obtidas do banco de dados");
    return {
        result: pagination.paginate<Company>(list, page, size),
        page: page,
        size: size,
        total: list.length,
        totalPages: pagination.estimateTotalPages(list.length, size)
    };
}

const updateById = (uuid: string, company: Company): void => {
    logger.info(`Atualizando empresa com id ${uuid} no banco de dados`);
    const company_: Company | undefined = companies.get(uuid);
    if (!company_) {
        throw new Error(`Empresa com id ${uuid} nao encontrado`);
    }
    if (company.habilitado !== undefined) {
        logger.info(`Atualizando atributo habilitado da empresa com id ${uuid}`);
        company_.habilitado = company.habilitado;
    }
    if (company.nomeFantasia) {
        logger.info(`Atualizando atributo nomeFantasia da empresa com id ${uuid}`);
        company_.nomeFantasia = company.nomeFantasia;
    }
    if (company.razaoSocial) {
        logger.info(`Atualizando atributo razaoSocial da empresa com id ${uuid}`);
        company_.razaoSocial = company.razaoSocial;
    }
    if (company.cnpj !== undefined) {
        for (const value of companies.values()) {
            if (value.cnpj === company.cnpj && value.uuid !== company.uuid) {
                throw new Error(`Empresa com cnpj ${value.cnpj} ja existe no banco de dados`);
            }
        }
        logger.info(`Atualizando atributo cnpj da empresa com id ${uuid}`);
        company_.cnpj = company_.cnpj;
    }
    if (company.ie) {
        for (const value of companies.values()) {
            if (value.ie === company.ie && value.uuid !== company.uuid) {
                throw new Error(`Empresa com ie ${value.ie} ja existe no banco de dados`);
            }
        }
        logger.info(`Atualizando atributo ie da empresa com id ${uuid}`);
        company_.ie = company.ie;
    }
    if (company.im) {
        for (const value of companies.values()) {
            if (value.im === company.im && value.uuid !== company.uuid) {
                throw new Error(`Empresa com im ${value.im} ja existe no banco de dados`);
            }
        }
        logger.info(`Atualizando atributo im da empresa com id ${uuid}`);
        company_.im = company.im;
    }
    if (company.responsavel) {
        logger.info(`Atualizando atributo responsavel da empresa com id ${uuid}`);
        company_.responsavel = company.responsavel;
    }
    if (company.endereco) {
        logger.info(`Atualizando atributo endereco da empresa com id ${uuid}`);
        company_.endereco = company.endereco;
    }
    if (company.observacao) {
        logger.info(`Atualizando atributo observacao da empresa com id ${uuid}`);
        company_.observacao = company.observacao;
    }
    companies.set(uuid, company_);
    logger.info(`Empresa com id ${uuid} atualizado no banco de dados`);
}

const deleteById = (uuid: string): boolean => {
    logger.info(`Deletando empresa com id ${uuid} do banco de dados`);
    const deleted: boolean = companies.delete(uuid);
    if (deleted) {
        logger.info(`Empresa com id ${uuid} deletado do banco de dados`);
        return true;
    } else {
        logger.warn(`Empresa com id ${uuid} nao encontrado no banco de dados`);
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
