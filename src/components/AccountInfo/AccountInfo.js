import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Heading } from "../Heading";
import { FiEdit } from "react-icons/fi";
import { Loader } from "../Loader";
import { EditUserForm } from "../EditUserForm/EditUserForm";
import { EditPasswordForm } from "../EditPasswordForm/EditPasswordForm";

export const Wrapper = styled.div`
  & h3 {
    margin-top: 0;
    font-size: 20px;
  }

`;
export const InfoBox = styled.div`
  & > p {
    font-size: 14px;
    margin: 5px 0;
  }
  &  button {
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

export const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  margin-bottom: 15px;
  border-bottom: 1px solid #ebebeb;
  @media (max-width:768px) {
    flex-direction: column;
    gap: 30px;
  }
  & > div {
    flex: 1;
  }
  & > div > p {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
  }
`;

export const AccountInfo = ({ user }) => {
  const [editMode,setEditMode] = useState(false);
  const [changePasswordMode,setChangePasswordMode] = useState(false);
  return (
    <Wrapper>
      {editMode ? <EditUserForm user={user} onClose={()=>setEditMode(false)}/> : null}
      {changePasswordMode ? <EditPasswordForm onClose={()=>setChangePasswordMode(false)}/>: null}
      <Heading level="h3">DANE KONTA</Heading>
      <InnerWrapper>
        <div>
          <p>INFORMACJE KONTAKTOWE</p>
          <InfoBox>
            <p>
              {user?.firstname} {user?.lastname}
            </p>
            <p>{user?.email}</p>
            <div>
              <button onClick={()=>setEditMode(true)}>
                <FiEdit /> EDYTUJ
              </button>
              <button onClick={()=>setChangePasswordMode(true)}>
                <FiEdit /> ZMIEŃ HASŁO
              </button>
            </div>
          </InfoBox>
        </div>
        <div>
          <p>NEWSLETTER</p>
          <InfoBox>
            <p>Nie zapisałeś/aś się jeszcze do naszego newslettera.</p>
            <button>
              <FiEdit /> EDYTUJ
            </button>
          </InfoBox>
        </div>
      </InnerWrapper>
      
    </Wrapper>
  );
};
