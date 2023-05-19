import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import styled from "styled-components";
import {Button} from '../components/Button'
import { UserContext } from "../context/UserContext";

export const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
  border: 1px solid #e1e1e1;
  min-width: 250px;
  height: 430px;

  & a {
    border-bottom: 1px solid #ebebeb;
    padding: 14px 0;

    &:hover span {
      color: ${({ theme }) => theme.colorPrimary};
      transform: translateX(20px);
    }
  }
  & a:last-child {
    border: none;
  }

  & span {
    display: block;
    font-size: 14px;
    transition: 0.4s;
    cursor: pointer;
  }
  & button {
    margin-top:30px;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

export const LinkText = styled.a`
  color: ${(props) => (props.href === props.pathName ? "#f57c00" : "initial")};
  font-weight: ${(props) =>
    props.href === props.pathName ? "700" : "initial"};
`;

export const AccountAside = () => {
  const router = useRouter();
  const {userLogout} = useContext(UserContext)

  return (
    <Wrapper>
      <Link href="/konto/moje-konto" passHref>
        <LinkText pathName={router.pathname}>
          <span> Moje konto</span>
        </LinkText>
      </Link>
      <Link href="/konto/moje-zamowienia" passHref>
        <LinkText pathName={router.pathname}>
          <span>Moje zamówienia</span>
        </LinkText>
      </Link>
      <Link href="/konto/lista-zyczen" passHref>
        <LinkText pathName={router.pathname}>
          <span>Moja lista życzeń</span>
        </LinkText>
      </Link>
      <Link href="/konto/adresy" passHref>
        <LinkText pathName={router.pathname}>
          <span> Książka adresowa</span>
        </LinkText>
      </Link>
      <Link href="/konto/dane-konta" passHref>
        <LinkText pathName={router.pathname}>
          <span>Dane konta</span>
        </LinkText>
      </Link>
      <Link href="/konto/metody-platnosci" passHref>
        <LinkText pathName={router.pathname}>
          <span> Metody płatności</span>
        </LinkText>
      </Link>
      <Link href="/konto/dane-firmy" passHref>
        <LinkText pathName={router.pathname}>
          <span>Dane firmy</span>
        </LinkText>
      </Link>
      <Button onClick={userLogout}>Wyloguj</Button>
    </Wrapper>
  );
};
