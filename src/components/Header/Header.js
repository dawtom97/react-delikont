import logo from "../../../public/logo.png";
import Image from "next/dist/client/image";
import * as Styled from './Header.styles';
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { FaRegUserCircle } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { mainMenu } from "../../fakeData/fakeData";
import { BiGitCompare, BiCalendar } from "react-icons/bi";
import { BsSuitHeart } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";



export const Header = () => {
  const { isLogged, currentUser } = useContext(UserContext);
  const [authPanelVisible, setAuthPanelVisible] = useState(false);
  console.log(isLogged, currentUser);

  const handleAccountClick = () => setAuthPanelVisible(prev=>!prev);

  return (
    <Styled.Wrapper>
      <Styled.InnerWrapper>
        <Styled.Logo>
          <Link href="/">
            <a>
              <Image src={logo} alt="" />
            </a>
          </Link>
        </Styled.Logo>

        <Styled.SearchBox>
          <input type="text" placeholder="Szukaj w sklepie..." />
          <button>
            <FiSearch />
          </button>
        </Styled.SearchBox>

        <Styled.IconsBar>
          {isLogged ? (
            <Link href="/account">
              <a>
                <FaRegUserCircle />
              </a>
            </Link>
          ) : (
            <>
              <button onClick={handleAccountClick}>
                <FaRegUserCircle/>
              </button>
              {authPanelVisible ? (
              <Styled.AuthPanel>
                <form>
                  <input type="text" placeholder="Email" name="email" />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                  <button aria-label="Zaloguj się" type="submit">
                    Zaloguj się
                  </button>
                </form>
                <button aria-label="Przypomnij hasło">
                  Nie pamiętasz hasła?
                </button>
                <div>
                  <p>
                    NIE MASZ KONTA?{" "}
                    <Link href="/register">ZAREJESTRUJ SIĘ</Link>
                  </p>
                </div>
                <ul>
                  <li>
                    <Link href="/">
                      <a>
                        <BiGitCompare /> PORÓWNAJ
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>
                        <BsSuitHeart /> MOJA LISTA ŻYCZEŃ
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>
                        <BiCalendar /> MOJE ZAMÓWIENIA
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>
                        <AiOutlineMail /> SKONTAKTUJ SIĘ Z NAMI
                      </a>
                    </Link>
                  </li>
                </ul>
              </Styled.AuthPanel>
              ) : null
}
            </>
          )}

          <Link href="/cart">
            <a>
              <BsCartCheck />
            </a>
          </Link>
        </Styled.IconsBar>
      </Styled.InnerWrapper>

      <Styled.Nav>
        <ul>
          {mainMenu.map((category) => (
            <Link key={category.name} href={category.url}>
              <li>
                {category.name}
                {category?.subcategories?.length > 0 && (
                  <Styled.SubMenu>
                    <ul>
                      {category.subcategories.map((subcat, index) => (
                        <li key={index}>
                          <Link href={subcat.url}>
                            <span>{subcat.name}</span>
                          </Link>

                          {subcat?.categories?.map((item, index) => (
                            <p key={index}>
                              <Link href={item.url}>{item.name}</Link>
                            </p>
                          ))}
                        </li>
                      ))}
                    </ul>
                  </Styled.SubMenu>
                )}
              </li>
            </Link>
          ))}
        </ul>
      </Styled.Nav>
    </Styled.Wrapper>
  );
};
