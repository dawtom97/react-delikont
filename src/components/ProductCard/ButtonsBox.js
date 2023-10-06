// STOP-------------------------------------------------------

import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
import { Loader } from "../Loader";
import { AiOutlinePlus } from "react-icons/ai";

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  & p {
    text-align: center;
    margin: 0;
    font-size: 12px;
  }
`;
export const Controls = styled.div`
  display: flex;
  width: 70px;
  height: 30px;
  text-align: center;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 12%), 0 0 2px 0 rgb(0 0 0 / 14%);
  border-radius: 30px;
  overflow: hidden;
  margin-bottom: 12px;

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

export const ButtonsBox = ({ cartProduct, product, isCart }) => {
  const { updateCartQuantity, addToCart } = useContext(UserContext);
  const [quantity, setQuantity] = useState(1);
  const [boxes, setBoxes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    if (cartProduct) {
      setQuantity(cartProduct?.quantity);
      setBoxes(Math.floor( quantity / product?.cartequantity));
    }
  }, [cartProduct]);

  useEffect(() => {
    if (quantity < 1) {
      setQuantity(1);
      setBoxes(0);
    }
  }, [boxes]);

  return (
    <>
      <Box>
        <div>
          <p>sztuk:</p>
          <Controls>
            <button
              onClick={(e) => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                  setBoxes(Math.floor(quantity / product.cartequantity));
                }
              }}
            >
              -
            </button>
            <input
              onChange={(e) => {
                setQuantity(Number(e.target.value));

                setBoxes(Math.floor(quantity / product?.cartequantity));
              }}
              type="number"
              value={quantity}
              name="qty"
              placeholder="1"
            />
            <button
              onClick={() => {
                setQuantity(Number(quantity) + 1);
                setBoxes(Math.floor(quantity / product?.cartequantity));
              }}
            >
              +
            </button>
          </Controls>
        </div>
        <div>
          <p>kartonów:</p>
          <Controls>
            <button
              onClick={() => {
                setBoxes(boxes - 1);
                setQuantity(
                  quantity > 0 ? quantity - Number(product?.cartequantity) : 1
                );
              }}
            >
              -
            </button>
            <input
              disabled="true"
              onChange={(e) => {
                setBoxes(Number(e.target.value));
                setQuantity(Math.ceil(boxes * product?.cartequantity));
              }}
              type="number"
              name="qty"
              placeholder={0}
              value={
                cartProduct
                  ? Math.floor(quantity / product?.cartequantity)
                  : boxes
              }
            />
            <button
              onClick={() => {
            console.log(Number(boxes) + 1,boxes)
              // TODO niektóre produkty mają cartequantity 0.....
                setBoxes(Number(boxes) + 1);
                setQuantity(quantity + Number(product?.cartequantity) );
                // setQuantity(quantity === 1 ? Number(product?.cartequantity) : quantity + Number(product?.cartequantity) );
              }}
            >
              +
            </button>
          </Controls>
        </div>

        {isLoading && (
          <div className="alternative-loader">
            <Loader />
          </div>
        )}
      </Box>
      {!isCart ? (
        <Button
          onClick={() => {
            if (cartProduct) {
              updateCartQuantity(
                cartProduct.uid,
                cartProduct.quantity + quantity
              );
            } else {
              addToCart(product.sku, quantity);
            }
          }}
        >
          DODAJ DO KOSZYKA
        </Button>
      ) : (
        <Button
          onClick={() => {
            if (cartProduct) {
              updateCartQuantity(
                cartProduct.uid,
                cartProduct.quantity + quantity
              );
            } else {
              addToCart(product.sku, quantity);
            }
          }}
        >
          <AiOutlinePlus />
        </Button>
      )}
    </>
  );
};
