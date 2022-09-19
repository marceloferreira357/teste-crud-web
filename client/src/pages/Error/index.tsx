import React from "react";
import { Container, Description, Message, StatusCode, Title } from "./styles";

const Error: React.FC = (): JSX.Element => {
    return (
        <Container>
            <Description>
                <Title>Oops!</Title>
                <Message>Infelizmente a pagina nao foi encontrada!</Message>
                <StatusCode>Erro 404</StatusCode>
            </Description>
        </Container>
    );
}

export default Error;