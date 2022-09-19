import { lighten } from "polished";
import styled from "styled-components";

interface Props {
    color: string;
}

export const Container = styled.div<Props>`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: ${props => props.color};
  position: fixed;
  bottom: 65px;
  right: 10px;
  z-index: 1;
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  transition: .3s;

  &:hover {
    background-color: ${props => lighten(0.03, props.color)};
  }
`;