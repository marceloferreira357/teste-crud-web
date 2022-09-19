import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Modal as ModalBootstrap } from "react-bootstrap";

interface Props {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
}

const Modal: React.FC<Props> = ({ show, setShow, children }): JSX.Element => {
    return (
        <ModalBootstrap show={show} onHide={(): void => setShow(false)} size="lg" centered>
            <ModalBootstrap.Body>
                {children}
            </ModalBootstrap.Body>
        </ModalBootstrap>
    );
}

export default Modal;