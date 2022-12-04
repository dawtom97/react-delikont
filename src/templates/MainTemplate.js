import React, { useContext, useEffect, useState } from "react";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import { magentoCategories } from "../graphql/magentoCategories";
import { UserContext } from "../context/UserContext";
import DevInfo from "../components/DevInfo/DevInfo";
import { IoHammer } from "react-icons/io5";

export const InnerWrapper = styled.main`
  margin-top: 160px;
  max-width: 1400px;
  margin: 160px auto 0;
  padding: 0 20px;

  & > a {
    font-size: 12px;
  }
`;

export const DevInfoBtn = styled.button`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colorPrimary};
  border: none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  box-shadow: 0px 4px 12px 1px #97785d;
`;

export const MainTemplate = ({ children }) => {
  const [crumbs, setCrumbs] = useState();
  const [categories, setCategories] = useState();
  const router = useRouter();

  const [devInfo, setDevInfo] = useState();

  const isValidPage = router.pathname !== "/autoryzacja";
  //&& !router.pathname.includes("/podsumowanie");

  useEffect(() => {
    const paths = router.asPath
      ?.split("/")
      .filter(
        (item) => item !== "" && item !== "kategorie" && item !== "produkt"
      );

    const breadcrumbs = paths.map((path, index) => {
      const href = "/" + paths.slice(0, index + 1).join("/");
      return {
        href,
        label:
          path.charAt(0).toUpperCase() + path.slice(1).replaceAll("-", " "),
      };
    });

    setCrumbs([{ href: "/", label: "Strona główna" }, ...breadcrumbs]);
  }, [router]);

  useEffect(() => {
    magentoCategories().then((res) => setCategories(res));
  }, []);

  return (
    <div>
      {devInfo && <DevInfo onClick={() => setDevInfo(false)} />}
      <DevInfoBtn onClick={() => setDevInfo((prev) => !prev)}>
        <IoHammer />
      </DevInfoBtn>

      <Header />
      <InnerWrapper>
        {isValidPage
          ? crumbs?.map((crumb, index) => (
              <Link key={index} href={crumb?.href}>
                {index !== crumbs.length - 1
                  ? crumb?.label + " > "
                  : crumb?.label}
              </Link>
            ))
          : null}
        {children}
      </InnerWrapper>
      <Footer />
    </div>
  );
};
