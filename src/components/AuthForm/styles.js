import styled from "styled-components";

export const Wrapper = styled.div`
  text-align: center;
  margin-top:190px;

  & a {
    text-decoration: underline;
  }

  & input {
    margin: 12px 0;
  }
`;

export const AuthWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ebebeb;
  min-width: 600px;
  width: 50%;

  @media (max-width:768px) {
    width: 100%;
    min-width: 300px;
  }

  & legend {
    border-bottom: 1px solid #282828;
    text-transform: uppercase;
    padding-bottom:15px;
    margin: 10px 0;
    font-weight: 600;
    width: 100%;
  }
  & input {
    display: block;
    width:100%;
  }

  & button {
    margin:7px 0;
  }
  & a {
    text-decoration: none;
  }

`;