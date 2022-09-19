import React, { MouseEventHandler, ReactNode } from "react";
import { Button as StyledButton } from "./styles";

interface Props {
    color?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
}

const Button: React.FC<Props> = ({ color, onClick, children }): JSX.Element => {
    return (
        <StyledButton color={color} onClick={onClick}>
            {children}
        </StyledButton>
    );
}

export default Button;