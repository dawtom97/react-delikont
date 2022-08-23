import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { magentoCountryQuery } from "../../graphql/magentoCountryQuery";
import { magentoEditCustomerAddress } from "../../graphql/magentoEditUserAddress";
import { ErrorMsg } from "../ErrorMsg";
import { Input } from "../Input";
import { Select } from "../Select";

export const Wrapper = styled.div`
  // position: fixed;

  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
`;


const addressInitialState = {
    region:"",
    country_code: "",
    street: "",
    telephone: "",
    postcode: "",
    city: "",
    firstname: "",
    lastname: "",
  };


export const AddressForm = ({ address, onClose }) => {
  const {editAddress} = useContext(UserContext);
  const [currentAddress, setCurrentAddress] = useState(addressInitialState);
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("PL");

  useEffect(() => {
    setCurrentAddress(address);
    magentoCountryQuery(selectedCountry).then((res) =>
      setCountries(res.country)
    );
  }, [selectedCountry, address]);

  const handleEditAddress = (e) => {
    e.preventDefault();
    editAddress(currentAddress);
    setCurrentAddress(addressInitialState);
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
          <span>DANE DOSTAWY</span>
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

        <Select name="region" onChange={handleChange}>
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
          <option value="PL">Polska</option>
        </Select>

        <button type="submit">Edytuj</button>
        <button type="button" onClick={onClose}>Wróć</button>
      </form>
    </Wrapper>
  );
};
