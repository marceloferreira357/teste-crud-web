import axios, { AxiosError } from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "../..";
import { Company } from "../../../../interfaces/company";
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

const InsertCompanyModal: React.FC<Props> = ({ show, setShow, fetchData }): JSX.Element => {
    const [nomeFantasia, setNomeFantasia] = useState<string>("");
    const [razaoSocial, setRazaoSocial] = useState<string>("");
    const [cnpj, setCnpj] = useState<string>("");
    const [ie, setIe] = useState<string>("");
    const [im, setIm] = useState<string>("");

    // responsavel
    const [nome, setNome] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [dataNascimento, setDataNascimento] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [celular, setCelular] = useState<string>("");

    // endereco
    const [cep, setCep] = useState<string>("");
    const [tipoLogradouro, setTipoLogradouro] = useState<string>("");
    const [logradouro, setLogradouro] = useState<string>("");
    const [numero, setNumero] = useState<string>("");
    const [complemento, setComplemento] = useState<string>("");
    const [bairro, setBairro] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");
    const [uf, setUf] = useState<string>("");

    const [observacao, setObservacao] = useState<string>("");

    const resetAttributes = (): void => {
        setNomeFantasia("");
        setRazaoSocial("");
        setCnpj("");
        setIe("");
        setIm("");

        // responsavel
        setNome("");
        setCpf("");
        setDataNascimento("");
        setEmail("");
        setTelefone("");
        setCelular("");

        // endereco
        setCep("");
        setTipoLogradouro("");
        setLogradouro("");
        setNumero("");
        setComplemento("");
        setBairro("");
        setCidade("");
        setUf("");

        setObservacao("");
    }

    useEffect(() => {
        resetAttributes();
    }, [show]);

    const validateAttributes = (): void => {
        if (!validator.validateCNPJ(cnpj)) {
            throw new Error("CNPJ invalido");
        }
        if (ie !== "" && isNaN(Number(ie))) {
            throw new Error("IE seguranca invalido");
        }
        if (im !== "" && isNaN(Number(im))) {
            throw new Error("IM seguranca invalido");
        }
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
        if (cep !== "" && isNaN(Number(cep))) {
            throw new Error("CEP seguranca invalido");
        }
        if (!validator.validateEmail(email)) {
            throw new Error("Email invalido");
        }
    }

    const instantiateCompany = (): Company => ({
        habilitado: true,
        nomeFantasia: nomeFantasia,
        razaoSocial: razaoSocial,
        cnpj: cnpj,
        ie: ie,
        im: im,
        responsavel: {
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
            }
        },
        endereco: {
            cep: cep,
            tipoLogradouro: tipoLogradouro,
            logradouro: logradouro,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
        },
        observacao: observacao
    });

    const insertCustomer = async (): Promise<void> => {
        try {
            if (nomeFantasia === "" ||
                razaoSocial === "" ||
                cnpj === "" ||
                nome === "" ||
                cpf === "" ||
                email === "" ||
                cep === "" ||
                tipoLogradouro === "" ||
                logradouro === "" ||
                numero === "" ||
                bairro === "" ||
                cidade === "" ||
                uf === "") {
                throw new Error("Existem campos obrigatorios nao preenchidos");
            } else {
                validateAttributes();
                await axios.post("http://localhost:44405/api/v1/companies", instantiateCompany());
                toast.success("Empresa adicionada com sucesso!");
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
                <Title>Inserir nova empresa</Title>
            </TitleContainer>
            <Viewport>
                <Warning message={"Campos com * sao obrigatorios!"} />
                <Section color={"#ffb6a2"} label={"Informacoes basicas"} />
                <span>Nome fantasia <Information>*</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setNomeFantasia(event.target.value)} />
                <span>Razao social <Information>*</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setRazaoSocial(event.target.value)} />
                <span>CNPJ <Information>(apenas numeros) *</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setCnpj(event.target.value)} />
                <span>Inscricao estadual <Information>(apenas numeros) </Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setIe(event.target.value)} />
                <span>Inscricao municipal <Information>(apenas numeros) </Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setIm(event.target.value)} />

                <Section color={"#ffb6a2"} label={"Responsavel"} />
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

                <Section color={"#ecaab9"} label={"Contato do responsavel"} />
                <span>Telefone <Information>(apenas numeros com ddd)</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setTelefone(event.target.value)} />
                <span>Celular <Information>(apenas numeros com ddd)</Information></span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setCelular(event.target.value)} />

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
                    setUf(event.target.value)} />

                <Section color={"#ffb6a2"} label={"Extra"} />
                <span>Observacao</span>
                <Input onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    setObservacao(event.target.value)} />
            </Viewport>
            <Buttons>
                <Button color={"#baa4b6"} onClick={(): void => setShow(false)}>
                    Cancelar
                </Button>
                <Button color={"#ffb6a2"} onClick={insertCustomer}>
                    Inserir
                </Button>
            </Buttons>
        </Modal>
    );
}

export default InsertCompanyModal;