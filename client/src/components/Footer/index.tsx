import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { Container } from "./stylex";

const Footer: React.FC = (): JSX.Element => {
    return (
        <Container>
            <span>Feito com <AiFillHeart size={20} color={"#ff889d"} /> por Marcelo</span>
        </Container>
    );
}

export default Footer;