import styled from "styled-components";

export const Button = styled.button`
  background-color: ${({ isSecondary,theme }) => isSecondary ? "transparent" : theme.colorPrimary};
  color: ${({ isSecondary,theme }) => isSecondary ? theme.colorPrimary : "#fff"};
  width: 300px;
  height: 40px;
  border-radius: 30px;
  border: 1px solid ${({ theme }) => theme.colorPrimary};
  font-weight: 700;
  cursor: pointer;

  & > a {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
  }
`;
