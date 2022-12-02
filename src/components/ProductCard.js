import Link from "next/link";
import React, { forwardRef } from "react";
import styled from "styled-components";
import { ProductPrice } from "./ProductPrice";

export const Card = styled.article`
  width: calc(15% - 10px);
  border: 1px solid #ebebeb;
  padding: 10px;
  font-size: 14px;
  min-height: 460px;
  min-width: 180px;
  flex: 1;
  text-align: center;

  @media screen and (max-width:1440px) {
    width:calc(17% - 10px)
  }
  @media screen and (max-width:1440px) {
    width:calc(20% - 10px)
  }
  @media screen and (max-width:992px) {
    width:calc(25% - 10px)
  }
  @media screen and (max-width:768px) {
    width:calc(33% - 10px)
  }
  @media screen and (max-width:576px) {
    width:calc(50% - 10px)
  }

  & img {
    width: 100%;
    height: 150px;
    object-fit: contain;
    cursor: pointer;
  }

  & a {
    display: block;
    min-height: 57px;
    width: 100%;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
  }
`;


export const ProductCard =forwardRef (({ product,isAlternative },ref) => {

  const productDetailsUrl = `/produkt/${product.categories?.map(product => [product.url_key]).join("/")}/${product.url_key}`

  if(!product) return;

  return (
    <Card ref={ref}>
      <Link href={productDetailsUrl}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image?.url}
            layout="responsive"
            alt={product.name}
          />
          <a>
            {product.name} {product.weight}G
          </a>
        </div>
      </Link>
      <ProductPrice product={product} isAlternative={isAlternative}/>
    </Card>
  );
  });

ProductCard.displayName = ProductCard