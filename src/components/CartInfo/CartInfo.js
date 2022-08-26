import React, { useContext } from "react";
import styled from "styled-components";
import { CartItem } from "../CartItem/CartItem";
import { Heading } from "../Heading";
import { Button } from "../Button";
import { AiOutlineLeft } from "react-icons/ai";
import Link from "next/link";
import { UserContext } from "../../context/UserContext";

export const Wrapper = styled.div`
  & > div {
    display: flex;
    gap: 30px;
  }

  & td,
  th {
    text-align: left;
  }
  & th {
    border-bottom: 1px solid #efefef;
    padding-bottom: 15px;
  }
`;
export const ItemsBox = styled.div`
  flex: 2;
  & table {
    width: 100%;
  }
`;
export const SubmitBox = styled.div`
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px 30px;

  & h3 {
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 15px;
  }

  & p {
    display: flex;
    font-size: 14px;
    justify-content: space-between;
  }
  & button {
    width: 100%;
    margin-top: 30px;
    height: 50px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid #efefef;

  & button {
    display: flex;
    align-items: center;
    gap: 7px;
    justify-content: center;
  }
`;

export const CartInfo = ({ cart }) => {

  if (!cart) return "Loading...";
  console.log(cart);
  return (
    <Wrapper>
      <Heading level="h1">Koszyk</Heading>
      {!cart.items.length >= 1 ? (
        <p>Nie masz żadnych produktów w koszyku</p>
      ) : (
        <div>
          <ItemsBox>
            <table>
              <thead>
                <tr>
                  <th>PRODUKT</th>
                  <th>NAZWA</th>
                  <th>CENA</th>
                  <th>ILOŚĆ</th>
                  <th>AKCJE</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => (
                  <>
                    <CartItem key={item.id} item={item} />
                  </>
                ))}
              </tbody>
            </table>

            <ButtonsWrapper>
              <Link href="/">
                <Button>
                  <AiOutlineLeft /> KONTYNUUJ ZAKUPY
                </Button>
              </Link>
              <Link href="/konto/moje-konto">
                <Button isSecondary>MOJE KONTO</Button>
              </Link>
            </ButtonsWrapper>
          </ItemsBox>
          <SubmitBox>
            <Heading level="h3">PODSUMOWANIE</Heading>
            <p>
              <span>Suma częściowa</span> <span>0,00zł</span>
            </p>
            <p>
              <span>Dostawa</span> <span>0,00zł</span>
            </p>
            <p>
              <span>Podatek</span> <span>0,00zł</span>
            </p>
            <p>
              <strong>Do zapłaty</strong>{" "}
              <strong>{cart.prices.grand_total.value}zł</strong>
            </p>
            <Button isSecondary>PRZEJDŹ DO KASY</Button>
          </SubmitBox>
        </div>
      )}
    </Wrapper>
  );
};
