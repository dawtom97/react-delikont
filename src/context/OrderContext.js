import { createContext, useState } from "react";
import { Modal } from "../components/Modal";



export const OrderContext = createContext();


export const OrderContextProvider = ({children}) => {

    const [orderAddress,setOrderAddress] = useState();
    const [orderBilling,setOrderBilling] = useState();
    const [orderPaymentMethod, setOrderPaymentMethod] = useState();
    const [orderMoney, setOrderMoney] = useState();
    const [orderShippingMethod, setOrderShippingMethod] = useState();

    const value = {
        setOrderShippingMethod,
        setOrderAddress,
        setOrderBilling,
        setOrderPaymentMethod,
        setOrderMoney,
        orderShippingMethod,
        orderAddress,
        orderBilling,
        orderPaymentMethod,
        orderMoney
    }
     
    return (
        <OrderContext.Provider value={value}>

            {children}
        </OrderContext.Provider>
    )
}