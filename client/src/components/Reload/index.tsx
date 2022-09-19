import React from "react";
import { AiOutlineReload } from "react-icons/ai";
import { Button, Container } from "./styles";

interface Props {
    total: number;
    size: number;
    setSize: React.Dispatch<React.SetStateAction<number>>;
}

const Reload: React.FC<Props> = ({ total, size, setSize }): JSX.Element => {
    return (
        <Container>
            <Button onClick={(): void => {
                if (total > size) {
                    setSize(size + 8);
                }
            }}>
                <AiOutlineReload size={25} color={"#ffffff"} />
            </Button>
        </Container>
    );
}

export default Reload;