import styled from "styled-components";

export const Input = styled.input`
  font-size: 12px;
  background-color: transparent;
  height: 35px;
  line-height: 40px;
  border: none;
  border-bottom: 1px solid #e1e1e1;
  outline: none;
  transition: 0.4s;

  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.colorPrimary};
    color: ${({ theme }) => theme.colorPrimary};

    &::placeholder {
      color: ${({ theme }) => theme.colorPrimary};
    }
  }
`;
