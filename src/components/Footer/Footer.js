import React from 'react';
import * as Styled from './styles';


export const Footer = () => {

  return (
    <Styled.Wrapper>
         <Styled.InnerWrapper>
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
         </Styled.InnerWrapper>
         <Styled.BottomWrapper>
                <div>
                  <p>© {new Date().getFullYear()} Delikont Sp. z.o.o Delikont.pl Wszelkie prawa zastrzeżone.</p>
                </div>
         </Styled.BottomWrapper>
    </Styled.Wrapper>
  )
}

