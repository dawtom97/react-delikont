import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { magentoCountryQuery } from "../../graphql/magentoCountryQuery";
import { ErrorMsg } from "../ErrorMsg";
import { Input } from "../Input";
import { Select } from "../Select";
import { Button } from "../Button";

export const Shadow = styled.div`
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 99;
  background-color: #000;
  opacity: 0.3;
  z-index: 500;
`;

export const Wrapper = styled.div`
  display: flex;
  z-index: 600;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  padding: 35px;
  max-width: 500px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  margin-bottom: 25px;
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

export const AddressForm = ({ address, onClose, isNewAddress, isAdditional }) => {
  const { editAddress, createAddress,editAdditionalAddress } = useContext(UserContext);
  const [currentAddress, setCurrentAddress] = useState(addressInitialState);
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("PL");

  useEffect(() => {
    address ? setCurrentAddress(address) : null;

    magentoCountryQuery(selectedCountry).then((res) =>
      setCountries(res.country)
    );
  }, [selectedCountry]);

  const validateAddress = (data) => {
    const errObj = {};
    if (data.region == "") errObj.region = "To pole jest wymagane";
    if (data.country_code == "") errObj.country_code = "To pole jest wymagane";
    if (data.street == "") errObj.street = "To pole jest wymagane";
    if (data.telephone == "") errObj.telephone = "To pole jest wymagane";
    if (data.postcode == "") errObj.postcode = "To pole jest wymagane";
    if (data.city == "") errObj.city = "To pole jest wymagane";
    if (data.firstname == "") errObj.firstname = "To pole jest wymagane";
    if (data.lastname == "") errObj.lastname = "To pole jest wymagane";

    if (
      !errObj.region &&
      !errObj.country_code &&
      !errObj.street &&
      !errObj.telephone &&
      !errObj.postcode &&
      !errObj.city &&
      !errObj.firstname &&
      !errObj.lastname
    )
      return {
        status: true,
        errors: null,
      };

    return {
      status: false,
      errors:errObj,
    };
  };

  const handleEditAddress = (e) => {
    e.preventDefault();

    const isValid = validateAddress(currentAddress);

    if (isValid.status) {
      if (!isNewAddress) {
        isAdditional ? editAdditionalAddress(currentAddress) : editAddress(currentAddress);
        setCurrentAddress(addressInitialState);
      } else {
        createAddress(currentAddress);
        setCurrentAddress(addressInitialState);
        console.log("Utworzylem nowy adres");
      }
      onClose();
    }
    else {
      setErrors(isValid.errors)
    }
  };

  const handleChange = (e) => {
    setCurrentAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Shadow />
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
           {errors && <ErrorMsg>{errors.firstname}</ErrorMsg>}
          
          <Input
            value={currentAddress?.lastname}
            name="lastname"
            type="text"
            placeholder="Nazwisko"
            onChange={handleChange}
          />
           {errors && <ErrorMsg>{errors.lastname}</ErrorMsg>}

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
           {errors && <ErrorMsg>{errors.telephone}</ErrorMsg>}

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
          {errors && <ErrorMsg>{errors.country_code}</ErrorMsg>}

          <Button type="submit">{isNewAddress ? "DODAJ" : "EDYTUJ"}</Button>
          <Button type="button" onClick={onClose} isSecondary>
            WRÓĆ
          </Button>
        </form>
      </Wrapper>
    </>
  );
};
