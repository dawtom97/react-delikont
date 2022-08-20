import Link from "next/link";
import React, { useRef } from "react";
import styled from "styled-components";
import { ProductCard } from "../ProductCard";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 11px;
`;

const Products = ({ products,lastItem }) => {

  if (!products) return "loading...";

  return (
    <Wrapper>
      {products.map((product, index) => {
        if (index === products.length - 1) return <ProductCard key={product.id} product={product} ref={lastItem}/>;
        return <ProductCard key={product.id} product={product} />;
      })}
    </Wrapper>
  );
};

export default Products;
