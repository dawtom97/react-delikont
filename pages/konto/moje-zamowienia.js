import React, { useContext } from 'react'
import { UserOrders } from '../../src/components/UserOrders/UserOrders';
import { UserContext } from '../../src/context/UserContext'
import { AccountTemplate } from '../../src/templates/AccountTemplate'

const UserOrdersPage = () => {

  const {orders} = useContext(UserContext);

  return (
    <AccountTemplate>
         <UserOrders orders={orders}/>
    </AccountTemplate>
  )
}

export default UserOrdersPage;

