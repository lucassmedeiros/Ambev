import styled from "styled-components";
import { Typography } from "@mui/material";
import { defaultTheme } from "../../styles/themes";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  width: 100vw;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    background: url("https://agenciafeel.com/wp-content/uploads/2024/11/ambev.png") no-repeat center center;
    background-size: cover;
  }
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${defaultTheme.palette.background.default};

  @media (max-width: 1000px) {
    background-color: rgba(255, 255, 255, 0);
    width: 100%;
    height: 100%;
    align-items: start;
  }
`;

export const LoginCard = styled.div`
  background: ${defaultTheme.palette.background.paper};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${defaultTheme.palette.text.primary};
  font-family: ${defaultTheme.typography.fontFamily};

  @media (max-width: 1000px) {
    width: 90%;
    gap: 5px;
    margin-top: 5rem;
    box-shadow: none;
    border: 0;
    max-width: 400px;
  }

  @media (max-width: 530px) {
    background: transparent;
  }
`;

export const RightSide = styled.div`
  background: url("https://agenciafeel.com/wp-content/uploads/2024/11/ambev.png") no-repeat center center;
  background-size: cover;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${defaultTheme.palette.secondary.light};
  border-radius: 5px;
  color: ${defaultTheme.palette.text.primary};
  font-family: ${defaultTheme.typography.fontFamily};
  font-size: ${defaultTheme.typography.fontSize}px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${defaultTheme.palette.primary.main};
  color: ${defaultTheme.palette.background.paper};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: ${defaultTheme.typography.fontSize}px;
  margin-top: 10px;
  transition: 0.3s;

  &:hover {
    background-color: ${defaultTheme.palette.primary.dark};
  }
`;

export const ForgotPassword = styled.a`
  display: block;
  margin-top: 10px;
  color: ${defaultTheme.palette.primary.main};
  text-decoration: none;
  font-size: ${defaultTheme.typography.fontSize}px;
  font-family: ${defaultTheme.typography.fontFamily};

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledTypography = styled(Typography)`
  color: ${defaultTheme.palette.text.primary};
  font-family: ${defaultTheme.typography.fontFamily};
`;