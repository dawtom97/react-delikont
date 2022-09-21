import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Heading } from "../Heading";
import { FiEdit } from "react-icons/fi";
import { AddressForm } from "../AddressForm/AddressForm";
import Link from "next/link";

export const Wrapper = styled.div`
  & h3 {
    margin-top: 0;
    font-size: 20px;
  }

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;

    & > a {
      font-weight: 700;
      color: ${({ theme }) => theme.colorPrimary};
      font-size: 12px;
    }
  }
`;
export const InfoBox = styled.div`
  & > p {
    font-size: 14px;
    margin: 5px 0;
  }
  & > button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 12px;
    margin-top: 15px;
    padding: 0;
    font-weight: 500;
    margin-right: 15px;

    & svg {
      color: ${({ theme }) => theme.colorPrimary};
    }
  }
`;

export const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  margin-bottom: 15px;
  border-bottom: 1px solid #ebebeb;
  & > div {
    flex: 1;
  }
  & > div > p {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
  }
`;

export const AddressInfo = ({ addresses }) => {
  const [editMode, setEditMode] = useState(false);
  const [isEdit, setIsEdit] = useState();

  const defaultShipping = addresses.filter(
    (address) => address.default_shipping === true
  );
  const defaultBilling = addresses.filter(
    (address) => address.default_billing === true
  );

 // console.log(defaultBilling, defaultShipping);

  return (
    <Wrapper>
      <>
        {editMode ? (
          <AddressForm onClose={() => setEditMode(false)} address={isEdit} />
        ) : null}
        <div>
          <Heading level="h3">KSIĄŻKA ADRESOWA </Heading>{" "}
          <Link href="/konto/adresy">ZARZĄDZAJ ADRESAMI</Link>{" "}
        </div>
        {!addresses.length ? (
          <>
            <p>Nie dodano adresów</p>
            <button>
              <FiEdit /> DODAJ
            </button>
          </>
        ) : (
          <InnerWrapper>
            <div>
              <p>ADRES DOSTAWY</p>
              {defaultShipping.map((shipping, index) => (
                <InfoBox key={index}>
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
                  <button
                    onClick={() => {
                      setEditMode(true);
                      setIsEdit(shipping);
                    }}
                  >
                    <FiEdit /> EDYTUJ
                  </button>
                </InfoBox>
              ))}
            </div>

            <div>
              <p>ADRES ROZLICZENIOWY</p>
              {defaultBilling.map((billing, index) => (
                <InfoBox key={index}>
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
                </InfoBox>
              ))}
            </div>
          </InnerWrapper>
        )}
      </>
    </Wrapper>
  );
};
