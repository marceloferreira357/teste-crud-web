import React from "react";
import { AiFillWarning } from "react-icons/ai";
import { Container, Message } from "./styles";

interface Props {
    message: string;
}

const Warning: React.FC<Props> = ({ message }): JSX.Element => {
    return (
        <Container>
            <AiFillWarning size={20} color={"#ffffff"} />
            <Message>{message}</Message>
        </Container>
    );
}

export default Warning;