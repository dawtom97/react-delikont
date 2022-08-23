import React, { useContext, useEffect, useState } from 'react'
import { AccountInfo } from '../../src/components/AccountInfo/AccountInfo';
import {AddressInfo} from '../../src/components/AddressInfo/AddressInfo';
import { Loader } from '../../src/components/Loader';
import { UserContext } from '../../src/context/UserContext'
import { AccountTemplate } from '../../src/templates/AccountTemplate';

const AccountPage = () => {
  const {currentUser, addresses} = useContext(UserContext);

  console.log(addresses)

  return (
    <AccountTemplate>
       <AccountInfo user={currentUser}/>
       {addresses ? <AddressInfo addresses={addresses}/> : <Loader/>}
    </AccountTemplate>
  )
}

export default AccountPage