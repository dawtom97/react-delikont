import Link from "next/link";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ModalContext } from "../../context/ModalContext";
import { UserContext } from "../../context/UserContext";
import { magentoRegister } from "../../graphql/magentoRegister";
import { Button } from "../Button";
import { ErrorMsg } from "../ErrorMsg";
import { Heading } from "../Heading";
import { Input } from "../Input";

export const Wrapper = styled.div`
  text-align: center;
  margin-top:190px;

  & a {
    text-decoration: underline;
  }

  & input {
    margin: 12px 0;
  }
`;

export const AuthWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ebebeb;
  min-width: 600px;
  width: 50%;

  & legend {
    border-bottom: 1px solid #282828;
    text-transform: uppercase;
    padding-bottom:15px;
    margin: 10px 0;
    font-weight: 600;
    width: 100%;
  }
  & input {
    display: block;
    width:100%;
  }

  & button {
    margin:7px 0;
  }
  & a {
    text-decoration: none;
  }

`;

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  repassword: "",
};

export const AuthForm = () => {
  const { userLogin } = useContext(UserContext);
  const {showModal} = useContext(ModalContext);
  const [newAccount, setNewAccount] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setNewAccount({
      ...newAccount,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationPass = validation(newAccount);
    if (validationPass.status) {
      magentoRegister(newAccount).then((res) => {
        setErrors({})
        userLogin({ email: newAccount.email, password: newAccount.password });
        res.status.message ? showModal("Istnieje już konto o podanym adresie email",true) : showModal("Założono nowe konto");
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
    <Wrapper>
      <Heading>UTWÓRZ NOWE KONTO KLIENTA</Heading>
      <p>
        Jeśli masz już konto <Link href="/">zaloguj się</Link>
      </p>
      <AuthWrapper onSubmit={handleSubmit}>
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

        <Button isSecondary type="submit">UTWÓRZ KONTO KLIENTA</Button>
        <Button><Link href="/"><a>POWRÓT</a></Link></Button>
      </AuthWrapper>
    </Wrapper>
  );
};
