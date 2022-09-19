import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";

interface Props {
    icon: IconType;
    color: string;
    route: string;
}

const MenuIcon: React.FC<Props> = ({ icon, color, route }): JSX.Element => {
    const [iconColor, setIconColor] = useState<string>(color);
    const [oldPathName, setOldPathName] = useState<string | undefined>(undefined);

    const { pathname } = useLocation();

    const changeIconColor = (): void => {
        if (pathname !== route) {
            setIconColor(color);
        } else if (pathname === route) {
            setIconColor("#4d4d4d");
        }
    }

    useEffect(changeIconColor, [pathname]);

    return (
        <div
            style={{ cursor: "pointer" }}
            onMouseEnter={(): void => setIconColor("#4d4d4d")}
            onMouseLeave={changeIconColor}
        >
            <Link to={route}>
                {icon({ size: 25, color: iconColor })}
            </Link>
        </div>
    );
}

export default MenuIcon;