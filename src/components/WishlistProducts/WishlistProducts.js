import React from "react";
import * as Styled from './styles';
import { Heading } from "../Heading";
import { ProductCard } from "../ProductCard";

export const WishlistProducts = ({ items }) => {

  return (
    <Styled.Wrapper>
      <Heading level="h2">Twoje ulubione produkty</Heading>
      <div>
      {items.length ? items.map(({ product }) => (
        <ProductCard product={product} key={product.id}/>
      )) : <p>Nie polubiłeś jeszcze żadnych produktów.</p>}
      </div>
    
    </Styled.Wrapper>
  );
};
