import React, { useState } from "react";
import { Heading } from "../Heading";
import * as Styled from "./styles";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export const OrderCheckoutItems = ({ cart }) => {
  const { id, items, prices } = cart;
  const [itemsVisible, setItemsVisible] = useState(true);

 // console.log(items, prices);
  const handleClick = () => setItemsVisible((prev) => !prev);
  return (
    <Styled.Wrapper>
      <Heading level="h3">PODSUMOWANIE ZAMÓWIENIA</Heading>
      <Styled.Accordeon>
        {items.length} {items.length === 1 ? "Produkt" : "Produkty"} w koszyku{" "}
        <button onClick={handleClick}>
          {itemsVisible ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </button>{" "}
      </Styled.Accordeon>
      <div>
        {itemsVisible
          ? items.map((item) => (
              <Styled.Item key={item.id}>
                <div>
                  <img
                    src={item.product.small_image.url}
                    alt={item.product.name}
                  />
                </div>
                <div>
                  <p>{item.product.name}</p>
                  <p>sztuk: {item.quantity}</p>
                </div>
                <span>
                  <p>
                    {(
                      item.quantity *
                      item.product.price_range.minimum_price.final_price.value
                    ).toFixed(2)}{" "}
                    zł
                  </p>
                </span>
              </Styled.Item>
            ))
          : null}
      </div>
    </Styled.Wrapper>
  );
};
