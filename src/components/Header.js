import logo from "../../public/logo.png";
import Image from "next/dist/client/image";
import styled from "styled-components";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FaRegUserCircle } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { mainMenu } from "../fakeData/fakeData";

export const Wrapper = styled.header``;

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
  gap: 20px;
  & button {
    background-color: transparent;
    border: none;
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
     

      &:hover ul {
        opacity: 1;
        display: block;
      }
    }
  }
`;

export const SubMenu = styled.ul`
  list-style: none;
  opacity:0;
  display: none;
  position: absolute;
  transition: 0.4s;
  color: black;
  background-color: #fff;
  width: 100%;
  left: 0;
`

export const Header = () => {
  const { isLogged, currentUser } = useContext(UserContext);
  console.log(isLogged, currentUser);

  return (
    <Wrapper>
      <InnerWrapper>
        <Logo>
          <Link href="/">
            <a>
              <Image src={logo} alt="" />
            </a>
          </Link>
        </Logo>

        <SearchBox>
          <input type="text" placeholder="Szukaj w sklepie..." />
          <button>
            <FiSearch />
          </button>
        </SearchBox>

        <IconsBar>
          {isLogged ? (
            <Link href="/account">
              <a>
                <FaRegUserCircle />
              </a>
            </Link>
          ) : (
            <button>
              <FaRegUserCircle />
            </button>
          )}

          <Link href="/cart">
            <a>
              <BsCartCheck />
            </a>
          </Link>
        </IconsBar>
      </InnerWrapper>

      <Nav>
        <ul>
          {mainMenu.map((category) => (
            <Link key={category.name} href={category.url}>
              <li>
                {category.name}
                {category?.subcategories?.length > 0 && (
                  <SubMenu>
                   
                    {category.subcategories.map((subcat, index) => (
                      <li key={index}>
                        <Link href={subcat.url}>
                        <span>{subcat.name}</span>
                        </Link>
                     
                        {subcat?.categories?.map((item,index)=>(
                            <ul key={index}>
                                <li>
                                    <Link href={item.url}>
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            </ul>
                        ))}
                      </li>
                    ))}
                  
                  </SubMenu>
                )}
              </li>
            </Link>
          ))}
        </ul>
      </Nav>
    </Wrapper>
  );
};
