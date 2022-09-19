import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { Buttons, Container, FlexArea, SubTitle, Title } from "./styles";

const Home: React.FC = (): JSX.Element => {
    const navigate: NavigateFunction = useNavigate();

    return (
        <Container>
            <FlexArea>
                <Title>Selecione uma das funcionalidades</Title>
                <SubTitle>As funcionalidades representam os CRUDs</SubTitle>
                <Buttons>
                    <Button color={"#ecaab9"} onClick={(): void => navigate("/customers")}>
                        Acessar clientes
                    </Button>
                    <Button color={"#ffb6a2"} onClick={(): void => navigate("/companies")}>
                        Acessar empresas
                    </Button>
                </Buttons>
            </FlexArea>
        </Container>
    );
}

export default Home;