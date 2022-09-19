import styled, { createGlobalStyle, DefaultTheme, GlobalStyleComponent } from 'styled-components';

export const GlobalStyle: GlobalStyleComponent<{}, DefaultTheme> = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Poppins";
    color: #4d4d4d;
  }
`;

export const PagesContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  gap: 10px;
`;