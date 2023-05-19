import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  background-color: #fff;
  //border:1px solid black;
  border-radius: 12px;
  box-shadow: 0px 0px 12px 1px #8a8a8a;
  padding: 30px;
  top: 52%;
  left: 50%;
  z-index: 140;
  transform: translate(-50%, -50%);
  overflow-y: scroll;
  max-height: 70%;
  @media (max-width: 768px) {
    width: 100%;
  }

  & img:last-child {
    width: 500px;
  }

  & button {
    position: absolute;
    top: 15px;
    cursor: pointer;
    background-color: transparent;
    border: none;
    font-size: 26px;
    right: 15px;
  }
`;

const DevInfo = ({ onClick }) => {
  return (
    <Wrapper>
      <button onClick={onClick}>
        <AiOutlineClose />
      </button>
      <img src="/logo.png" alt="logooo" />
      <h3>Wersja testowa IV</h3>

      <p>
        <strong>Nowości:</strong>
        <p>- Lekkie animacje związane z doładowywaniem produktów i wyświetlaniem modalów</p>
        <p>- Wyliczanie ceny za kg/l w produktach</p>
        <p>- Pola do dodawania ceny za kg/l i formatu wagi - w panelu admina</p>
        <p>- Pola do oznaczenia produktu jako wyróżniony i wyróżniony w danej kategorii - w panelu admina</p>
      </p>


      <hr />
      <p>
        <strong>Poprzednie:</strong>
      </p>
      <p>- Możliwość dodawania wybranej ilości produktu z poziomu strony głównej - wpisując liczbę w polach tekstowych, które pojawiają się po dodaniu do koszyka</p>

      <p>- Naprawa błędu z nieprawidłowym automatycznym wylogowaniem po wejściu na stronę po kilku godzinach od logowania</p>
      <p>- Sortowanie produktów po cenie i nazwie (malejąco lub rosnąco)</p>
      {/* <p>
        - złożenie zamówienia (podsumowanie, wybór sposobu dostawy, adresu i
        płatności)
      </p>
      <p>- lista zamówień w panelu użytkownika</p>
      <p>- filtry w liście zamówień</p>
      <p>
        - strona ze szczegółami zamówienia po kliknięciu na zamówienie w panelu
        użytkownika
      </p>
      <p>
        - pobieranie treści ze stron w panelu admina (jako przykład strona
        polityki prywatności - link w stopce)
      </p> */}
      {/* <p>- logowanie / autoryzacja</p>
        <p>- ulubione produkty i ich lista (panel użytkownika)</p>
        <p>- dodawanie do koszyka, usuwanie z koszyka</p>
        <p>- adresy, dodawanie/edytowanie i usuwanie adresów dostawy i rozliczeń</p>
        <p>- doładowywanie produktów na stronie głównej po przewinięciu na dół strony</p>
        <p>- edycja danych użytkownika</p> */}
      <hr />
      <p>
        <strong>Znane błędy:</strong>
      </p>
      <p>- znikająca informacja na temat województwa po edycji adresu</p>
      {/* <p>
        Możliwe jest chwilowa utrata części danych z konta użytkownika. Mogą
        pojawić się wtedy błędy związane z koszykiem/listą zamówień itd.
      </p>
      <p>
        Jeżeli po kliknięciu w ikonkę użytkownika nie widzisz imienia
        użytkownika, jak na poniższym obrazu najlepiej się wylogować i zalogować
        ponownie.
      </p>
      <img src="/err1.png" /> */}
    </Wrapper>
  );
};

export default DevInfo;
