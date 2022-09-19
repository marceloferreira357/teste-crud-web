import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container as ContainerBootstrap, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { toast } from "react-toastify";
import Card from "../../components/Card";
import DetailsCustomerModal from "../../components/Modal/Customer/Details";
import InsertCustomerModal from "../../components/Modal/Customer/Insert";
import Reload from "../../components/Reload";
import SearchInput from "../../components/SearchInput";
import SpeedDial from "../../components/SpeedDial";
import { Customer } from "../../interfaces/customer";
import { FoundText, SearchRow } from "./styles";

const Customers: React.FC = (): JSX.Element => {
    const [search, setSearch] = useState<string>("");
    const [showInsertModal, setShowInsertModal] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(8);
    const [total, setTotal] = useState<number>(0);
    const [data, setData] = useState<Customer[]>([]);
    const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
    const [customer, setCustomer] = useState<Customer | undefined>(undefined);

    const fetchData = async (): Promise<void> => {
        try {
            let url: string = `http://localhost:44405/api/v1/customers?page=${page}&size=${size}`;
            if (search !== "") {
                url = url.concat(`&nome=${search}`);
            }
            const response: AxiosResponse<any> = await axios.get(url);
            setData(response.data.result.result);
            setTotal(response.data.result.total);
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [size]);

    const handleOnSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setSearch(event.target.value);
    };

    return (
        <>
            <ContainerBootstrap fluid>
                <Row className="d-flex align-items-center justify-content-center">
                    <Col sm={12} md={6} lg={6}>
                        <SearchRow>
                            <SearchInput onChange={handleOnSearchChange} fetchData={fetchData} />
                            <FoundText>
                                {total} clientes encontrados
                            </FoundText>
                        </SearchRow>
                    </Col>
                </Row>
                <Row style={{ marginTop: "10px" }}>
                    {data.map((c: Customer) => (
                        <Col sm={12} md={4} lg={3} key={c.uuid} style={{ padding: "10px" }}>
                            <Card
                                icon={BsFillPersonFill}
                                color={"#ecaab9"}
                                name={c.nome}
                                onClick={(): void => {
                                    setCustomer(c);
                                    setShowDetailsModal(true);
                                }}
                            />
                        </Col>
                    ))}
                </Row>
            </ContainerBootstrap>
            <Reload total={total} size={size} setSize={setSize} />
            <SpeedDial
                icon={AiOutlinePlus}
                color={"#7fd1ae"}
                onClick={(): void => setShowInsertModal(true)}
            />
            <InsertCustomerModal
                show={showInsertModal}
                setShow={setShowInsertModal}
                fetchData={fetchData}
            />
            <DetailsCustomerModal
                show={showDetailsModal}
                setShow={setShowDetailsModal}
                data={customer}
                fetchData={fetchData}
            />
        </>
    );
}

export default Customers;