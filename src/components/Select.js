import styled from "styled-components";

export const Select = styled.select`
  font-size: 12px;
  background-color: transparent;
  height: 35px;
  width: 100%;
  line-height: 40px;
  border: 1px solid white;
  border-bottom: 1px solid #e1e1e1;
  outline: none;
  transition: 0.4s;
  color: #797979;

  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.colorPrimary};
   

    &::placeholder {
      color: ${({ theme }) => theme.colorPrimary};
    }
  }

`