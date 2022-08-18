import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { magentoRegister } from "../../graphql/magentoRegister";

export const Wrapper = styled.div``;

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  repassword: "",
};

export const AuthForm = () => {
  const {userLogin} = useContext(UserContext)
  const [newAccount, setNewAccount] = useState(initialState);
  const [errors, setErrors] = useState();
  const [status, setStatus] = useState();
  

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
        setStatus(res);
        userLogin({email:newAccount.email, password: newAccount.password});
        status.errors ? console.log("KONTO JUZ ISTNEIEJ") : null
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
      {errors && errors.email}
      <form onSubmit={handleSubmit}>
        <input
          value={newAccount.firstname}
          onChange={handleChange}
          type="text"
          placeholder="Imię"
          name="firstname"
        />
        {errors && <p>{errors.firstname}</p>}
        <input
          value={newAccount.lastname}
          onChange={handleChange}
          type="text"
          placeholder="Nazwisko"
          name="lastname"
        />
        {errors && <p>{errors.lastname}</p>}
        <input
          value={newAccount.email}
          onChange={handleChange}
          type="text"
          placeholder="E-mail"
          name="email"
        />
        {errors && <p>{errors.email}</p>}
        <input
          value={newAccount.password}
          onChange={handleChange}
          type="password"
          placeholder="Hasło"
          name="password"
        />
        {errors && <p>{errors.password}</p>}
        <input
          value={newAccount.repassword}
          onChange={handleChange}
          type="password"
          placeholder="Powtórz hasło"
          name="repassword"
        />
        {errors && <p>{errors.passwordCheck}</p>}

        <button type="submit">Utwórz konto klienta</button>
      </form>
    </Wrapper>
  );
};
