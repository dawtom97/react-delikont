import React, { useContext, useState } from "react";
import { Heading } from "../Heading";
import * as Styled from "./styles";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { OrderContext } from "../../context/OrderContext";

export const OrderCheckoutItems = ({ cart, isPayment }) => {
  const { id, items, prices } = cart;
  const [itemsVisible, setItemsVisible] = useState(isPayment ? false : true);
  const {orderShippingMethod, orderAddress} = useContext(OrderContext);

  const shippingMethod = orderShippingMethod?.selected_shipping_method.carrier_title || ""

  console.log(prices)

  const handleClick = () => setItemsVisible((prev) => !prev);
  return (
    <Styled.Wrapper>
      <Heading level="h3">PODSUMOWANIE ZAMÓWIENIA</Heading>
      


      {isPayment && id ? (
        <div>
           <p>Suma <span>{prices.grand_total.value}</span></p>
           <p>Dostawa <span>0,00 zł</span></p>
           <p>{shippingMethod}</p>
           <p>Podatek <span>0,00 zł</span></p>
           <p><strong>Łącznie <span>{prices.grand_total.value} zł</span></strong></p>
        </div>
      ) : null}

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

      {isPayment ? (
        <div>
              <Heading level="h3">WYSYŁKA DO</Heading>
              <div>
                <p>{orderAddress?.firstname} {orderAddress?.lastname}</p>
                <p>{orderAddress?.street[0]}</p>
                <p>{orderAddress?.postcode}, {orderAddress?.city}</p>
                <p>{orderAddress?.region.label}, {orderAddress?.country.label === "PL" ? "Polska" : "NN"}</p>
              </div>
        </div>

        
      ) : null}

{isPayment ? (
        <div>
              <Heading level="h3">METODA WYSYŁKI</Heading>
              <div>
              <p>{shippingMethod}</p>
              </div>
        </div>

        
      ) : null}

      

    </Styled.Wrapper>
  );
};
