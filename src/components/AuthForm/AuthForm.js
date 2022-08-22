import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import * as Styled from "./styles";
import { ModalContext } from "../../context/ModalContext";
import { UserContext } from "../../context/UserContext";
import { magentoRegister } from "../../graphql/magentoRegister";
import { Button } from "../Button";
import { ErrorMsg } from "../ErrorMsg";
import { Heading } from "../Heading";
import { Input } from "../Input";
import { magentoCreateCustomerAddress } from "../../graphql/magentoCreateCustomerAddress";
import { magentoCountryQuery } from "../../graphql/magentoCountryQuery";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  repassword: "",
};

const addressInitialState = {
  region: {
    region: "",
    region_id: ""
  },
  country_code: "",
  street: [],
  telephone: "",
  postcode: "",
  city: "",
  firstname: "",
  lastname: "",
};

export const AuthForm = () => {
  const { userLogin } = useContext(UserContext);
  const { showModal } = useContext(ModalContext);
  const [newAccount, setNewAccount] = useState(initialState);
  const [newAddress, setNewAddress] = useState(addressInitialState);
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("PL")

  useEffect(() => {
    magentoCountryQuery(selectedCountry).then((res) => setCountries(res.country));
  }, [selectedCountry]);


  const handleChange = (e) => {
    setNewAccount({
      ...newAccount,
      [e.target.name]: e.target.value,
    });
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });

     console.log(newAddress);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationPass = validation(newAccount);
    if (validationPass.status) {
      await magentoRegister(newAccount).then(async (res) => {
        setErrors({});
        await userLogin({
          email: newAccount.email,
          password: newAccount.password,
        });
        await magentoCreateCustomerAddress().then((res) => console.log(res));
        res.status.message
          ? showModal("Istnieje już konto o podanym adresie email", true)
          : showModal("Założono nowe konto");
      });
    } else {
      setErrors(validationPass.errors);
    }
  };

  const validation = (data) => {
    const passReg = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );
    const errors = {};
    if (!data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
      errors.email = "Niepoprawny adres email";
    if (!data.password.match(passReg))
      errors.password =
        "Wymagane co najmniej 6 znaków, w tym jedna duża litera i cyfra";
    if (data.firstname == "") errors.firstname = "To pole jest wymagane";
    if (data.lastname == "") errors.lastname = "To pole jest wymagane";
    if (data.password !== data.repassword)
      errors.passwordCheck = "Hasła nie są identyczne";

    if (
      !errors.email &&
      !errors.password &&
      !errors.passwordCheck &&
      !errors.firstname &&
      !errors.lastname
    )
      return {
        status: true,
        errors: null,
      };
    return {
      status: false,
      errors,
    };
  };

  return (
    <Styled.Wrapper>
      <Heading>UTWÓRZ NOWE KONTO KLIENTA</Heading>
      <p>
        Jeśli masz już konto <Link href="/">zaloguj się</Link>
      </p>
      <Styled.AuthWrapper onSubmit={handleSubmit}>
        <legend>
          <span>DANE DO LOGOWANIA</span>
        </legend>
        <Input
          value={newAccount.firstname}
          onChange={handleChange}
          type="text"
          placeholder="Imię"
          name="firstname"
        />
        {errors && <ErrorMsg>{errors.firstname}</ErrorMsg>}
        <Input
          value={newAccount.lastname}
          onChange={handleChange}
          type="text"
          placeholder="Nazwisko"
          name="lastname"
        />
        {errors && <ErrorMsg>{errors.lastname}</ErrorMsg>}
        <Input
          value={newAccount.email}
          onChange={handleChange}
          type="text"
          placeholder="E-mail"
          name="email"
        />
        {errors && <ErrorMsg>{errors.email}</ErrorMsg>}
        <Input
          value={newAccount.password}
          onChange={handleChange}
          type="password"
          placeholder="Hasło"
          name="password"
        />
        {errors && <ErrorMsg>{errors.password}</ErrorMsg>}
        <Input
          value={newAccount.repassword}
          onChange={handleChange}
          type="password"
          placeholder="Powtórz hasło"
          name="repassword"
        />
        {errors && <ErrorMsg>{errors.passwordCheck}</ErrorMsg>}

        <legend>
          <span>DANE FIRMY</span>
        </legend>

        <legend>
          <span>DANE DOSTAWY</span>
        </legend>

        <select name="region" onChange={handleChange}>
          {countries.available_regions?.map((region)=>(
            <option key={region.id} value={region.name}>{region.name}</option>
          ))}
        </select>
        <select name="country_code" onChange={handleChange}>
          <option selected value="PL">Polska</option>
          <option value="FR">Francja</option>
        </select>

        <Button isSecondary type="submit">
          UTWÓRZ KONTO KLIENTA
        </Button>
        <Button>
          <Link href="/">
            <a>POWRÓT</a>
          </Link>
        </Button>
      </Styled.AuthWrapper>
    </Styled.Wrapper>
  );
};
