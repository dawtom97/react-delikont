import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Heading } from "../Heading";
import * as Styled from "./styles";

export const UserOrders = ({ orders }) => {
  const [items, setItems] = useState();
  const [sorted, setSorted] = useState();


  useEffect(() => {
    if (!orders) return;
    setItems(orders?.items);
  }, [orders, sorted]);
  console.log(items);

  const translateStatus = (value) => {
    switch (value) {
      case "Pending":
        return "Oczekujące";
      default:
        return value;
    }
  };

  const sortItems = (mode) => {
    console.log(mode);
    let sorted = null;
    switch (mode) {
      case "price-asc":
        sorted = [...items].sort((a, b) => {
          if (a.total.grand_total.value > b.total.grand_total.value) return 1;
          if (a.total.grand_total.value < b.total.grand_total.value) return -1;
          return 0;
        });
        setItems(sorted);

        break;
      case "price-desc":
        sorted = [...items].sort((a, b) => {
            if (a.total.grand_total.value > b.total.grand_total.value) return -1;
            if (a.total.grand_total.value < b.total.grand_total.value) return 1;
            return 0;
          });
          setItems(sorted);
        break;
      default:
        setItems(orders.items);
    }
  };

  return (
    <Styled.Wrapper>
      <Heading level="h3">Zamówienia</Heading>
      {items?.length ? (
        <>
          <select onChange={(e) => sortItems(e.target.value)}>
            <option value="">Sortuj zamówienia</option>
            <option value="price-asc">Od najtańszych</option>
            <option value="price-desc">Od najdroższych</option>
            <option>Od najnowszych</option>
            <option>Od najstarszych</option>
          </select>

          <Styled.OrdersTable>
            <thead>
              <tr>
                <td>Nr. zamówienia</td>
                <td>Data złożenia</td>
                <td>Status</td>
                <td>Wartość</td>
              </tr>
            </thead>
            <tbody>
              {items ? items.map((item) => (
                    <Link key={item.id} href="/">
                      <tr>
                        <Styled.NumberRow>
                          <span>{item.number}</span>
                        </Styled.NumberRow>
                        <td>{item.order_date}</td>
                        <Styled.StatusRow>
                          {translateStatus(item.status)}
                        </Styled.StatusRow>
                        <td>{item.total.grand_total.value} zł</td>
                      </tr>
                    </Link>
                  )): null}
            </tbody>
          </Styled.OrdersTable>
        </>
      ) : (
        <p>Nie złożyłeś jeszcze żadnych zamówień</p>
      )}
    </Styled.Wrapper>
  );
};
