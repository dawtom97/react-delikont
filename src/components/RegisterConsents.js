import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "./Input";

export const Wrapper = styled.div`
  text-align: left;
  font-size: 10px;
  color: #9e9e9e;
  margin:30px 0;
 

  & a {
    color:${({theme})=>theme.colorPrimary};
    text-decoration: underline;
    font-weight: 500;
  }
  &  input {
    width: 12px;
   ;
   
  }

  & button {
    background-color: transparent;
    border: none;
    display: block;
    cursor: pointer;
    margin:5px 0;
    color:${({theme})=>theme.colorPrimary};
    font-size: 10px;
    padding: 0;
    text-decoration: underline;
    font-weight: 500;
    text-align: left;
  }


`;
export const LabelBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 7px 0;

  & label,
  span {
    font-size: 10px;
    color: #9e9e9e;
  }
  & > input {
    height: 12px;
  }
`;

const LongDesc = () => (
  <span>
    Administratorem danych osobowych jest Delikont Spółka z ograniczoną
    odpowiedzialnością z siedzibą w Jastrzębiu-Zdroju pod adresem ul. Pszczyńska
    416, 44-336 Jastrzębie-Zdrój, NIP: 6342848067, REGON: 362753897, wpisana do
    rejestru przedsiębiorców Krajowego Rejestru Sądowego pod numerem KRS:
    0000580831, sąd rejestrowy: Sąd Rejonowy w Gliwicach, X Wydział Gospodarczy
    Krajowego Rejestru Sądowego, kapitał zakładowy: 100.000 zł. Podanie danych
    osobowych przez klienta jest dobrowolne. Administrator przetwarza dane
    osobowe w następujących celach: zawieranie i realizacja umów, na podstawie
    zawartej umowy; rachunkowych związanych z wystawianiem i przyjmowaniem
    dokumentów rozliczeniowych, na podstawie przepisów prawa podatkowego;
    archiwizacja danych dla potrzeby wykazania faktów, a także ewentualnego
    ustalenia, dochodzenia lub obrony przed roszczeniami oraz kontakt
    telefoniczny lub za pośrednictwem poczty elektronicznej, co jest prawnie
    uzasadnionym interesem administratora danych. Odbiorcami danych osobowych
    przetwarzanych przez administratora danych mogą być podmioty współpracujące
    z administratorem danych gdy jest to niezbędne do realizacji umowy zawartej
    z osobą, której dane dotyczą. Dane osobowe nie będą przekazywane do podmiotu
    mającego siedzibę w państwie trzecim. Administrator danych przechowuje dane
    osobowe przez czas nie dłuższy niż termin przedawnienia zgodnie z przepisami
    Kodeksu cywilnego. Każda osoba, której dane osobowe są przetwarzane przez
    administratora ma prawo dostępu do treści swoich danych, prawo do ich
    sprostowania, usunięcia („prawo do bycia zapomnianym”), ograniczenia
    przetwarzania, prawo do przenoszenia danych, prawo sprzeciwu oraz prawo do
    cofnięcia zgody na przetwarzanie danych w dowolnym momencie. Każda osoba,
    która uzna, że jej dane osobowe są przetwarzane przez administratora z
    naruszeniem przepisów RODO lub innych właściwych przepisów prawa, a
    dotyczących przetwarzania danych osobowych, ma prawo wniesienia skargi do
    Prezesa Urzędu Ochrony Danych Osobowych. Dane osobowe nie będą przetwarzane
    w sposób automatyczny, w tym poprzez profilowanie. Szczegółowe informacje na
    temat przetwarzania danych osobowych znajdują się w naszej w klauzuli
    informacyjnej RODO dostępnej pod adresem{" "}
    <Link href="/polityka-prywatnosci">polityka prywatności</Link> i{" "}
    <Link href="/polityka-cookies">polityka cookies</Link>
  </span>
);

const ShortDesc = () => (
  <span>
    Administratorem danych osobowych jest Delikont Spółka z ograniczoną
    odpowiedzialnością z siedzibą w Jastrzębiu-Zdroju pod adresem ul. Pszczyńska
    416, 44-336 Jastrzębie-Zdrój, NIP: 6342848067, REGON: 362753897, wpisana do
    rejestru przedsiębiorców Krajowego Rejestru Sądowego pod numerem KRS:
    0000580831, sąd rejestrowy: Sąd Rejonowy w Gliwicach, X Wydział Gospodarczy
    Krajowego Rejestru Sądowego, kapitał zakładowy.....
  </span>
);

export const RegisterConsents = () => {
  const [isShort, setIsShort] = useState(true);

  return (
    <Wrapper>
      <div>
        {isShort ? <ShortDesc /> : <LongDesc />}
        <button onClick={() => setIsShort((prev) => !prev)}>
          {isShort ? "Więcej" : "Mniej"}
        </button>
      </div>
      <LabelBox>
        <Input required type="checkbox" id="Agree1" />
        <label htmlFor="Agree1">
          Akceptuję
          <Link href="/polityka-prywatnosci"> politykę prywatności</Link> i{" "}
          <Link href="/regulamin">regulamin</Link>
        </label>
      </LabelBox>
      <LabelBox>
        <Input required type="checkbox" id="Agree2" />
        <label htmlFor="Agree2">
          Wyrażam zgodę na przetwarzanie moich danych osobowych, w szczególności
          imienia i nazwiska oraz adresu poczty elektronicznej przez Sprzedawcę
          w celu otrzymywania informacji marketingowych o produktach i usługach,
          w tym informacji w formie subskrypcji na mój adres poczty
          elektronicznej w myśl art. 10 ustawy z dnia 18 lipca 2002 r. o
          świadczeniu usług drogą elektroniczną.
        </label>
      </LabelBox>
      <LabelBox>
        <Input required type="checkbox" id="Agree3" />
        <label htmlFor="Agree3">
          Wyrażam zgodę na przetwarzanie moich danych osobowych w postaci
          imienia i nazwiska oraz numeru telefonu przez Sprzedawcę w celu
          marketingu bezpośredniego produktów i usług z wykorzystaniem
          telekomunikacyjnych urządzeń końcowych i automatycznych systemów
          wywołujących, w szczególności wyrażam zgodę na otrzymywanie informacji
          handlowych w formie wiadomości tekstowych (SMS) na mój numer telefonu,
          zgodnie z art. 172 ust. 1 ustawy z dn. 16 lipca 2004 r. Prawo
          telekomunikacyjne (tj. Dz.U. 2017 poz. 1907).
        </label>
      </LabelBox>
      <LabelBox>
        <Input required type="checkbox" id="Agree4" />
        <label htmlFor="Agree4">
          Wyrażam zgodę na przetwarzanie moich danych osobowych przez Sprzedawcę
          w celu odpowiedzi na moje zapytanie, a także przesłania oferty
          handlowej (jeżeli dotyczy jej moje zapytanie). Podanie danych jest
          dobrowolne, ale niezbędne do udzielenia odpowiedzi oraz przygotowania
          oferty przez Sprzedawcę.
        </label>
      </LabelBox>
    </Wrapper>
  );
};

