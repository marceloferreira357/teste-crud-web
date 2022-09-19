import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
  margin-top: 10px;
  z-index: 1;
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

export const LogoText = styled.span`
  font-size: 30px;
  font-weight: bold;
`;

export const MenuIcons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;