import Link from "next/link";
import React, { forwardRef } from "react";
import styled from "styled-components";
import { ProductPrice } from "./ProductPrice";

export const Card = styled.article`
  width: calc(15% - 20px);
  border: 1px solid #ebebeb;
  padding: 10px;
  font-size: 14px;
  min-height: 460px;
  text-align: center;

  @media screen and (max-width:1440px) {
    width:calc(17% - 20px)
  }
  @media screen and (max-width:1440px) {
    width:calc(20% - 20px)
  }
  @media screen and (max-width:992px) {
    width:calc(25% - 20px)
  }
  @media screen and (max-width:768px) {
    width:calc(33% - 20px)
  }
  @media screen and (max-width:576px) {
    width:calc(50% - 20px)
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


export const ProductCard =forwardRef (({ product },ref) => {
  const price = String(
    product?.price_range?.minimum_price?.final_price.value
  ).split(".");

  console.log(product);

  const productDetailsUrl = `/produkt/${product.categories.map(product => [product.url_key]).join("/")}/${product.url_key}`
  console.log(productDetailsUrl)

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
      <ProductPrice product={product}/>
    </Card>
  );
  });

ProductCard.displayName = ProductCard