import axios, { AxiosError } from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "../..";
import { Customer } from "../../../../interfaces/customer";
import * as validator from "../../../../utils/validator";
import Button from "../../../Button";
import Input from "../../../Input";
import Section from "../../../Section";
import Warning from "../../../Warning";
import { Buttons, Information, Title, TitleContainer, Viewport } from "./styles";

interface Props {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    fetchData: () => Promise<void>;
}

const InsertCustomerModal: React.FC<Props> = ({ show, setShow, fetchData }): JSX.Element => {
    const [nome, setNome] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [dataNascimento, setDataNascimento] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [celular, setCelular] = useState<string>("");
    const [rg, setRg] = useState<string>("");
    const [rne, setRne] = useState<string>("");
    const [orgaoEmissor, setOrgaoEmissor] = useState<string>("");
    const [uf, setUf] = useState<string>("");
    const [cnh, setCnh] = useState<string>("");
    const [codigoSeguranca, setCodigoSeguranca] = useState<string>("");
    const [cep, setCep] = useState<string>("");
    const [tipoLogradouro, setTipoLogradouro] = useState<string>("");
    const [logradouro, setLogradouro] = useState<string>("");
    const [numero, setNumero] = useState<string>("");
    const [complemento, setComplemento] = useState<string>("");
    const [bairro, setBairro] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");
    const [uf_, setUf_] = useState<string>("");
    const [observacao, setObservacao] = useState<string>("");

    const resetAttributes = (): void => {
        setNome("");
        setCpf("");
        setDataNascimento("");
        setEmail("");
        setTelefone("");
        setCelular("");
        setRg("");
        setRne("");
        setOrgaoEmissor("");
        setUf("");
        setCnh("");
        setCodigoSeguranca("");
        setCep("");
        setTipoLogradouro("");
        setLogradouro("");
        setNumero("");
        setComplemento("");
        setBairro("");
        setCidade("");
        setUf_("");
        setObservacao("");
    }

    useEffect(() => {
        resetAttributes();
    }, [show]);

    const validateAttributes = (): void => {
        if (!validator.validateDate(dataNascimento)) {
            throw new Error("Data de nascimento invalida");
        }
        if (!validator.validateCPF(cpf)) {
            throw new Error("CPF invalido");
        }
        if (telefone !== "" && telefone.length < 3 || isNaN(Number(telefone))) {
            throw new Error("Telefone invalido");
        }
        if (celular !== "" && celular.length < 3 || isNaN(Number(celular))) {
            throw new Error("Celular invalido");
        }
        if (rg !== "" && isNaN(Number(rg))) {
            throw new Error("RG invalido");
        }
        if (rne !== "" && isNaN(Number(rne))) {
            throw new Error("RNE invalido");
        }
        if (cnh !== "" && isNaN(Number(cnh))) {
            throw new Error("CNH invalido");
        }
        if (codigoSeguranca !== "" && isNaN(Number(codigoSeguranca))) {
            throw new Error("Codigo seguranca invalido");
        }
        if (cep !== "" && isNaN(Number(cep))) {
            throw new Error("CEP seguranca invalido");
        }
        if (!validator.validateEmail(email)) {
            throw new Error("Email invalido");
        }
    }

    const instantiateCustomer = (): Customer => ({
        nome: nome,
        cpf: cpf,
        dataNascimento: new Date(dataNascimento),
        email: email,
        telefone: {
            numero: telefone.substring(2),
            ddd: telefone.substring(0, 2)
        },
        celular: {
            numero: celular.substring(2),
            ddd: celular.substring(0, 2)
        },
        habilitado: true,
        rg: rg,
        rne: rne,
        orgaoEmissor: {
            nome: orgaoEmissor,
            uf: uf,
        },
        cnh: {
            documento: cnh,
            codigoSeguranca: codigoSeguranca
        },
        endereco: {
            cep: cep,
            tipoLogradouro: tipoLogradouro,
            logradouro: logradouro,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            uf: uf
        },
        observacao: observacao
    });

    const insertCustomer = async (): Promise<void> => {
        try {
            if (nome === "" ||
                cpf === "" ||
                email === "" ||
                cep === "" ||
                tipoLogradouro === "" ||
                logradouro === "" ||
                numero === "" ||
                bairro === "" ||
                cidade === "" ||
                uf_ === "") {
                throw new Error("Existem campos obrigatorios nao preenchidos");
            } else {
                validateAttributes();
                await axios.post("http://localhost:44405/api/v1/customers", instantiateCustomer());
                toast.success("Cliente adicionado com sucesso!");
                setShow(false);
                fetchData();
            }
        } catch (error) {
            if ((error as AxiosError<any>).response?.data.message) {
                toast.error((error as AxiosError<any>).response?.data.message);
            } else {
                toast.error((error as Error).message);
            }
        }
    }

    return (
        <Modal show={show} setShow={setShow}>
            <TitleContainer>
                <Title>Inserir novo cliente</Title>
            </TitleContainer>
            <Viewport>
                <Warning message={"Campos com * sao obrigatorios!"} />
                <Section color={"#ecaab9"} label={"Informacoes basicas"} />
                <span>Nome <Information>*</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setNome(event.target.value)} />
                <span>CPF <Information>(apenas numeros) *</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setCpf(event.target.value)} />
                <span>Data de nascimento <Information>(dia/mes/ano)</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setDataNascimento(event.target.value)} />
                <span>E-mail <Information>*</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setEmail(event.target.value)} />

                <Section color={"#ecaab9"} label={"Contato"} />
                <span>Telefone <Information>(apenas numeros com ddd)</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setTelefone(event.target.value)} />
                <span>Celular <Information>(apenas numeros com ddd)</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setCelular(event.target.value)} />

                <Section color={"#ecaab9"} label={"Documentacao"} />
                <span>RG <Information>(apenas numeros)</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setRg(event.target.value)} />
                <span>RNE <Information>(apenas numeros)</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setRne(event.target.value)} />
                <span>Orgao emissor</span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setOrgaoEmissor(event.target.value)} />
                <span>UF</span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setUf(event.target.value)} />

                <Section color={"#ecaab9"} label={"Carteira de motorista"} />
                <span>CNH <Information>(apenas numeros)</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setCnh(event.target.value)} />
                <span>Codigo de seguranca <Information>(apenas numeros)</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setCodigoSeguranca(event.target.value)} />

                <Section color={"#ecaab9"} label={"Endereco"} />
                <span>CEP <Information>(apenas numeros) *</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setCep(event.target.value)} />
                <span>Tipo logradouro <Information>*</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setTipoLogradouro(event.target.value)} />
                <span>Logradouro <Information>*</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setLogradouro(event.target.value)} />
                <span>Numero <Information>*</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setNumero(event.target.value)} />
                <span>Complemento</span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setComplemento(event.target.value)} />
                <span>Bairro <Information>*</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setBairro(event.target.value)} />
                <span>Cidade <Information>*</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setCidade(event.target.value)} />
                <span>UF <Information>*</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setUf_(event.target.value)} />

                <Section color={"#ecaab9"} label={"Extra"} />
                <span>Observacao</span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setObservacao(event.target.value)} />
            </Viewport>
            <Buttons>
                <Button color={"#baa4b6"} onClick={(): void => setShow(false)}>
                    Cancelar
                </Button>
                <Button color={"#ecaab9"} onClick={insertCustomer}>
                    Inserir
                </Button>
            </Buttons>
        </Modal>
    );
}

export default InsertCustomerModal;