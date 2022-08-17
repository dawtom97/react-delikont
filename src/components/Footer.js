import React from 'react';
import styled from 'styled-components';


export const Wrapper = styled.footer`
  border-top: 1px solid #f5f3ea;
  margin-top:70px;
`
export const InnerWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 10px;
  display: flex;
  align-items: flex-start;
  gap:20px;

  & > div {
    flex:1;
  }

  & span {
    font-weight: 600;
    font-size: 14px;
    color: #000;
  }


  & ul {
    list-style: none;
    padding: 0;
  }
  & li, & p {
    color:#b1b1b1;
    font-size:14px;
    margin:10px 0;
  }
`
export const BottomWrapper = styled.div`
  background-color: #f2f8fd;
    padding: 15px 0 15px;

    & > div {
      max-width: 1400px;
  margin: 0 auto;
  font-size: 12px;
    }
`

export const Footer = () => {

  return (
    <Wrapper>
         <InnerWrapper>
            <div>
              <span>O nas</span>
              <p>Delikont.pl to internetowa hurtownia spożywcza. Naszym celem jest dostarczanie klientom konkurencyjnego cenowo asortymentu w prosty sposób!</p>
            </div>
            <div>
              <span>Delikont.pl</span>
              <ul>
                <li>Polityka prywatności</li>
                <li>Dane adresowe</li>
                <li>Moje zamówienia</li>
                <li>Ulubione produkty</li>
              </ul>
            </div>
            <div>
              <span>Ciekawostki</span>
              <ul>
                <li>Oferty specjalne</li>
                <li>Wyprzedaże</li>
                <li>Promocje</li>
                <li>Nowe produkty</li>
              </ul>
            </div>
            <div>
              <span>Dowiedz się więcej</span>
              <ul>
                <li>O nas</li>
                <li>Mapa strony</li>
                <li>Marki</li>
                <li>Produkty</li>
              </ul>
            </div>
            <div>
              <span>Kategorie</span>
              <ul>
                <li>Chemia i kosmetyki</li>
                <li>Dla zwierząt</li>
                <li>Dziecięce</li>
                <li>Kawy i herbaty</li>
                <li>Piwo</li>
                <li>Spożywcze</li>
                <li>Słodycze i przekąski</li>
                <li>Warzywa i owoce</li>
                <li>Wody i napoje</li>
              </ul>
            </div>
         </InnerWrapper>
         <BottomWrapper>
                <div>
                  <p>© {new Date().getFullYear()} Delikont Sp. z.o.o Delikont.pl Wszelkie prawa zastrzeżone.</p>
                </div>
         </BottomWrapper>
    </Wrapper>
  )
}

