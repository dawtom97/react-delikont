import styled from "styled-components";
import SearchInput from "../SearchInput";

export const Wrapper = styled.header`
  top: 0;
  position: fixed;
  width: 100%;
  background-color: #fff;
  z-index: 400;
`;

export const InnerWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 16px;
  display: flex;
  align-items: center;
`;

export const Logo = styled.div`
  width: 25%;
  min-width: 150px;
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
  min-height: 35px;
  background-color: ${({ theme }) => theme.colorPrimary};

  @media (max-width: 992px) {
    min-height: 30px;
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
  }

  & > ul {
    @media (max-width: 992px) {
      flex-direction: column;
      top: 0;
      position: fixed;
      /* min-height: 100vh; */
      max-width: 400px;
      width: 80%;
      padding: 16px;
      left: 0;
      background-color: #000000b3;
      height: 100%;
      overflow-y: scroll;
      transition: 0.4s;
      transform: translateX(-105%);
    }

    list-style: none;
    display: flex;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0px 10px;
    gap: 30px;
    & > div {
      text-transform: uppercase;
      width: auto;
      font-weight: 400;
      text-align: left;
      color: #fff;
      height: 100%;
      flex-grow: 1;
      padding: 10px 0px;
      white-space: nowrap;
      font-size: 15px;
      cursor: pointer;

      @media screen and (max-width: 1400px) {
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
  display: flex;

  @media (max-width: 992px) {
    flex-direction: column;
    position: static;
    padding: 16px;
    display: flex;
    min-height: initial;
    opacity: 1;
    visibility: visible;
    left: 0;
    background-color: transparent;
    box-shadow: none;
  }

  & ul {
    list-style: none;
    flex-grow: 2;
    justify-content: flex-start;
    gap: 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 0px 20px;
    @media (max-width: 992px) {
      grid-template-columns: 1fr;
      color: white;
      background-color: transparent;
    }
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
      @media (max-width: 992px) {
        border-bottom: 1px solid white;
      }
    }

    & > p a {
      text-transform: capitalize;
      display: block;
      width: 100%;
      height: 100%;
      padding-bottom: 8px;
      font-size: 13px;
      color: ${({ theme }) => theme.colorGray};

      @media (max-width: 992px) {
        display: none;
      }
    }
  }
`;

export const FeaturedInCat = styled.div`
  @media (max-width: 992px) {
    display: none;
  }

  display: flex;
  flex-grow: 1;
  flex-direction: column;

  & > div {
    width: 100%;
  }

  & > p {
    border-bottom: 1px solid black;
    display: block;
    width: 100%;
    margin-top: 0;
    font-size: 13px;
    font-weight: 700;
    padding-bottom: 8px;
  }
`;

// export const FeaturedBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex-grow: 1;
//   align-items: center;
//   justify-content: center;
// `;

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  gap: 35px;
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

  & > svg {
    font-size: 60px;
    color: #ddd;
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
    margin-top: 20px;

    & a {
      color: ${({ theme }) => theme.colorGray};
    }
  }
  & > ul {
    list-style: none;
    width: 100%;
    /* padding: 0 10px; */

    & li a {
      display: flex;
      align-items: center;
      font-size: 10px;
      font-weight: 700;
      margin: 8px 0;
    }
    & svg {
      font-size: 13px;
      margin-right: 10px;
    }
  }
`;

export const CartIcon = styled.a`
  position: relative;
  cursor: pointer;
  display: flex;
  font-size: 12px;
  font-weight: 600;
  align-items: center;

  & span {
    margin: 5px;
  }
`;

export const CartItemsNum = styled.span`
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  font-size: 11px;
  font-weight: 500;
  height: 20px;
  border-radius: 50%;
  color: #fff;
  top: -10px;
  right: -10px;
  position: absolute;
`;

export const CartItemsValue = styled.span`
   
`;

export const CartText = styled.span`
  display: block;
  font-size: 13px;
`

export const Hamburger = styled.button`
  display: none;
  border: none;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
  font-size: 2rem;

  @media (max-width: 992px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const CloseMenu = styled.button`
  display: none;

  @media (max-width: 992px) {
    display: block;
    border: none;
    font-size: 34px;
    background-color: transparent;
    outline: none;
    text-align: left;
    margin-left: -13px;
    color: white;
    cursor: pointer;
  }
`;


  

