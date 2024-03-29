import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { IoTrashBin } from "react-icons/io5";
import { UserContext } from "../../context/UserContext";
import { FiRefreshCcw } from "react-icons/fi";
import Link from "next/link";
import { ButtonsBox } from "../ProductCard/ButtonsBox";
import Image from "next/image";

export const Wrapper = styled.tr`
  & img {
    width: 70px;
  }

  & a {
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      color: ${({ theme }) => theme.colorPrimary};
    }
  }

  & td > div {
    align-items: flex-start;
  }

  & .plus {
    display: flex;
    align-items: center;
    position: relative;
    top: 21px;

    & button {
      margin-left: 5px;
      /* position: relative; */
    }
  }

  & > td > button {
    border-radius: 50%;
    font-size: 18px;
    margin-right: 6px;
    line-height: 39px;
    cursor: pointer;
    text-align: center;
    width: 35px;
    background-color: transparent;
    height: 35px;
    border: 1px solid #f57c00;

    color: ${({ theme }) => theme.colorPrimary};

    &:hover {
      background-color: ${({ theme }) => theme.colorPrimary};
      color: white;
    }
  }

  & p {
    font-size: 13px;
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

  & > button {
    background-color: transparent;
    border: none;
    font-size: 18px;
    transition: 0.4s;

    &:hover {
      color: ${({ theme }) => theme.colorPrimary};
    }
  }
`;

export const CartItem = ({ item }) => {
  const { removeFromCart, updateCartQuantity } = useContext(UserContext);
  const { cart } = useContext(UserContext);
  
  const [cartProduct, setCardProduct] = useState();
  const [inStock, setInStock] = useState(true)

  useEffect(() => {
    setCardProduct(isCartProduct())
    checkQty()
  }, [cart]);

  const isCartProduct = () =>
    cart?.items.find((v) => v.product.id === item.product.id);

  const productDetailsUrl = `/produkt/${item.product.categories
    ?.map((product) => [product.url_key])
    .join("/")}/${item.product.url_key}`;

  const notVatPrice =
    item?.product.price_range.minimum_price.regular_price.value /
    (1 + item?.product.cytax / 100);
  const netto = notVatPrice.toFixed(2);

  const checkQty = () => {
    if(item.quantity > item.product.cyqty) {
      setInStock(false)
    } else {
      setInStock(true)
    }
  }


  return (
    <Wrapper>
      <td>
        <Link href={productDetailsUrl}>
          <a>
            <Image
              width={70}
              height={70}
              src={item.product.small_image.url}
              alt={item.product.name}
            />
          </a>
        </Link>
      </td>

      <td>
        <Link href={productDetailsUrl}>
          <a>
            <p>
              {item.product.name} {item.product.weight}g

            </p>
            {!inStock && <span style={{color:'red',fontSize:12, fontWeight:'bold'}}>Wybrana ilość nie jest już dostępna</span>}
          </a>
        </Link>
      </td>

      <td>
        <p>
          {netto}
          zł (Netto)
        </p>
        <p>
          {item.product.price_range.minimum_price.regular_price.value.toFixed(
            2
          )}
          zł (Brutto)
        </p>
      </td>

      <td className="plus">
        <ButtonsBox
          isCart
          product={cartProduct?.product}
          cartProduct={cartProduct}
        />
      </td>

      <td>
        <button onClick={() => removeFromCart(item.id)}>
          <IoTrashBin />
        </button>
        {/* <button onClick={() => console.log(cartProduct.id)}>x</button> */}
      </td>
    </Wrapper>
  );
};
