import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { UserContext } from "../../context/UserContext";
import { ButtonsBox } from "./ButtonsBox";

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
  border: 1px solid;
  border-color: ${({ isOutOfStock }) =>
    isOutOfStock === true ? "#b3b3b3" : "#f57c00"};
  border-radius: 30px;
  background-color: transparent;
  height: 30px;
  text-align: center;
  color: ${({ isOutOfStock }) =>
    isOutOfStock === true ? "#b3b3b3" : "#f57c00"};
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
`;

export const WishlistButtonsBox = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: ${({ isOutOfStock }) => (isOutOfStock ? `103px` : `10px`)};

  & button:nth-child(1) {
    border: ${({ isOutOfStock }) =>
      isOutOfStock ? "1px solid #bcbcbc" : "1px solid #f57c00"};
    color: ${({ isOutOfStock }) => (isOutOfStock ? "#bcbcbc" : "#f57c00")};
    pointer-events: ${({ isOutOfStock }) =>
      isOutOfStock ? "none" : "initial"};
  }

  & button {
    border-radius: 50%;
    font-size: 18px;
    line-height: 35px;
    cursor: pointer;
    text-align: center;
    width: 35px;
    background-color: transparent;
    height: 35px;
    border: 1px solid;
    color: ${({ theme }) => theme.colorPrimary};

    &:hover {
      background-color: ${({ theme }) => theme.colorPrimary};
      color: white;
    }
  }
`;

export const ProductPrice = ({ product, isAlternative, cartProduct }) => {
  const { removeFromWishlist, addToCart } = useContext(UserContext);

  const checkWeightFormat = (weight) => (weight === 6 ? "kg" : " l");

  
  console.log(product?.price_range?.minimum_price?.final_price?.value)
  console.log(product)

  const price = String(
    (product?.price_range?.minimum_price?.final_price?.value).toFixed(2)
  ).split(".");
  const notVatPrice = product?.price_range?.minimum_price?.final_price?.value / (1 + (product?.cytax / 100))
  const netto = notVatPrice.toFixed(2).split(".")
  const calculatePricePer =  product.format === 'kg' || product.format === 'l' ? 1 : 1000

  if (!product) return;

  return (
    <>
      <WeightBox>
        <span>
          {!product.ciezar_w_jednostkach
            ? product.weight
            : product.ciezar_w_jednostkach}
          {product.format}
        </span>
        <span>
          {!product.ciezar_w_jednostkach
            ? (
                (product?.price_range?.minimum_price?.final_price.value /
                  product.weight) *
                calculatePricePer
              ).toFixed(2) + " zł"
            : (
                (product?.price_range?.minimum_price?.final_price.value /
                  product.ciezar_w_jednostkach) *
                  calculatePricePer
              ).toFixed(2) + " zł"}
          /{!product.format ? " kg" : product.format_ceny}
        </span>
      </WeightBox>
      <PriceBox>
        <MainPrice>{netto[0]}</MainPrice>
        <div>
          <Cent>{netto[1] ? netto[1] : "00"}</Cent>
          <Tax>
            z Vat {price[0]},{price[1] ? price[1] : "00"} zł
          </Tax>
        </div>
      </PriceBox>

      {product.stock_status === "IN_STOCK" ? (
        <>
          {cartProduct ? (
            <ButtonsBox cartProduct={cartProduct} />
          ) : (
            <Button onClick={() => addToCart(product.sku, 1)}>
              DODAJ DO KOSZYKA
            </Button>
          )}
        </>
      ) : !isAlternative ? (
        <Button isOutOfStock disabled>
          BRAK W MAGAZYNIE
        </Button>
      ) : (
        <WishlistButtonsBox isOutOfStock>
          <button disabled={true}>
            <BsCartCheck />
          </button>
          <button onClick={() => removeFromWishlist(product.id)}>
            <AiOutlineClose />
          </button>
        </WishlistButtonsBox>
      )}
    </>
  );
};
