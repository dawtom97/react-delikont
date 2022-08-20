import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { Heading } from "../Heading";
import { ProductCard } from "../ProductCard";

export const Wrapper = styled.div`
  
  & > div {
    display: flex;
    flex-wrap: wrap;
    gap:15px;
  }
`;

export const ProductAltCard = styled.article`
  width: 250px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ebebeb;
  padding: 3px 15px;
  margin: 15px 0;
  gap: 25px;



`;

export const ImageBox = styled.div`
  text-align: center;
  & h3 {
    font-size: 18px;
    font-weight: 500;
    min-width: 30%;
  }
  & img {
    height: 90px;
    width: 90px;
    object-fit: contain;
  }
`;

export const WishlistProducts = ({ items }) => {



  return (
    <Wrapper>
      <Heading level="h2">Twoje ulubione produkty</Heading>
      <div>
      {items ? items.map(({ product }) => (
        <ProductCard isAlternative product={product} key={product.id}/>
      )) : null}
      </div>
    
    </Wrapper>
  );
};
