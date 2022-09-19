import axios, { AxiosError } from "axios";
import { lighten } from "polished";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import Modal from "../..";
import { Customer } from "../../../../interfaces/customer";
import * as validator from "../../../../utils/validator";
import Button from "../../../Button";
import Input from "../../../Input";
import Section from "../../../Section";
import { Buttons, DisableButtonContainer, Information, Title, TitleContainer, Viewport } from "./styles";

interface Props {
    data: Customer | undefined;
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    fetchData: () => Promise<void>;
}

const DetailsCustomerModal: React.FC<Props> = ({ data, show, setShow, fetchData }): JSX.Element => {
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

    const [update, setUpdate] = useState<boolean>(false);

    const formatDate = (date: string): string => {
        const split: string[] = date.split("T")[0].split("-");
        const day: string = split[1], month: string = split[2], year: string = split[0];
        return `${day}/${month}/${year}`;
    }

    const resetAttributes = (data_: Customer | undefined): void => {
        if (!data_) return;

        setNome(data_.nome);
        setCpf(String(data_.cpf));
        setDataNascimento(formatDate(String(data_.dataNascimento)));
        setEmail(data_.email);
        setTelefone(`${data_.telefone.ddd}${data_.telefone.numero}`);
        setCelular(`${data_.celular.ddd}${data_.celular.numero}`);
        setRg(String(data_.rg));
        setRne(String(data_.rne));
        setOrgaoEmissor(data_.orgaoEmissor.nome);
        setUf(data_.orgaoEmissor.uf);
        setCnh(String(data_.cnh.documento));
        setCodigoSeguranca(String(data_.cnh.codigoSeguranca));
        setCep(String(data_.endereco.cep));
        setTipoLogradouro(data_.endereco.tipoLogradouro);
        setLogradouro(data_.endereco.logradouro);
        setNumero(String(data_.endereco.numero));
        setComplemento(data_.endereco.complemento);
        setBairro(data_.endereco.bairro);
        setCidade(data_.endereco.cidade);
        setUf_(data_.endereco.uf);
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
        if (!validator.validateDate(dataNascimento)) {
            throw new Error("Data de nascimento invalida");
        }
        if (!validator.validateCPF(cpf) || isNaN(Number(cpf))) {
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
        uuid: data?.uuid,
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

    const updateCustomer_ = async (): Promise<void> => {
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
                await axios.patch(`http://localhost:44405/api/v1/customers/${data?.uuid}`, instantiateCustomer());
                toast.success("Cliente atualizado com sucesso!");
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

    const updateCustomer = (): void => {
        if (!update) {
            setUpdate(true);
        } else {
            updateCustomer_();
        }
    }

    const disableCustomer = async (): Promise<void> => {
        try {
            await axios.patch(`http://localhost:44405/api/v1/customers/${data?.uuid}`, {
                habilitado: false
            });
            toast.success("Cliente desabilitado com sucesso!");
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
                <Title>{update ? "Editar" : "Detalhes do"} cliente</Title>
            </TitleContainer>
            {data && (
                <Viewport>
                    <Section color={"#ecaab9"} label={"Informacoes basicas"} />
                    <span>Id</span>
                    <Input disabled defaultValue={data.uuid} />
                    <span>Nome <Information>*</Information></span>
                    <Input disabled={!update} defaultValue={data.nome}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setNome(event.target.value)} />
                    <span>CPF <Information>(apenas numeros) *</Information></span>
                    <Input disabled={!update} defaultValue={String(data.cpf)}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setCpf(event.target.value)} />
                    <span>Data de nascimento <Information>(dia/mes/ano)</Information></span>
                    <Input disabled={!update} defaultValue={`${formatDate(String(data.dataNascimento))}`}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setDataNascimento(event.target.value)} />
                    <span>E-mail <Information>*</Information></span>
                    <Input disabled={!update} defaultValue={data.email}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setEmail(event.target.value)} />

                    <Section color={"#ecaab9"} label={"Contato"} />
                    <span>Telefone <Information>(apenas numeros com ddd)</Information></span>
                    <Input disabled={!update} defaultValue={`${data.telefone.ddd}${data.telefone.numero}`}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setTelefone(event.target.value)} />
                    <span>Celular <Information>(apenas numeros com ddd)</Information></span>
                    <Input disabled={!update} defaultValue={`${data.celular.ddd}${data.celular.numero}`}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setCelular(event.target.value)} />

                    <Section color={"#ecaab9"} label={"Documentacao"} />
                    <span>RG <Information>(apenas numeros)</Information></span>
                    <Input disabled={!update} defaultValue={String(data.rg)}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setRg(event.target.value)} />
                    <span>RNE <Information>(apenas numeros)</Information></span>
                    <Input disabled={!update} defaultValue={String(data.rne)}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setRne(event.target.value)} />
                    <span>Orgao emissor</span>
                    <Input disabled={!update} defaultValue={data.orgaoEmissor.nome}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setOrgaoEmissor(event.target.value)} />
                    <span>UF</span>
                    <Input disabled={!update} defaultValue={data.orgaoEmissor.uf}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setUf(event.target.value)} />

                    <Section color={"#ecaab9"} label={"Carteira de motorista"} />
                    <span>CNH <Information>(apenas numeros)</Information></span>
                    <Input disabled={!update} defaultValue={String(data.cnh.documento)}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setCnh(event.target.value)} />
                    <span>Codigo de seguranca <Information>(apenas numeros)</Information></span>
                    <Input disabled={!update} defaultValue={String(data.cnh.codigoSeguranca)}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setCodigoSeguranca(event.target.value)} />

                    <Section color={"#ecaab9"} label={"Endereco"} />
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
                            setUf_(event.target.value)} />

                    <Section color={"#ecaab9"} label={"Extra"} />
                    <span>Observacao</span>
                    <Input disabled={!update} defaultValue={data.observacao}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            setObservacao(event.target.value)} />

                    <Buttons>
                        <Button color={lighten(0.2, "#ff0000")} onClick={disableCustomer}>
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
                <Button color={"#ecaab9"} onClick={updateCustomer}>
                    {!update ? "Editar" : "Salvar"}
                </Button>
            </Buttons>
        </Modal>
    );
}

export default DetailsCustomerModal;