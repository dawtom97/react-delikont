import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { Button } from "../Button";
import { ErrorMsg } from "../ErrorMsg";
import { Input } from "../Input";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

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

  & > form > div {
    position: relative;
    & label {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      color:${({theme})=>theme.colorPrimary};
      cursor: pointer;
    }
  }
`;

const initialState = {
  currentPassword: "",
  newPassword: "",
  rePassword: "",
};

export const EditPasswordForm = ({ onClose }) => {
  const { changeUserPassword } = useContext(UserContext);
  const [updatedPassword, setUpdatedPassword] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  //   useEffect(()=>{
  //     setUpdatedPassword(password)
  //   },[password])

  const handleChange = (e) => {
    setUpdatedPassword((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const isValid = validate(updatedPassword);

    if (isValid.status) {
      changeUserPassword(updatedPassword);
      onClose();
    } else {
      setErrors(isValid.errors);
    }
  };

  const validate = (data) => {
    const passReg = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );
    const errObj = {};
    if (data.currentPassword == "")
      errObj.currentPassword = "To pole jest wymagane";
    if (!data.newPassword.match(passReg))
      errObj.newPassword =
        "Wymagane co najmniej 6 znaków, w tym jedna duża litera i cyfra";
    if (data.newPassword !== data.rePassword)
      errObj.rePassword = "Hasła nie są identyczne";

    if (!errObj.currentPassword && !errObj.newPassword && !errObj.rePassword)
      return {
        status: true,
        errors: null,
      };

    return {
      status: false,
      errors: errObj,
    };
  };

  return (
    <>
      <Shadow />
      <Wrapper>
        <form onSubmit={handleUpdate}>
          <legend>
            <span>ZMIEŃ HASŁO</span>
          </legend>

          <div>
            <Input
              value={updatedPassword?.currentPassword}
              name="currentPassword"
              type={isVisible ? "text" : "password"}
              placeholder="Stare hasło"
              onChange={handleChange}
            />
            <label onClick={() => setIsVisible((prev) => !prev)}>
              {!isVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
            </label>

            {errors && <ErrorMsg>{errors.currentPassword}</ErrorMsg>}
          </div>

          <Input
            value={updatedPassword?.newPassword}
            name="newPassword"
            type={isVisible ? "text" : "password"}
            placeholder="Nowe hasło"
            onChange={handleChange}
          />
          {errors && <ErrorMsg>{errors.newPassword}</ErrorMsg>}
          <Input
            value={updatedPassword?.rePassword}
            name="rePassword"
            type={isVisible ? "text" : "password"}
            placeholder="Powtórz hasło"
            onChange={handleChange}
          />
          {errors && <ErrorMsg>{errors.rePassword}</ErrorMsg>}

          <Button type="submit">ZMIEŃ</Button>
          <Button type="button" onClick={onClose} isSecondary>
            WRÓĆ
          </Button>
        </form>
      </Wrapper>
    </>
  );
};
