import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { OrderContext } from "../../context/OrderContext";
import { UserContext } from "../../context/UserContext";
import { magentoPlaceOrder } from "../../graphql/magentoPlaceOrder";
import { magentoSetPaymentMethod } from "../../graphql/magentoSetPaymentMethod";
import { magentoSetShippingMethodOnCart } from "../../graphql/magentoSetShippingMethodOnCart";
import { AddressForm } from "../AddressForm/AddressForm";
import { Heading } from "../Heading";
import * as Styled from "./styles";

export const OrderCheckoutPayment = ({ addresses, cart }) => {
  const [isEdit, setIsEdit] = useState();
  const [billing, setBilling] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const { id } = cart;
  const {orderShippingMethod} = useContext(OrderContext);
  const {removeCart} = useContext(UserContext);
  const router = useRouter()

  console.log(orderShippingMethod,id)

  useEffect(() => {
    const filtered = addresses?.filter(
      (address) => address.default_billing === true
    );
    setBilling(filtered);
  }, [editMode, addresses, id]);

  const handlePlaceOrder = async () => {
    await magentoSetShippingMethodOnCart(cart.id).then((res)=>console.log(res));
    await magentoSetPaymentMethod(id).then(res=>console.log(res))
    await magentoPlaceOrder(id).then(res=>console.log(res));
    router.push("/konto/moje-konto");
  //  router.reload();
   // removeCart();
  }




  return (
    <Styled.Wrapper>
      <div>
        <Heading level="h3">METODY PŁATNOŚCI</Heading>
        <p>Płatność przelewem bankowym</p>
      </div>

      <div>
        <Heading level="h3">ADRES DO RACHUNKU</Heading>

        {editMode ? (
          <AddressForm
            isAdditional
            address={isEdit}
            onClose={() => setEditMode((prev) => !prev)}
          />
        ) : null}
        <div>
          {billing.map((billing, index) => (
            <div key={index}>
              <p>
                {billing?.firstname} {billing?.lastname}
              </p>
              <p>{billing?.telephone}</p>
              <p>
                {billing?.postcode} {billing?.city}
              </p>
              <p>
                {billing?.region?.region}, {billing?.country_code}
              </p>
              <button
                onClick={() => {
                  setEditMode(true);
                  setIsEdit(billing);
                }}
              >
                <FiEdit /> EDYTUJ
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
      <Heading level="h3">DANE DO WPŁATY</Heading>
        <div>
            <p>Delikont Sp. z o.o.</p>
            <p>Numer konta:</p>
            <p>00 0000 0000 0000 0000 0000 0000</p>
        </div>

        <div>
            <p>W tytule prosimy podać numer faktury</p>
        </div>

        <button onClick={handlePlaceOrder}>ZŁÓŻ ZAMÓWIENIE</button>
      </div>
    </Styled.Wrapper>
  );
};
