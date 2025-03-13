import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: #ffffff;
`;

export const LogoImg = styled.img`
  max-width: 50%;
  align-self: center;
  height: 64px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #f2f4f7;
  overflow-y: auto;
  height: calc(100vh - 64px);
  padding: 30px 15px 60px 15px;
`;

export const ResellerTextContainer = styled.div`
  margin-left: 10px;
`;

export const ResellerContainer = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  background: #ffffff;
  margin: 20px 0;
  border-radius: 16px;
  padding: 8px 16px;
`;

export const ResellerContainerTitle = styled.p`
  color: #757b82;
  font-size: 14px;
  font-weight: 500;
`;

export const ResellerName = styled.p``;

export const UnavailableImg = styled.img`
  margin-bottom: 10%;
`;

export const UnavailableText = styled.p`
  text-align: start;
  font-size: 16px;
  padding-right: 10px;
`;

export const ContainerOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 15px;
`;

export const Order = styled.div`
  display: flex;
  width: 100%;
  height: 152px;
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  flex-direction: column;
  gap: 15px;
  border: 1px solid #d8dbe0;
`;

export const ContentOrder = styled.div`
  width: 100%;
  display: flex;
`;

export const ContainerOrderDescription = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Name = styled.p`
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 500;
  @media (max-width: 375px) {
    font-size: 0.8rem;
  }

  @media (max-width: 320px) {
    font-size: 0.8rem;
  }
`;

export const Description = styled.p`
  display: flex;
  align-items: center;
  white-space: nowrap;
  color: #757b82;
  font-size: 0.9rem;
  font-weight: 500;
  @media (max-width: 375px) {
    font-size: 0.7rem;
  }

  @media (max-width: 320px) {
    font-size: 0.5rem;
  }
`;

export const Price = styled.p`
  display: flex;
  align-items: center;
  white-space: nowrap;
  color: #202224;
  font-size: 1.4rem;
  font-weight: 500;
  @media (max-width: 375px) {
    font-size: 1.2rem;
  }

  @media (max-width: 320px) {
    font-size: 1rem;
  }
`;
