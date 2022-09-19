import { darken } from "polished";
import styled from "styled-components";

interface Props {
    disabled: boolean;
}

export const Input = styled.input<Props>`
  border: 1.5px solid #bfbfbf;
  border-radius: 10px;
  padding: 5px;
  outline: none;
  background-color: ${props => props.disabled ? darken(0.05, "#ffffff") : "transparent"};
  cursor: ${props => props.disabled ? "not-allowed" : "inherit"};
`;