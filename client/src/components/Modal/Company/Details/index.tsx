import axios, { AxiosError } from "axios";
import { lighten } from "polished";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import Modal from "../..";
import { Company } from "../../../../interfaces/company";
import * as validator from "../../../../utils/validator";
import Button from "../../../Button";
import Input from "../../../Input";
import Section from "../../../Section";
import { Buttons, DisableButtonContainer, Information, Title, TitleContainer, Viewport } from "./styles";

interface Props {
    data: Company | undefined;
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    fetchData: () => Promise<void>;
}

const DetailsCompanyModal: React.FC<Props> = ({ data, show, setShow, fetchData }): JSX.Element => {
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

    const [update, setUpdate] = useState<boolean>(false);

    const formatDate = (date: string): string => {
        const split: string[] = date.split("T")[0].split("-");
        const day: string = split[1], month: string = split[2], year: string = split[0];
        return `${day}/${month}/${year}`;
    }

    const resetAttributes = (data_: Company | undefined): void => {
        if (!data_) return;

        setNomeFantasia(data_.nomeFantasia);
        setRazaoSocial(data_.razaoSocial);
        setCnpj(data_.cnpj);
        setIe(data_.ie);
        setIm(data_.im);

        // responsavel
        setNome(data_.responsavel.nome);
        setCpf(String(data_.responsavel.cpf));
        setDataNascimento(formatDate(String(data_.responsavel.dataNascimento)));
        setEmail(data_.responsavel.email);
        setTelefone(`${data_.responsavel.telefone.ddd}${data_.responsavel.telefone.numero}`);
        setCelular(`${data_.responsavel.celular.ddd}${data_.responsavel.celular.numero}`);

        // endereco
        setCep(String(data_.endereco.cep));
        setTipoLogradouro(data_.endereco.tipoLogradouro);
        setLogradouro(data_.endereco.logradouro);
        setNumero(String(data_.endereco.numero));
        setComplemento(data_.endereco.complemento);
        setBairro(data_.endereco.bairro);
        setCidade(data_.endereco.cidade);
        setUf(data_.endereco.uf);
        setObservacao(data_.observacao);
    }

    useEffect(() => {
        setUpdate(false);
        resetAttributes(data);
    }, [show]);

    useEffect(() => {
        setUpdate(false);
        resetAttributes(data);
    }, [data]);

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
        uuid: data?.uuid,
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

    const updateCompany_ = async (): Promise<void> => {
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
                await axios.patch(`http://localhost:44405/api/v1/companies/${data?.uuid}`, instantiateCompany());
                toast.success("Empresa atualizada com sucesso!");
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

    const updateCompany = (): void => {
        if (!update) {
            setUpdate(true);
        } else {
            updateCompany_();
        }
    }

    const disableCompany = async (): Promise<void> => {
        try {
            await axios.patch(`http://localhost:44405/api/v1/companies/${data?.uuid}`, {
                habilitado: false
            });
            toast.success("Empresa desabilitada com sucesso!");
            setShow(false);
            fetchData();
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
                <Title>{update ? "Editar" : "Detalhes da"} empresa</Title>
            </TitleContainer>
            {data && (
                <Viewport>
                    <Section color={"#ffb6a2"} label={"Informacoes basicas"} />
                    <span>Id</span>
                    <Input disabled defaultValue={data.uuid} />
                    <span>Nome fantasia <Information>*</Information></span>
                    <Input disabled={!update} defaultValue={data.nomeFantasia}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setNomeFantasia(event.target.value)} />
                    <span>Razao social <Information>*</Information></span>
                    <Input disabled={!update} defaultValue={data.razaoSocial}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setRazaoSocial(event.target.value)} />
                    <span>CNPJ <Information>(apenas numeros) *</Information></span>
                    <Input disabled={!update} defaultValue={data.cnpj}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setCnpj(event.target.value)} />
                    <span>Inscricao estadual <Information>(apenas numeros) </Information></span>
                    <Input disabled={!update} defaultValue={data.ie}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setIe(event.target.value)} />
                    <span>Inscricao municipal <Information>(apenas numeros) </Information></span>
                    <Input disabled={!update} defaultValue={data.im}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setIm(event.target.value)} />

                    <Section color={"#ffb6a2"} label={"Responsavel"} />
                    <span>Nome <Information>*</Information></span>
                    <Input disabled={!update} defaultValue={data.responsavel.nome}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setNome(event.target.value)} />
                    <span>CPF <Information>(apenas numeros) *</Information></span>
                    <Input disabled={!update} defaultValue={data.responsavel.cpf}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setCpf(event.target.value)} />
                    <span>Data de nascimento <Information>(dia/mes/ano)</Information></span>
                    <Input disabled={!update} defaultValue={`${formatDate(String(data.responsavel.dataNascimento))}`}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setDataNascimento(event.target.value)} />
                    <span>E-mail <Information>*</Information></span>
                    <Input disabled={!update} defaultValue={data.responsavel.email}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setEmail(event.target.value)} />

                    <Section color={"#ffb6a2"} label={"Contato do responsavel"} />
                    <span>Telefone <Information>(apenas numeros com ddd)</Information></span>
                    <Input disabled={!update} defaultValue={`${data.responsavel.telefone.ddd}${data.responsavel.telefone.numero}`}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setTelefone(event.target.value)} />
                    <span>Celular <Information>(apenas numeros com ddd)</Information></span>
                    <Input disabled={!update} defaultValue={`${data.responsavel.celular.ddd}${data.responsavel.celular.numero}`}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setCelular(event.target.value)} />

                    <Section color={"#ffb6a2"} label={"Endereco"} />
                    <span>CEP <Information>(apenas numeros) *</Information></span>
                    <Input disabled={!update} defaultValue={String(data.endereco.cep)}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setCep(event.target.value)} />
                    <span>Tipo logradouro <Information>*</Information></span>
                    <Input disabled={!update} defaultValue={data.endereco.tipoLogradouro}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setTipoLogradouro(event.target.value)} />
                    <span>Logradouro <Information>*</Information></span>
                    <Input disabled={!update} defaultValue={data.endereco.logradouro}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setLogradouro(event.target.value)} />
                    <span>Numero <Information>*</Information></span>
                    <Input disabled={!update} defaultValue={String(data.endereco.numero)}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setNumero(event.target.value)} />
                    <span>Complemento</span>
                    <Input disabled={!update} defaultValue={data.endereco.complemento}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setComplemento(event.target.value)} />
                    <span>Bairro <Information>*</Information></span>
                    <Input disabled={!update} defaultValue={data.endereco.bairro}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setBairro(event.target.value)} />
                    <span>Cidade <Information>*</Information></span>
                    <Input disabled={!update} defaultValue={data.endereco.cidade}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setCidade(event.target.value)} />
                    <span>UF <Information>*</Information></span>
                    <Input disabled={!update} defaultValue={data.endereco.uf}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setUf(event.target.value)} />

                    <Section color={"#ffb6a2"} label={"Extra"} />
                    <span>Observacao</span>
                    <Input disabled={!update} defaultValue={data.observacao}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setObservacao(event.target.value)} />

                    <Buttons>
                        <Button color={lighten(0.2, "#ff0000")} onClick={disableCompany}>
                            <DisableButtonContainer>
                                <AiFillDelete size={22} />
                                Desativar
                            </DisableButtonContainer>
                        </Button>
                    </Buttons>
                </Viewport>
            )}
            <Buttons>
                <Button color={"#baa4b6"} onClick={(): void => setShow(false)}>
                    Cancelar
                </Button>
                <Button color={"#ffb6a2"} onClick={updateCompany}>
                    {!update ? "Editar" : "Salvar"}
                </Button>
            </Buttons>
        </Modal>
    );
}

export default DetailsCompanyModal;