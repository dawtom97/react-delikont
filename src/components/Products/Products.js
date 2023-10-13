import Link from "next/link";
import React, { useRef } from "react";
import styled from "styled-components";
import { ProductCard } from "../ProductCard/ProductCard";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 11px;
  @media (max-width: 1400px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 820px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const Products = ({ products, lastItem }) => {
  if (!products) return "loading...";

  console.log(products);

  return (
    <Wrapper>
      {products.map((product, index) => {
        if (index === products.length - 1)
          return (
            <ProductCard key={product.sku} product={product} ref={lastItem} />
          );
        return <ProductCard key={product.sku} product={product} />;
      })}
    </Wrapper>
  );
};

export default Products;
