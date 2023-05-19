import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";

export const Box = styled.div`
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
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 12%), 0 0 2px 0 rgb(0 0 0 / 14%);
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

export const ButtonsBox = ({cartProduct}) => {
  const { updateCartQuantity } = useContext(UserContext);

  const handleAddCart = (qty) => {
    updateCartQuantity(cartProduct.uid, cartProduct.quantity + qty);
  };

  const handleUpdateByInput = (qty) =>
    updateCartQuantity(cartProduct.uid, qty ? qty : 1);

  const handleRemove = (qty) => {
    updateCartQuantity(cartProduct.uid, cartProduct.quantity - qty);
  };

  return (
    <Box>
      <div>
        <p>sztuk:</p>
        <Controls>
          <button onClick={() => handleRemove(1)}>-</button>
          <input
            onChange={(e) => {
              if (e.target.value.length == 0) handleUpdateByInput(1);
              handleUpdateByInput(e.target.value);
            }}
            type="number"
            value={cartProduct?.quantity == 1 ? " " : cartProduct?.quantity}
            name="qty"
            placeholder="1"
          />
          <button onClick={() => handleAddCart(1)}>+</button>
        </Controls>
      </div>
      <div>
        <p>kartonów:</p>
        <Controls>
          <button>-</button>
          <input
            onChange={() => console.log("change")}
            type="number"
            name="qty"
            placeholder="1"
          />
          <button>+</button>
        </Controls>
      </div>
    </Box>
  );
};

