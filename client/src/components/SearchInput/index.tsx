import React, { ChangeEventHandler, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Container, Input } from "./styles";

interface Props {
    onChange: ChangeEventHandler<HTMLInputElement>;
    fetchData: () => Promise<void>;
}

const SearchInput: React.FC<Props> = ({ onChange, fetchData }): JSX.Element => {
    const [iconColor, setIconColor] = useState<string>("#808080");

    return (
        <Container>
            <Input placeholder="Pesquisar por nome" onChange={onChange} />
            <div onClick={(): void => {
                fetchData();
            }}>
                <AiOutlineSearch
                    size={22}
                    color={iconColor}
                    onMouseEnter={() => setIconColor("#4d4d4d")}
                    onMouseLeave={() => setIconColor("#808080")}
                    style={{ cursor: "pointer" }}
                />
            </div>
        </Container>
    );
}

export default SearchInput;