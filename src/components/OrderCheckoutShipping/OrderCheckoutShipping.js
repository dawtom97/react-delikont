import React, { useContext, useEffect } from "react";
import { Heading } from "../Heading";
import * as Styled from "./styles";
import { AdditionalAddresses } from "../AdditionalAddresses/AdditionalAddresses";
import { BsCheck } from "react-icons/bs";
import { magentoSetShippingMethodOnCart } from "../../graphql/magentoSetShippingMethodOnCart";
import { magentoSetShippingAddressOnCart } from "../../graphql/magentoSetShippingAddressOnCart";
import Link from "next/link";
import { OrderContext } from "../../context/OrderContext";
import { Input } from "../Input";
import { Button } from "../Button";
import {TbTruckDelivery} from 'react-icons/tb'

export const OrderCheckoutShipping = ({ addresses, cart }) => {
  const { setOrderShippingMethod, setOrderAddress, orderShippingMethod } =
    useContext(OrderContext);

  useEffect(() => {
    shippingInfo();
  }, [cart.id, defaultShipping, setOrderAddress, setOrderShippingMethod]);

  const shippingInfo = async () => {
    await magentoSetShippingAddressOnCart(cart.id, defaultShipping[0]).then(
      ({ response }) =>
        setOrderAddress(
          response.data.setShippingAddressesOnCart.cart.shipping_addresses[0]
        )
    );
    await magentoSetShippingMethodOnCart(cart.id).then(({ response }) =>
      setOrderShippingMethod(
        response.data.setShippingMethodsOnCart.cart.shipping_addresses[0]
      )
    );
  };

  const defaultShipping = addresses.filter(
    (address) => address.default_shipping === true
  );

  //console.log(orderShippingMethod?.selected_shipping_method.carrier_title);

  const handleShippingSubmit = () => {
    magentoSetShippingAddressOnCart(cart.id, defaultShipping[0]).then(
      ({ response }) =>
        setOrderAddress(
          response.data.setShippingAddressesOnCart.cart.shipping_addresses[0]
        )
    );
  };

  return (
    <Styled.Wrapper>
      <Heading level="h3">ADRES DO WYSYŁKI</Heading>
      {defaultShipping.map((shipping, index) => (
        <Styled.PrimaryAddress key={index}>
          <Styled.CheckIcon>
            <BsCheck />
          </Styled.CheckIcon>
          <p>
            {shipping?.firstname} {shipping?.lastname}
          </p>
          <p>{shipping?.telephone}</p>
          <p>
            {shipping?.postcode} {shipping?.city}
          </p>
          <p>
            {shipping?.region?.region}, {shipping?.country_code}
          </p>
        </Styled.PrimaryAddress>
      ))}

      <AdditionalAddresses isCheckout addresses={addresses} />

      <Styled.ShippingMethodsBox>
        <Heading level="h3">DOSTĘPNE METODY WYSYŁKI</Heading>

        <Styled.RadioBox>
          <Styled.ShippingMethodBox>
            <TbTruckDelivery/>
          </Styled.ShippingMethodBox>
          <div>
            {/* <input onChange={() => console.log("s")} checked type="radio" />{" "} */}
           <span>{orderShippingMethod?.selected_shipping_method.amount.value} zł</span>
            <br></br>
           {orderShippingMethod?.selected_shipping_method.carrier_title}
          </div>
        </Styled.RadioBox>

        <div>
          <label>Data dostawy *</label>
          <br />
          <Input type="date" />
        </div>

        <div>
          <label>Komentarz</label>
          <br />
          <textarea placeholder="Wpisz wiadomość..." row="5" cols="50" />
        </div>
        <Styled.ButtonsBox>
          <Button isSecondary>
            <Link href="/koszyk">KOSZYK</Link>
          </Button>
          <Button onClick={handleShippingSubmit}>
            <Link href="/podsumowanie/platnosc">DALEJ</Link>
          </Button>
        </Styled.ButtonsBox>
      </Styled.ShippingMethodsBox>
    </Styled.Wrapper>
  );
};
