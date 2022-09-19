import { darken } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  background-color: ${darken(0.05, "#ffd180")};
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export const Message = styled.span`
  color: #ffffff;
`;