import React, { useContext } from 'react'
import { AddressInfo } from '../../src/components/AddressInfo/AddressInfo';
import { Loader } from '../../src/components/Loader';
import { UserContext } from '../../src/context/UserContext';
import { AccountTemplate } from '../../src/templates/AccountTemplate'

const UserAddressPage = () => {
  const {addresses} = useContext(UserContext);

  return (
    <AccountTemplate>
        {addresses ? <AddressInfo addresses={addresses}/> : <Loader/>}
    </AccountTemplate>
  )
}

export default UserAddressPage