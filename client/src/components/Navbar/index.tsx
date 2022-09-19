import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { GiReactor } from "react-icons/gi";
import { HiOfficeBuilding } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import MenuIcon from "../MenuIcon";
import { Container, Logo, LogoText, MenuIcons } from "./styles";

const Navbar: React.FC = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Container>
            <Logo onClick={(): void => navigate("/")}>
                <GiReactor size={40} color={"#b5b2c4"} />
                <LogoText>Teste CRUD</LogoText>
            </Logo>
            <MenuIcons>
                <MenuIcon icon={AiFillHome} color={"#999999"} route={"/"} />
                <MenuIcon icon={BsFillPersonFill} color={"#999999"} route={"/customers"} />
                <MenuIcon icon={HiOfficeBuilding} color={"#999999"} route={"/companies"} />
            </MenuIcons>
        </Container>
    );
}

export default Navbar;