import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AddressForm } from "../AddressForm/AddressForm";
import { Button } from "../Button";
import { Heading } from "../Heading";
import { IoPerson, IoTrashBin, IoCheckmarkCircle } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import { UserContext } from "../../context/UserContext";

export const Wrapper = styled.div`
  & h3 {
    margin-top: 0;
    font-size: 20px;
  }
`;

export const ButtonsBox = styled.div`
  & button {
    width: auto;
    padding: 0px 15px;
    min-width: 120px;
    margin-top: 15px;
    margin-right: 15px;
  }
`;

export const AdditionalAddresBox = styled.div`
  border: 1px solid #ebebeb;
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  align-items: center;
  padding: 3px 12px;

  & > div {
    flex: 1;
  }

  & p {
    font-size: 14px;
    display: flex;
    align-items: center;

    & span {
      color: ${({ theme }) => theme.colorPrimary};
      margin-right: 10px;
    }
  }

  & button {
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    min-width: 120px;
    margin: 5px 0;
    margin-left: auto;
    height: 25px;
    font-size: 12px;
  }
`;

export const AdditionalAddresses = ({ addresses, isCheckout }) => {
  const { deleteAddress, changeDefaultShippingAddress } =
    useContext(UserContext);
  const [createMode, setCreateMode] = useState(false);
  const [additional, setAdditional] = useState();
  const [editMode, setEditMode] = useState(false);
  const [isEdit, setIsEdit] = useState();

  useEffect(() => {
    //  if(additional?.length && !createMode) return;
    const filtered = addresses?.filter(
      (address) => !address.default_billing && !address.default_shipping
    );
    setAdditional(filtered);
  }, [addresses]);

  if (!additional) return;

  const handleDelete = (id) => {
    deleteAddress(id);
  };

  const handleSetDefault = (id) => {
    changeDefaultShippingAddress(id);
  };

  return (
    <Wrapper>
      <Heading level="h3">{!isCheckout ? "DODATKOWE ADRESY DOSTAWY": "WYBIERZ INNY ADRES"}</Heading>
      {!additional.length ? (
        <p>Nie masz innych adresów w swojej książce adresowej</p>
      ) : (
        additional.map((address) => (
          <AdditionalAddresBox key={address.id}>
            <div>
              <p>
                <span>
                  <IoPerson />
                </span>{" "}
                {address?.firstname} {address?.lastname}
              </p>
              <p>
                <span>
                  <BsFillTelephoneFill />
                </span>{" "}
                {address?.telephone}
              </p>
            </div>
            <div>
              <p>
                {address?.postcode} {address?.city}
              </p>
              <p>
                {address?.region?.region}, {address?.country_code}
              </p>
            </div>
            <div>
              {!isCheckout ? (
                <Button onClick={() => handleDelete(address?.id)} isSecondary>
                  <IoTrashBin /> USUŃ
                </Button>
              ) : null}

              <Button onClick={() => handleSetDefault(address?.id)}>
                <IoCheckmarkCircle />
                {!isCheckout ? "DOMYŚLNY" : "WYBIERZ"}
              </Button>
              <Button
                onClick={() => {
                  setIsEdit(address);
                  setEditMode(true);
                }}
                isSecondary
              >
                <IoTrashBin /> EDYTUJ
              </Button>
            </div>
          </AdditionalAddresBox>
        ))
      )}
      {createMode ? (
        <AddressForm isNewAddress onClose={() => setCreateMode(false)} />
      ) : null}
      {editMode ? (
        <AddressForm
          isAdditional
          address={isEdit}
          onClose={() => setEditMode(false)}
        />
      ) : null}
      <ButtonsBox>
        <Button onClick={() => setCreateMode(true)}>DODAJ NOWY ADRES</Button>
        <Link href="/konto/moje-konto">
          <Button isSecondary>{!isCheckout ? "POWRÓT" : "KSIĄŻKA ADRESOWA"}</Button>
        </Link>
      </ButtonsBox>
    </Wrapper>
  );
};
