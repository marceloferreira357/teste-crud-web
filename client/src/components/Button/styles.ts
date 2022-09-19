import { lighten } from "polished";
import styled from "styled-components";

interface Props {
    color?: string
}

export const Button = styled.button<Props>`
  border: none;
  background-color: ${props => props.color ? props.color : "transparent"};
  color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  transition: .3s;

  &:hover {
    background-color: ${props => props.color ? lighten(0.03, props.color) : "transparent"};
  }
`;