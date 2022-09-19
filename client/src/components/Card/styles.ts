import styled from "styled-components";

interface Props {
    color: string;
}

export const Container = styled.div<Props>`
  border: ${props => `2px solid ${props.color}`};
  border-radius: 10px;
  cursor: pointer;
  transition: .3s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
`;

export const Icon = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Name = styled.div<Props>`
  background-color: ${props => props.color};
  width: 100%;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export const NameText = styled.span`
  color: #ffffff;
`;