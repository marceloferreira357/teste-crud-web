import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  margin-bottom: 10px;
`;

export const Title = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  gap: 5px;
  margin-top: 10px;
`;

export const Viewport = styled.div`
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Information = styled.span`
  color: #808080;
`;