import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../src/context/UserContext'
import {MainTemplate} from '../src/templates/MainTemplate'

const AccountPage = () => {
  const {currentUser,userLogout} = useContext(UserContext);

  
 console.log(currentUser,"USER");

  return (
    <MainTemplate>
       <h1>Zalogowano jako {currentUser?.firstname} {currentUser?.lastname}</h1>
       <h2>Email: {currentUser?.email}</h2>
       <button onClick={userLogout}>Wyloguj</button>
    </MainTemplate>
  )
}

export default AccountPage