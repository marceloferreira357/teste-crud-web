import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Title = styled.span`
  text-align: center;
  font-size: 35px;
  font-weight: bold;
`;

export const Message = styled.span`
  text-align: center;
  margin: 30px 0px 30px 0px;
`;

export const StatusCode = styled.span`
  text-align: center;
  font-style: italic;
  color: #808080;
`;