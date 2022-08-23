import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Heading } from "../Heading";
import { FiEdit } from "react-icons/fi";

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

const AddressInfo = ({ addresses }) => {
  const [deliveryAddress, setDeliveryAddress] = useState([]);

  useEffect(() => {
    setDeliveryAddress(addresses);
  }, [addresses]);

  return (
    <Wrapper>
      <Heading level="h3">KSIĄŻKA ADRESOWA</Heading>
      {!deliveryAddress?.length ? (
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
                {deliveryAddress[0]?.firstname} {deliveryAddress[0]?.lastname}
              </p>
              <p>{deliveryAddress[0]?.telephone}</p>
              <p>
                {deliveryAddress[0]?.postcode} {deliveryAddress[0]?.city}
              </p>
              <p>
                {deliveryAddress[0]?.region.region},{" "}
                {deliveryAddress[0]?.country_code}
              </p>
              <button>
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
    </Wrapper>
  );
};

export default AddressInfo;
