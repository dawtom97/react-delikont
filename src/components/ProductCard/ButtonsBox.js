import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
import { Loader } from "../Loader";

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


export const ButtonsBox = ({ cartProduct, product,isCart }) => {
  const { updateCartQuantity, addToCart } =
    useContext(UserContext);
  const [quantity, setQuantity] = useState(1);
  const [boxes, setBoxes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [choosenQty, setChoosenQty] = useState(1);

  useLayoutEffect(() => {
    setQuantity(cartProduct?.quantity);
  }, [cartProduct]);

  // const handleRemove = (qty) => {
  //   try {
  //     if (quantity > 0)
  //       updateCartQuantity(cartProduct.uid, cartProduct.quantity - qty);
  //     else removeFromCart();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  console.log(product)

  return (
    <>
    <Box>
      <div>
        <p>sztuk:</p>
        <Controls>
          <button
            onClick={() => {
              if (choosenQty > 1) {
                setChoosenQty(choosenQty - 1);
                setBoxes(Math.ceil(choosenQty / product.cartequantity));
              } else {
                setChoosenQty(1);
              }
              if(quantity > 1) {
                setQuantity(quantity - 1)
              }
            }}
          >
            -
          </button>
          <input
            onChange={(e) => {

              setChoosenQty(Number(e.target.value));
              setQuantity(Number(e.target.value))
              console.log(e.target.value)
            }}
            type="number"
            value={cartProduct ? quantity : choosenQty}
            name="qty"
            placeholder="1"
          />
          <button
            onClick={() => {
              setChoosenQty(Number(choosenQty) + 1);
              setQuantity(Number(quantity) + 1)
              setBoxes(Math.ceil(choosenQty / product?.cartequantity));
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
              if (boxes > 0) {
                setBoxes(boxes - 1);
                setChoosenQty(
                  choosenQty > 0
                    ? choosenQty - Number(product?.cartequantity)
                    : 1
                );
                setQuantity(
                  quantity > 0
                    ? quantity - Number(product?.cartequantity)
                    : 1
                );
              }
            }}
          >
            -
          </button>
          <input
            onChange={(e) => setBoxes(Number(e.target.value))}
            type="number"
            name="qty"
            placeholder={0}
            value={cartProduct ? Math.ceil(quantity / product?.cartequantity) : boxes}
          />
          <button
            onClick={() => {
              setBoxes(Number(boxes) + 1);
              setChoosenQty(choosenQty + Number(product?.cartequantity));
              setQuantity(quantity + Number(product?.cartequantity));
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
    <Button onClick={() => {
      if(cartProduct) {

        updateCartQuantity(cartProduct.uid, cartProduct.quantity + choosenQty)
      } else {
        addToCart(product.sku, choosenQty)
      }
      
    }}>
    DODAJ DO KOSZYKA
  </Button>
):(
 null
)}
  

    </>
  );
};
