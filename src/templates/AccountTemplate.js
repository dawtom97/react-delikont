import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header/Header";
import styled from "styled-components";
import { useRouter } from "next/router";
import { AccountAside } from "../components/AccountAside";
import { Heading } from "../components/Heading";

export const InnerWrapper = styled.main`
  margin-top: 160px;
  max-width: 1400px;
  margin: 160px auto 0;
  padding: 0 20px;

  & > div {
    display: flex;
    gap: 35px;
  }

  & > a {
    font-size: 12px;
  }
`;

export const AccountTemplate = ({ children }) => {
  const path = useRouter();
  const paths = path.asPath.split("/");
  const title = paths[paths.length - 1];
  const formatedTitle =
    title.charAt(0).toUpperCase() +
    title.slice(1).replaceAll("-", " ")
    .replace("zyczen", "życzeń")
    .replace("zamowienia","zamówienia")
    ;

  return (
    <div>
      <Header />
      <InnerWrapper>
        <Heading level="h1">{formatedTitle}</Heading>
        <div>
          <AccountAside />
          {children}
        </div>
      </InnerWrapper>
      <Footer />
    </div>
  );
};