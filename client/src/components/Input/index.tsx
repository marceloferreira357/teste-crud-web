import React from "react";
import { Input as StyledInput } from "./styles";

interface Props {
    disabled?: boolean;
    defaultValue?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<Props> = ({ disabled = false, defaultValue, onChange }): JSX.Element => {
    return (
        <StyledInput
            disabled={disabled}
            defaultValue={defaultValue}
            onChange={onChange}
        />
    );
}

export default Input;