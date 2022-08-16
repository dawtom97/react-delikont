import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header/Header";

import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

export const InnerWrapper = styled.main`
  margin-top: 160px;
  max-width: 1400px;
  margin: 160px auto 0;
`;

const API_URL = "http://185.200.44.108/graphql";

export const MainTemplate = ({ children }) => {
  const [crumbs, setCrumbs] = useState();
  const [categories, setCategories] = useState();
  const router = useRouter();

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
    setCategories(getAllCategories());
    console.log(categories);
  }, []);

  const getAllCategories = () => {
    axios({
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://185.200.44.108/graphql",
      },
      url: API_URL,
      method: "post",
      data: {
        query: `{
          categoryList(filters:{}) {
              name
              children_count
              children {
                  id 
                  level
              }
          }
      }`,
      },
    })
    .then((res)=>console.log(res))
    .catch(err => console.log(err))
    ;
  };

  console.log(crumbs);

  return (
    <div>
      <Header />
      <InnerWrapper>
        {crumbs?.map((crumb, index) => (
          <Link key={index} href={crumb?.href}>
            {index !== crumbs.length - 1 ? crumb?.label + " > " : crumb?.label}
          </Link>
        ))}
        {children}
      </InnerWrapper>
      <Footer />
    </div>
  );
};

