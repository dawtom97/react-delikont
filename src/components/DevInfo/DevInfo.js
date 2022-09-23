import React from 'react';
import {AiOutlineClose} from 'react-icons/ai'
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  background-color: #fff;
  //border:1px solid black;
  border-radius: 12px;
  box-shadow:0px 0px 12px 1px #8a8a8a;
  padding: 30px;
  top:52%;
  left:50%;
  z-index: 140;
  transform: translate(-50%,-50%);
  overflow-y: scroll;
  max-height: 70%;

  & img:last-child {
    width: 500px;
  }

  & button {
    position: absolute;
    top:15px;
    cursor: pointer;
    background-color: transparent;
    bordeR:none;
    font-size: 26px;
    right: 15px;

  }
`


const DevInfo = ({onClick}) => {
  return (
    
    <Wrapper>
        <button onClick={onClick}><AiOutlineClose/></button>
        <img src="/logo.png" alt="logooo"/>
        <h3>Wersja testowa III</h3>

        <p><strong>Nowości:</strong></p>
        <p>- złożenie zamówienia (podsumowanie, wybór sposobu dostawy, adresu i płatności)</p>
        <p>- lista zamówień w panelu użytkownika</p>
        <p>- filtry w liście zamówień</p>
        <p>- strona ze szczegółami zamówienia po kliknięciu na zamówienie w panelu użytkownika</p>
        <p>- pobieranie treści ze stron w panelu admina (jako przykład strona polityki prywatności - link w stopce)</p>
        <hr/>
        <p><strong>Poprzednie:</strong></p>
        <p>- logowanie / rejestracja</p>
        <p>- ulubione produkty i ich lista (panel użytkownika)</p>
        <p>- dodawanie do koszyka, usuwanie z koszyka</p>
        <p>- adresy, dodawanie/edytowanie i usuwanie adresów dostawy i rozliczeń</p>
        <p>- doładowywanie produktów na stronie głównej po przewinięciu na dół strony</p>
        <p>- edycja danych użytkownika</p>
        <hr/>
        <p><strong>Znane błędy:</strong></p>
        <p>Możliwe jest chwilowa utrata części danych z konta użytkownika. Mogą pojawić się wtedy błędy związane z koszykiem/listą zamówień itd.
        </p>
        <p>Jeżeli po kliknięciu w ikonkę użytkownika nie widzisz imienia użytkownika, jak na poniższym obrazu najlepiej się wylogować i zalogować ponownie.</p>
        <img src="/err1.png"/>
    </Wrapper>
   
    
  )
}

export default DevInfo