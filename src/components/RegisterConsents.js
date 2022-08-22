import Link from "next/link";
import React, { useState } from "react";
import { Input } from "./Input";

const LongDesc = () => (
  <>
    <span>
      Administratorem danych osobowych jest Delikont Spółka z ograniczoną
      odpowiedzialnością z siedzibą w Jastrzębiu-Zdroju pod adresem ul.
      Pszczyńska 416, 44-336 Jastrzębie-Zdrój, NIP: 6342848067, REGON:
      362753897, wpisana do rejestru przedsiębiorców Krajowego Rejestru Sądowego
      pod numerem KRS: 0000580831, sąd rejestrowy: Sąd Rejonowy w Gliwicach, X
      Wydział Gospodarczy Krajowego Rejestru Sądowego, kapitał zakładowy:
      100.000 zł. Podanie danych osobowych przez klienta jest dobrowolne.
      Administrator przetwarza dane osobowe w następujących celach: zawieranie i
      realizacja umów, na podstawie zawartej umowy; rachunkowych związanych z
      wystawianiem i przyjmowaniem dokumentów rozliczeniowych, na podstawie
      przepisów prawa podatkowego; archiwizacja danych dla potrzeby wykazania
      faktów, a także ewentualnego ustalenia, dochodzenia lub obrony przed
      roszczeniami oraz kontakt telefoniczny lub za pośrednictwem poczty
      elektronicznej, co jest prawnie uzasadnionym interesem administratora
      danych. Odbiorcami danych osobowych przetwarzanych przez administratora
      danych mogą być podmioty współpracujące z administratorem danych gdy jest
      to niezbędne do realizacji umowy zawartej z osobą, której dane dotyczą.
      Dane osobowe nie będą przekazywane do podmiotu mającego siedzibę w
      państwie trzecim. Administrator danych przechowuje dane osobowe przez czas
      nie dłuższy niż termin przedawnienia zgodnie z przepisami Kodeksu
      cywilnego. Każda osoba, której dane osobowe są przetwarzane przez
      administratora ma prawo dostępu do treści swoich danych, prawo do ich
      sprostowania, usunięcia („prawo do bycia zapomnianym”), ograniczenia
      przetwarzania, prawo do przenoszenia danych, prawo sprzeciwu oraz prawo do
      cofnięcia zgody na przetwarzanie danych w dowolnym momencie. Każda osoba,
      która uzna, że jej dane osobowe są przetwarzane przez administratora z
      naruszeniem przepisów RODO lub innych właściwych przepisów prawa, a
      dotyczących przetwarzania danych osobowych, ma prawo wniesienia skargi do
      Prezesa Urzędu Ochrony Danych Osobowych. Dane osobowe nie będą
      przetwarzane w sposób automatyczny, w tym poprzez profilowanie.
      Szczegółowe informacje na temat przetwarzania danych osobowych znajdują
      się w naszej w klauzuli informacyjnej RODO dostępnej pod adresem{" "}
      <Link href="/polityka-prywatnosci">polityka prywatności</Link> i{" "}
      <Link href="/polityka-cookies">polityka cookies</Link>
    </span>
  </>
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
    <div>
      <div>{isShort ? <ShortDesc /> : <LongDesc />}</div>
      <div>
        <Input type="checkbox" id="Agree1"/>
        <label>    <Link href="/polityka-prywatnosci">politykĘ prywatności</Link> i{" "}
      <Link href="/regulamin">regulamin</Link></label>
      </div>
      
    </div>
  );
};

export default RegisterConsents;
