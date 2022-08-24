import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { magentoCountryQuery } from "../../graphql/magentoCountryQuery";
import { ErrorMsg } from "../ErrorMsg";
import { Input } from "../Input";
import { Select } from "../Select";
import { Button } from "../Button";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  & legend {
    margin-bottom: 20px;
  }
  & span {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  & input,
  select {
    width: 100%;
    margin: 5px 0;
    display: block;
    max-width: 500px;
  }
  & button {
    width: 120px;
    margin-top: 15px;
    margin-right: 15px;
  }
`;

const addressInitialState = {
  region: "",
  country_code: "",
  street: "",
  telephone: "",
  postcode: "",
  city: "",
  firstname: "",
  lastname: "",
};

export const AddressForm = ({ address = {}, onClose, isNewAddress }) => {
  const { editAddress, createAddress } = useContext(UserContext);
  const [currentAddress, setCurrentAddress] = useState(addressInitialState);
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("PL");

  useEffect(() => {
    setCurrentAddress(address);

    magentoCountryQuery(selectedCountry).then((res) =>
      setCountries(res.country)
    );
  }, [selectedCountry]);

  console.log(currentAddress)

  const handleEditAddress = (e) => {
    console.log(currentAddress);
    e.preventDefault();
    if(!isNewAddress) {
      editAddress(currentAddress);
      setCurrentAddress(addressInitialState);
    }
    else {
      createAddress(currentAddress);
      setCurrentAddress(addressInitialState);
      console.log("Utworzylem nowy adres");
    }
    onClose();
  };

  const handleChange = (e) => {
    setCurrentAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Wrapper>
      <form onSubmit={handleEditAddress}>
        <legend>
          <span>{isNewAddress ? "NOWY ADRES" : "EDYTUJ ADRES"}</span>
        </legend>

        <Input
          value={currentAddress?.firstname}
          name="firstname"
          type="text"
          placeholder="Imię"
          onChange={handleChange}
        />
        <Input
          value={currentAddress?.lastname}
          name="lastname"
          type="text"
          placeholder="Nazwisko"
          onChange={handleChange}
        />

        <Input
          value={currentAddress?.street}
          name="street"
          type="text"
          placeholder="Ulica i numer"
          onChange={handleChange}
        />
        {errors && <ErrorMsg>{errors.street}</ErrorMsg>}

        <Input
          value={currentAddress?.city}
          name="city"
          type="text"
          placeholder="Miasto"
          onChange={handleChange}
        />
        {errors && <ErrorMsg>{errors.city}</ErrorMsg>}

        <Input
          value={currentAddress?.telephone}
          onChange={handleChange}
          type="text"
          placeholder="Telefon"
          name="telephone"
        />

        <Select
          value={currentAddress?.region?.region}
          name="region"
          onChange={handleChange}
        >
          <option value="">Wybierz województwo lub region</option>
          {countries.available_regions?.map((region) => (
            <option key={region.id} value={region.name}>
              {region.name}
            </option>
          ))}
        </Select>
        {errors.region && <ErrorMsg>{errors.region}</ErrorMsg>}

        <Input
          name="postcode"
          value={currentAddress?.postcode}
          type="text"
          placeholder="Kod pocztowy"
          onChange={handleChange}
        />
        {errors && <ErrorMsg>{errors.postcode}</ErrorMsg>}

        <Select
          name="country_code"
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            handleChange(e);
          }}
        >
          {isNewAddress ? <option value="PL">Wybierz kraj</option> : null}
          <option value="PL">Polska</option>
        </Select>

        <Button type="submit">Edytuj</Button>
        <Button type="button" onClick={onClose} isSecondary>
          Wróć
        </Button>
      </form>
    </Wrapper>
  );
};
