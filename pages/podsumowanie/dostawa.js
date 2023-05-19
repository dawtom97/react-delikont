import React, { useContext } from "react";
import { OrderCheckoutItems } from "../../src/components/OrderCheckoutItems/OrderCheckoutItems";
import { UserContext } from "../../src/context/UserContext";
import { MainTemplate } from "../../src/templates/MainTemplate";
import styled from "styled-components";
import { OrderCheckoutShipping } from "../../src/components/OrderCheckoutShipping/OrderCheckoutShipping";

const Wrapper = styled.div`
  display: flex;
  gap:30px;
  @media (max-width:992px) {
      flex-direction: column-reverse;
    }

  & > div:first-of-type {
    width: 70%;
    @media (max-width:768px) {
      width: 100%;
    }
  }
`;

const Shipping = () => {
  const { cart,addresses } = useContext(UserContext);

  if (!cart || !addresses) return "Loading..";

  return (
    <MainTemplate>
      <Wrapper>
        <OrderCheckoutShipping cart={cart} addresses={addresses}/>
        <OrderCheckoutItems cart={cart} />
      </Wrapper>
    </MainTemplate>
  );
};

export default Shipping;
