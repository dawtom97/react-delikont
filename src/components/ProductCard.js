import Link from "next/link";
import React, { forwardRef } from "react";
import styled from "styled-components";

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
export const WeightBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const PriceBox = styled.div`
  text-align: center;
  display: flex;
  font-size: 58px;
  font-weight: 500;
  align-items: center;
  justify-content: center;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;
export const Tax = styled.span`
  font-size: 14px;
  font-weight: 400;
  position: relative;
  left: 3px;
  top: -4px;
`;
export const Cent = styled.span`
  font-size: 32px;
`;
export const MainPrice = styled.span`
  text-align: left;
`;
export const ButtonsBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  & p {
    text-align: center;
    margin: 0;
    font-size: 12px;
  }
`;
export const Controls = styled.div`
  display: flex;
  width: 90px;
  height: 30px;
  text-align: center;
  border: 1px solid #ebebeb;
  border-radius: 30px;
  overflow: hidden;

  & input {
    width: 100%;
    border: none;
    color: #9c9c9c;
    text-align: center;
    outline: none;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    -moz-appearance: textfield;
  }
  & button {
    background-color: transparent;
    border: none;
    font-size: 18px;
    transition: 0.4s;

    &:hover {
      color: ${({ theme }) => theme.colorPrimary};
    }
  }
`;

export const Button = styled.button`
  border: 1px solid ${({ theme }) => theme.colorPrimary};
  border-radius: 30px;
  background-color: transparent;
  height: 30px;
  text-align: center;
  width: auto;
  font-size: 11px;
  color: ${({ theme }) => theme.colorPrimary};
  font-weight: 700;
  margin-top: 10px;
  cursor: pointer;
`;

export const ProductCard =forwardRef (({ product },ref) => {
  const price = String(
    product?.price_range?.minimum_price?.final_price.value
  ).split(".");

  return (
    <Card ref={ref}>
      <Link href={`/${product.link}`}>
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
      <WeightBox>
        <span>
          {product.weight}{" "}
          {product?.categories[0].url_key == "napoje" ? "ml" : "g"}
        </span>
        <span>
          {product?.price_range?.minimum_price?.final_price.value} / kg
        </span>
      </WeightBox>
      <PriceBox>
        <MainPrice>{price[0]}</MainPrice>
        <div>
          <Cent>{price[1] ? price[1] : "00"}</Cent>
          <Tax>
            z Vat {price[0]},{price[1] ? price[1] : "00"} zł
          </Tax>
        </div>
      </PriceBox>

      <ButtonsBox>
        <div>
          <p>sztuk:</p>
          <Controls>
            <button>-</button>
            <input type="number" name="qty"  />
            <button>+</button>
          </Controls>
        </div>
        <div>
          <p>kartonów:</p>
          <Controls>
            <button>-</button>
            <input type="number" name="qty"  />
            <button>+</button>
          </Controls>
        </div>
      </ButtonsBox>

      <Button>DODAJ DO KOSZYKA</Button>
    </Card>
  );
  });

ProductCard.displayName = ProductCard