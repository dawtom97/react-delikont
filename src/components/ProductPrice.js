import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { UserContext } from "../context/UserContext";

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
  border: ${({ isOutOfStock }) =>
    isOutOfStock ? `1px solid #bcbcbc` : `1px solid #f57c00`};
  border-radius: 30px;
  background-color: transparent;
  height: 30px;
  text-align: center;
  width: auto;
  font-size: 11px;
  color: ${({ isOutOfStock }) => (isOutOfStock ? `#bcbcbc` : `#f57c00`)};
  font-weight: 700;
  margin-top: ${({ isOutOfStock }) => (isOutOfStock ? `103px` : `10px`)};
  cursor: pointer;
`;

export const WishlistButtonsBox = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: ${({ isOutOfStock }) => (isOutOfStock ? `103px` : `10px`)};

  & button:nth-child(1) {
    border:${({isOutOfStock}) => isOutOfStock ? "1px solid #bcbcbc" : "1px solid #f57c00"};
    color:${({isOutOfStock}) => isOutOfStock ? "#bcbcbc" : "#f57c00"};
    pointer-events:${({isOutOfStock}) => isOutOfStock ? "none" : "initial"};;
    
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
    border:1px solid #f57c00;
  
    color: ${({ theme }) => theme.colorPrimary};

    &:hover {
      background-color: ${({ theme }) => theme.colorPrimary};
      color: white;
    }
  }
`;

export const ProductPrice = ({ product, isAlternative }) => {
  const { removeFromWishlist, addToCart } = useContext(UserContext);
  const [choosenProducts, setChoosenProducts] = useState([]);

  const [quantity,setQuantity] = useState(1);
  

  const price = String(
    product?.price_range?.minimum_price?.final_price?.value
  ).split(".");

  if (!product) return;

  return (
    <>
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

      {product.stock_status === "IN_STOCK" ? (
        <>
          <ButtonsBox>
            <div>
              <p>sztuk:</p>
              <Controls>
                <button onClick={()=>setQuantity(prev=>prev > 1 ? prev-1 : null)} >-</button>
                <input type="number" value={quantity} name="qty" placeholder="1" />
                <button onClick={()=>setQuantity(prev=>prev+1)} >+</button>
              </Controls>
            </div>
            <div>
              <p>kartonów:</p>
              <Controls>
                <button>-</button>
                <input type="number" name="qty" placeholder="1" />
                <button>+</button>
              </Controls>
            </div>
          </ButtonsBox>

          {!isAlternative ? (
            <Button onClick={()=>addToCart(product.sku,quantity)}>DODAJ DO KOSZYKA</Button>
          ) : (
            
            <WishlistButtonsBox>
              <button onClick={()=>addToCart(product.sku,quantity)}>
                <BsCartCheck />
              </button>
              <button onClick={() => removeFromWishlist(product.id)}>
                <AiOutlineClose />
              </button>
            </WishlistButtonsBox>
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
