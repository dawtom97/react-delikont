import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Heading } from "../Heading";
import { FiEdit } from "react-icons/fi";
import { magentoEditCustomerAddress } from "../../graphql/magentoEditUserAddress";
import { AddressForm } from "../AddressForm/AddressForm";
import { Loader } from "../Loader";
import { UserContext } from "../../context/UserContext";

export const Wrapper = styled.div`
  & h3 {
    margin-top: 0;
    font-size: 20px;
  }
  & button {
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
export const InfoBox = styled.div`
  & > p {
    font-size: 14px;
    margin: 5px 0;
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

  console.log(addresses);

  const defaultShipping = addresses.filter(
    (address) => address.default_shipping === true
  );
  const defaultBilling = addresses.filter(
    (address) => address.default_billing === true
  );

  console.log(defaultBilling, defaultShipping);

  return (
    <Wrapper>
      <>
        <Heading level="h3">KSIĄŻKA ADRESOWA</Heading>
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
                  <button onClick={() => setEditMode(true)}>
                    <FiEdit /> EDYTUJ
                    {editMode ? (
                      <AddressForm
                        onClose={() => setEditMode(false)}
                        address={shipping}
                      />
                    ) : null}
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
                  <button onClick={() => setEditMode(true)}>
                    <FiEdit /> EDYTUJ
                    {editMode ? (
                      <AddressForm
                        onClose={() => setEditMode(false)}
                        address={billing}
                      />
                    ) : null}
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
