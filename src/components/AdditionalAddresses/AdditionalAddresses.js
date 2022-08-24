import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AddressForm } from "../AddressForm/AddressForm";
import { Button } from "../Button";
import { Heading } from "../Heading";

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
  margin: 15px 0;
  padding: 3px 12px;

  & > div {
    flex:1;
  }

  & p {
    font-size: 14px;
  }
`;

export const AdditionalAddresses = ({ addresses }) => {
  const [createMode, setCreateMode] = useState(false);
  const [additional, setAdditional] = useState([]);

  useEffect(() => {
    const filtered = addresses?.filter(
      (address) => !address.default_billing && !address.default_shipping
    );
    setAdditional(filtered);
    console.log(additional);
  }, [addresses]);

  console.log(additional.length);

  if (!additional) return;

  return (
    <Wrapper>
      <Heading level="h3">DODATKOWE ADRESY</Heading>
      {additional.length < 2 ? (
        <p>Nie masz innych adresów w swojej książce adresowej</p>
      ) : (
        additional.map((address) => (
          <AdditionalAddresBox key={address.id}>
            <div>
              <p>
                {address?.firstname} {address?.lastname}
              </p>
              <p>{address?.telephone}</p>
            </div>
            <div>
              <p>
                {address?.postcode} {address?.city}
              </p>
              <p>
                {address?.region?.region}, {address?.country_code}
              </p>
            </div>
          </AdditionalAddresBox>
        ))
      )}
      {createMode ? (
        <AddressForm isNewAddress onClose={() => setCreateMode(false)} />
      ) : (
        <>
          <ButtonsBox>
            <Button onClick={() => setCreateMode(true)}>
              DODAJ NOWY ADRES
            </Button>
            <Link href="/konto/moje-konto">
              <Button isSecondary>POWRÓT</Button>
            </Link>
          </ButtonsBox>
        </>
      )}
    </Wrapper>
  );
};
