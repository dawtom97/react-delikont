import React, { useContext, useEffect, useState } from "react";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import styled from "styled-components";
import { useRouter } from "next/router";
import { AccountAside } from "../components/AccountAside";
import { Heading } from "../components/Heading";
import { UserContext } from "../context/UserContext";
import { ModalContext } from "../context/ModalContext";

export const InnerWrapper = styled.main`
  max-width: 1400px;
  margin: 175px auto 0;
  padding: 0 20px;

  & > div {
    display: flex;
    gap: 35px;
    @media (max-width:992px) {
      flex-direction: column;
    }

    & > div {
      flex: 1;
    }
  }

  & > a {
    font-size: 12px;
  }
`;

export const AccountTemplate = ({ children }) => {
  const { currentUser, token } = useContext(UserContext);
  const {showModal} = useContext(ModalContext)
  const path = useRouter();
  const paths = path.asPath.split("/");
  const title = paths[paths.length - 1];
  const formatedTitle =
    title.charAt(0).toUpperCase() +
    title
      .slice(1)
      .replaceAll("-", " ")
      .replace("zyczen", "życzeń")
      .replace("zamowienia", "zamówienia");


    // useEffect(()=>{
    //   if (!currentUser.email) {
    //     console.log(currentUser);
    //     path.push("/rejestracja");
    //     showModal("Zaloguj się, aby przejść do panelu użytkownika")
    //     return;
    //   }
    // },[])


  return (
    <div>
      <Header />
      <InnerWrapper>
        {/* <Heading level="h1">{formatedTitle}</Heading> */}
        <div>
          <AccountAside />
          <div>{children}</div>
        </div>
      </InnerWrapper>
      <Footer />
    </div>
  );
};
