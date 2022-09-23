import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { OrderInfo } from '../../../src/components/OrderInfo/OrderInfo';
import { magentoOrderDetails } from '../../../src/graphql/magentoOrderDetails';
import {AccountTemplate} from '../../../src/templates/AccountTemplate'

const OrderDetails = () => {
  const router = useRouter();
  const orderNumber = router?.query?.order;
  const [currentOrder,setCurrentOrder] = useState();

  useEffect(()=>{
      if(!orderNumber) return;
      magentoOrderDetails(orderNumber[0]).then(({response})=>setCurrentOrder(response.data.customer.orders))
  },[orderNumber, router])

  return (
    <AccountTemplate>
        <OrderInfo order={currentOrder}/>
    </AccountTemplate>
  )
}

export default OrderDetails