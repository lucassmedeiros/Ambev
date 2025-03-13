import { Checkbox } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100vh;
  width: 100vw;
  padding: 5rem;
`;

export const LogoImg = styled.img`
  max-width: 70%;
  align-self: center;
  margin-bottom: 20%;
  margin-top: 5%;
`;

export const ResellerContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15%;
`;

export const ResellerTextContainer = styled.div`
  margin-left: 10px;
`;

export const ResellerContainerTitle = styled.p`
  color: #757b82;
  font-size: 14px;
  font-weight: 500;
`;

export const ResellerName = styled.p``;

export const FillPhoneContainer = styled.div`
  margin-bottom: 15%;
`;

export const FillPhoneContainerText = styled.p``;

export const CheckBoxContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 20%;
`;

export const CheckBox = styled(Checkbox)``;

export const CheckBoxLabel = styled.span`
  font-weight: 500;
  color: #757b82;
  font-size: 14px;
  > span {
    color: ${({ theme }) => theme.palette.primary.main};
    text-decoration: underline;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;

    &:hover {
      opacity: 0.5;
      transition: 0.2s;
    }
  }
`;

export const UnavailableContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15%;
`;

export const UnavailableImg = styled.img`
  margin-bottom: 10%;
`;

export const UnavailableText = styled.p`
  text-align: center;
  font-size: 14px;
`;

export const NotFoundTitle = styled.p`
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 15%;
  text-align: center;
`;

export const ContainerButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
