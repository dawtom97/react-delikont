import React, { useContext, useState } from "react";
import styled from "styled-components";
import { IoTrashBin } from "react-icons/io5";
import { UserContext } from "../../context/UserContext";
import { FiRefreshCcw } from "react-icons/fi";
import Link from "next/link";

export const Wrapper = styled.tr`
  & img {
    width: 70px;
  }

  & a {
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      color: ${({theme})=>theme.colorPrimary};
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
  const [quantity, setQuantity] = useState(item.quantity);

  const productDetailsUrl = `/produkt/${item.product.categories
    ?.map((product) => [product.url_key])
    .join("/")}/${item.product.url_key}`;

  return (
    <Wrapper>
      <td>
        <Link href={productDetailsUrl}>
          <a>
            <img src={item.product.small_image.url} alt={item.product.name} />
          </a>
        </Link>
      </td>

      <td>
        <Link href={productDetailsUrl}>
          <a>
            <p>
              {item.product.name} {item.product.weight}g
            </p>
          </a>
        </Link>
      </td>

      <td>
        <p>
          {item.product.price_range.minimum_price.regular_price.value}zł (Netto)
        </p>
        <p>
          {item.product.price_range.minimum_price.regular_price.value}zł
          (Brutto)
        </p>
        <p>
          {item.product.price_range.minimum_price.regular_price.value}zł (za
          1kg/l)
        </p>
      </td>

      <td>
        <Controls>
          <button
            onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : prev))}
          >
            -
          </button>
          <input
            min={1}
            type="number"
            value={quantity}
            name="qty"
            placeholder="1"
          />
          <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </Controls>
      </td>

      <td>
        <button onClick={() => updateCartQuantity(item.uid, quantity)}>
          <FiRefreshCcw />
        </button>
        <button onClick={() => removeFromCart(item.id)}>
          <IoTrashBin />
        </button>
      </td>
    </Wrapper>
  );
};
