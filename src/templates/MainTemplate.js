import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header/Header";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import { magentoCategories } from "../graphql/magentoCategories";

export const InnerWrapper = styled.main`
  margin-top: 160px;
  max-width: 1400px;
  margin: 160px auto 0;
  padding: 0 20px;

  & > a {
    font-size: 12px;
  }
`;

export const MainTemplate = ({ children }) => {
  const [crumbs, setCrumbs] = useState();
  const [categories, setCategories] = useState();
  const router = useRouter();

  const isValidPage = router.pathname !== "/rejestracja"

  useEffect(() => {
    const paths = router.asPath
      ?.split("/")
      .filter((item) => item !== "" && item !== "kategorie");

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
    magentoCategories().then(res=>setCategories(res));
  }, []);

 // console.log(categories);


 // console.log(crumbs);

  return (
    <div>
      <Header/>
      <InnerWrapper>
        {isValidPage ? crumbs?.map((crumb, index) => (
          <Link key={index} href={crumb?.href}>
            {index !== crumbs.length - 1 ? crumb?.label + " > " : crumb?.label}
          </Link>
        )) : null}
        {children}
      </InnerWrapper>
      <Footer />
    </div>
  );
};

