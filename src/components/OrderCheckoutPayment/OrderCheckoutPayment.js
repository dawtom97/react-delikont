import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { ModalContext } from "../../context/ModalContext";
import { UserContext } from "../../context/UserContext";
import { magentoPlaceOrder } from "../../graphql/magentoPlaceOrder";
import { magentoSetBillingAddressOnCart } from "../../graphql/magentoSetBillingAddressOnCart";
import { magentoSetPaymentMethod } from "../../graphql/magentoSetPaymentMethod";
import { magentoSetShippingMethodOnCart } from "../../graphql/magentoSetShippingMethodOnCart";
import { AddressForm } from "../AddressForm/AddressForm";
import { Button } from "../Button";
import { Heading } from "../Heading";
import * as Styled from "./styles";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { Loader } from "../Loader";

export const OrderCheckoutPayment = ({ addresses, cart }) => {
  const [isEdit, setIsEdit] = useState();
  const [billing, setBilling] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const { id } = cart;
  const { removeCart } = useContext(UserContext);
  const router = useRouter();
  const { showModal } = useContext(ModalContext);
  const [isLoading, setIsLoading] = useState(false);


  console.log(cart)

  useEffect(() => {
    const filtered = addresses?.filter(
      (address) => address.default_billing === true
    );
    setBilling([filtered[filtered.length - 1]]);
  }, [editMode, addresses, id]);

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      await magentoSetBillingAddressOnCart(
        id,
        billing[0] ? billing[0] : addresses[0]
      ).then((res) => console.log(res));
      await magentoSetShippingMethodOnCart(cart.id).then((res) =>
        console.log(res)
      );
      await magentoSetPaymentMethod(id).then((res) => console.log(res));
      await magentoPlaceOrder(id).then((res) => {
        if (res.response.errors.length > 0) {
          showModal("Niewystarczająca ilość produktów w magazynie");
          console.log(res);
        } else {
          router.push("/podsumowanie/zakupiono");
          showModal("Złożono zamówienie");
          removeCart();
        }
        console.log(res);
      });

      // router.reload();
    } catch (error) {
      console.log(error);
      showModal("Wystąpił błąd");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Styled.Wrapper>
      <div>
        <Heading level="h3">ADRES DO RACHUNKU</Heading>

        {editMode ? (
          <AddressForm
            isAdditional
            address={isEdit[0]}
            onClose={() => setEditMode((prev) => !prev)}
          />
        ) : null}
        <Styled.BillingBox>
          <Styled.CheckIcon>
            <BsCheck />
          </Styled.CheckIcon>

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
            </div>
          ))}
        </Styled.BillingBox>
        <Button
          onClick={() => {
            setEditMode(true);
            setIsEdit(billing);
          }}
        >
          <FiEdit /> EDYTUJ ADRES
        </Button>
      </div>

      <div>
        <Heading level="h3">METODY PŁATNOŚCI</Heading>
        <Styled.RadioBox>
          <Styled.BillingMethodBox>
            <RiMoneyDollarCircleFill />
          </Styled.BillingMethodBox>
          <p>Płatność przelewem bankowym</p>
        </Styled.RadioBox>
      </div>

      <div>
        <Heading level="h3">DANE DO WPŁATY</Heading>
        <div>
          <p>Delikont Sp. z o.o.</p>
          <p>Numer konta:</p>
          <strong>68 8447 0005 0010 7086 2000 0001</strong>
        </div>

        <div>
          <strong>W tytule prosimy podać numer faktury</strong>
        </div>

        <Styled.ButtonsBox>
          <Button isSecondary>
            <Link href="/podsumowanie/dostawa">WRÓĆ</Link>
          </Button>
          <Button onClick={handlePlaceOrder}>
            <Link href="/podsumowanie/platnosc">ZŁÓŻ ZAMÓWIENIE</Link>
          </Button>
        </Styled.ButtonsBox>
      </div>
      {isLoading && (
        <div className="alternative-loader">
          <Loader />
        </div>
      )}
    </Styled.Wrapper>
  );
};
