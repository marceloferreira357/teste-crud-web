import React, { MouseEventHandler } from "react";
import { IconType } from "react-icons/lib";
import { Container, Icon, Name, NameText } from "./styles";

interface Props {
    icon: IconType
    color: string;
    name: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const Card: React.FC<Props> = ({ icon, color, name, onClick }): JSX.Element => {
    return (
        <Container color={color} onClick={onClick}>
            <Icon>
                {icon({ size: 100, color: color })}
            </Icon>
            <Name color={color}>
                <NameText>{name}</NameText>
            </Name>
        </Container>
    );
}

export default Card;