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

export const AddressInfo = ({addresses}) => {
  const [editMode, setEditMode] = useState(false);

  console.log(addresses[0])

  return (
    <Wrapper>
      {editMode ? (
        <AddressForm onClose={()=>setEditMode(false)} address={addresses[0]} />
      ) : (
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
                <InfoBox>
                  <p>
                    {addresses[0].firstname}{" "}
                    {addresses[0]?.lastname}
                  </p>
                  <p>{addresses[0]?.telephone}</p>
                  <p>
                    {addresses[0]?.postcode} {addresses[0]?.city}
                  </p>
                  <p>
                    {addresses[0]?.region.region},{" "}
                    {addresses[0]?.country_code}
                  </p>
                  <button onClick={() => setEditMode((prev) => !prev)}>
                    <FiEdit /> EDYTUJ
                  </button>
                </InfoBox>
              </div>

              <div>
                <p>ADRES ROZLICZENIOWY</p>
                <InfoBox></InfoBox>
              </div>
            </InnerWrapper>
          )}
        </>
      )}
    </Wrapper>
  );
};

