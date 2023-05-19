import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { Button } from "../Button";
import { ErrorMsg } from "../ErrorMsg";
import { Input } from "../Input";

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
  //  background: ${({theme})=>theme.colorPrimary};
    width: 120px;
    margin-top: 15px;
    margin-right: 15px;
  }
`;

const initialState = {
    firstname: "",
    lastname: "",
    email:""
  };

export const EditUserForm = ({user,onClose}) => {
  const {updateUserInfo} = useContext(UserContext);
  const [updatedUser,setUpdatedUser] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(()=>{
    setUpdatedUser(user)
  },[user])

  const handleChange = (e) => {
    setUpdatedUser(prev=>({
        ...prev,
        [e.target.name]:e.target.value
    }))
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    const isValid = validate(updatedUser);

    if (isValid.status) {
      updateUserInfo(updatedUser)
      onClose();
    }
    else {
      setErrors(isValid.errors)
    }
  }

  const validate = (data) => {
    const errObj = {};
    if (data.firstname == "") errObj.firstname = "To pole jest wymagane";
    if (data.lastname == "") errObj.lastname = "To pole jest wymagane";

    if (
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


  return (
    <>
    <Shadow/>
    <Wrapper>
    <form onSubmit={handleUpdate}>
          <legend>
            <span>EDYTUJ INFORMACJE</span>
          </legend>

          <Input
            value={updatedUser?.firstname}
            name="firstname"
            type="text"
            placeholder="Imię"
            onChange={handleChange}
          />
           {errors && <ErrorMsg>{errors.firstname}</ErrorMsg>}
          
          <Input
            value={updatedUser?.lastname}
            name="lastname"
            type="text"
            placeholder="Nazwisko"
            onChange={handleChange}
          />
           {errors && <ErrorMsg>{errors.lastname}</ErrorMsg>}

          <Button type="submit">EDYTUJ</Button>
          <Button type="button" onClick={onClose} isSecondary>
            WRÓĆ
          </Button>
        </form>
    </Wrapper>
    </>
  );
};
