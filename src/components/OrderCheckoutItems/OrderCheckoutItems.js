import React, { useContext, useEffect, useState } from "react";
import { Heading } from "../Heading";
import * as Styled from "./styles";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { OrderContext } from "../../context/OrderContext";
import { magentoFinalCartInfo } from "../../graphql/magentoFinalCartInfo";

export const OrderCheckoutItems = ({ cart, isPayment }) => {
  const { id, items, prices } = cart;
  const [itemsVisible, setItemsVisible] = useState(isPayment ? false : true);
  const { orderShippingMethod, finalInfo, setFinalInfo } =
    useContext(OrderContext);

  useEffect(() => {
    magentoFinalCartInfo(id).then(({ response }) =>
      setFinalInfo(response.data)
    );
  }, [cart.id, id, setFinalInfo]);

  // console.log(finalInfo)

  const shippingMethod =
    orderShippingMethod?.selected_shipping_method.carrier_title || "";
  const shippingPrice =
    orderShippingMethod?.selected_shipping_method.amount.value || 19.99;

  const handleClick = () => setItemsVisible((prev) => !prev);
  return (
    <Styled.Wrapper>
      <Heading level="h3">PODSUMOWANIE ZAMÓWIENIA</Heading>

      {isPayment && id ? (
        <Styled.SubmitBox>
          <p>
            Cena z podatkiem{" "}
            <span>
              {finalInfo?.cart.prices.subtotal_excluding_tax.value} zł
            </span>
          </p>
          <p>
            Dostawa <span>{shippingPrice} zł</span>
          </p>
          {/* <p>{shippingMethod}</p> */}
          {/* <p>Podatek <span>0,00 zł</span></p> */}
          <p>
            <strong>
              Łącznie{" "}
              <span>
                {(
                  finalInfo?.cart.prices.subtotal_including_tax.value +
                  shippingPrice
                ).toFixed(2)}{" "}
                zł
              </span>
            </strong>
          </p>
        </Styled.SubmitBox>
      ) : null}

      <Styled.Accordeon>
        {items?.length} {items?.length === 1 ? "Produkt" : "Produkty"} w koszyku{" "}
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
            <p>
              {finalInfo?.cart.shipping_addresses[0]?.firstname}{" "}
              {finalInfo?.cart.shipping_addresses[0]?.lastname}
            </p>
            <p>{finalInfo?.cart.shipping_addresses[0]?.street[0]}</p>
            <p>
              {finalInfo?.cart.shipping_addresses[0]?.postcode},{" "}
              {finalInfo?.cart.shipping_addresses[0]?.city}
            </p>
            <p>
              {finalInfo?.cart.shipping_addresses[0]?.region.label},{" "}
              {finalInfo?.cart.shipping_addresses[0]?.country.label === "PL"
                ? "Polska"
                : "NN"}
            </p>
          </div>
        </div>
      ) : null}

      {isPayment ? (
        <div>
          <Heading level="h3">METODA WYSYŁKI</Heading>
          <div>
            <p>
              {
                finalInfo?.cart.shipping_addresses[0]
                  ?.available_shipping_methods[0].carrier_title
              }
            </p>
          </div>
        </div>
      ) : null}
    </Styled.Wrapper>
  );
};
