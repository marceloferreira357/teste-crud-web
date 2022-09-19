import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const Label = styled.span<{ color: string; }>`
  color: ${props => props.color};
`;