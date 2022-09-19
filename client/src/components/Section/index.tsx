import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { Container, Label } from "./styles";

interface Props {
    color: string;
    label: string;
}

const Section: React.FC<Props> = ({ color, label }): JSX.Element => {
    return (
        <Container>
            <BiChevronRight color={color} />
            <Label color={color}>
                {label}
            </Label>
        </Container>
    );
}

export default Section;