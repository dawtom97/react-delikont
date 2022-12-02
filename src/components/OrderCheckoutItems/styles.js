import styled from "styled-components";

export const Wrapper = styled.aside`
  border: 1px solid #ebebeb;
  padding: 20px;
  width: 40%;
  @media (max-width: 992px) {
    width: 100%;
    margin-top: 30px;
  }

  & h3 {
    font-size: 20px;
  }
`;

export const Accordeon = styled.div`
  border-bottom: 1px solid #ebebeb;

  display: flex;
  width: 100%;
  & button {
    margin-left: auto;
    background-color: transparent;
    height: 100%;
    cursor: pointer;
    font-size: 26px;
    border: none;
  }
`;

export const Item = styled.div`
  display: flex;
  width: 100%;
  min-width: 320px;
  margin: 10px 0;

  & img {
    width: 75px;
    height: 75px;
    object-fit: contain;
    margin-right: 20px;
  }

  & p {
    font-size: 14px;

    margin-right: 20px;
    overflow-wrap: break-word;
  }

  & span {
    margin-left: auto;
    color: ${({ theme }) => theme.colorGray};
  }
`;

export const SubmitBox = styled.div`
  margin-bottom: 40px;
`;

export const ButtonsBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;
