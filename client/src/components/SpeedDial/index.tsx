import React from "react";
import { IconType } from "react-icons/lib";
import { Container } from "./styles";

interface Props {
    icon: IconType;
    color: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const SpeedDial: React.FC<Props> = ({ icon, color, onClick }): JSX.Element => {
    return (
        <Container color={color} onClick={onClick}>
            {icon({ size: 25, color: "#ffffff" })}
        </Container>
    );
}

export default SpeedDial;