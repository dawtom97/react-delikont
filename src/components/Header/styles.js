import styled from "styled-components";

export const Wrapper = styled.header`
top:0;
position: fixed;
width: 100%;
background-color: #fff;
z-index: 100;
`;

export const InnerWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 10px;
  display: flex;
  align-items: center;
`;
export const SearchBox = styled.div`
  display: flex;
  width: 37.5%;

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 0px 20px 20px 0;
    width: 9%;
    border: 1px solid #e1e1e1;
    border-left: none;
    min-width: 44px;
    color: #fff;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colorPrimary};
    & > svg {
      font-size: 20px;
    }
  }
  & > input {
    padding: 10px 0;
    border-radius: 20px 0 0 20px;
    width: 91%;
    outline: none;
    display: block;
    height: 100%;
    padding-left: 20px;
    border: 1px solid #e1e1e1;
    border-right: none;
  }
`;

export const Logo = styled.div`
  width: 25%;
`;

export const IconsBar = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  position: relative;
  gap: 20px;
  & button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  & svg {
    font-size: 30px;
  }
`;

export const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colorPrimary};

  & > ul {
    list-style: none;
    display: flex;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0px 10px;
    gap: 30px;
    & > li {
      text-transform: uppercase;
      width: auto;
      font-weight: 400;
      text-align: left;
      color: #fff;
      height: 100%;
      padding: 10px 0px;
      font-size: 15px;
      cursor: pointer;

      @media screen and (max-width:1400px) {
        font-size: 13px;
      }

      &:hover div {
        opacity: 1;
        visibility: visible;
      }
    }
  }
`;

export const SubMenu = styled.div`
  padding: 0px 10px;
  z-index: 10;
  position: absolute;
  transition: 0.4s;
  min-height: 300px;
  box-shadow: 0px 18px 10px -18px rgba(168, 170, 189, 1);
  color: black;
  background-color: #fff;
  width: 100%;
  left: 0;
  padding: 18px 0;
  top: 140px;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.2s, opacity 0.5s;

  & > ul {
    list-style: none;
    max-width: 1400px;
    margin: 0 auto;
    justify-content: flex-start;
    display: flex;
    gap: 20px;
  }

  & li {
    flex: 1;

    & span {
      border-bottom: 1px solid black;
      display: block;
      width: 100%;
      font-size: 13px;
      font-weight: 700;
      padding-bottom: 8px;
    }

    & > p a {
      text-transform: capitalize;
      display: block;
      width: 100%;
      height: 100%;
      padding-bottom: 8px;
      font-size: 13px;
      color: ${({ theme }) => theme.colorGray};
      border-bottom: 1px solid #e1e1e18f;
    }
  }
`;
export const AuthPanel = styled.div`
  padding: 20px;
  position: absolute;
  background-color: #fff;
  right: 1%;
  top: 100%;
  min-width: 300px;
  box-shadow: 8px 8px 10px -11px rgba(66, 68, 90, 1);
  text-align: center;

  &  > svg {
    font-size:60px;
    color:#ddd;
  }

  & > form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    & input {
      font-size: 12px;
      background-color: transparent;
      height: 35px;
      line-height: 40px;
      border: none;
      border-bottom: 1px solid #e1e1e1;
      outline: none;
      transition: 0.4s;
    }
    & input:focus {
      border-bottom: 1px solid ${({ theme }) => theme.colorPrimary};
      color: ${({ theme }) => theme.colorPrimary};

      &::placeholder {
        color: ${({ theme }) => theme.colorPrimary};
      }
    }
    & button {
      border: 1px solid ${({ theme }) => theme.colorPrimary};
      height: 32px;
      color: ${({ theme }) => theme.colorPrimary};
      font-weight: 700;
      text-transform: uppercase;
      font-size: 12px;
      margin-top: 30px;
    }
  }
  & > button {
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: center;
    margin-top: 5px;
    color: ${({ theme }) => theme.colorGray};
  }

  & > div {
    background-color: #efefef;
    padding: 10px;
    font-size: 12px;
    text-align: center;
    font-weight: 500;
    margin-top:20px;

    & a {
      color: ${({ theme }) => theme.colorGray};
    }
  }
  & > ul {
    list-style: none;
    width: 100%;
    padding: 0 10px;

    & li a {
        display: flex;
        align-items: center;
        font-size:10px;
        font-weight: 700;
        margin:8px 0;
    }
    & svg {
        font-size:13px;
        margin-right:10px;
    }
  }
`;