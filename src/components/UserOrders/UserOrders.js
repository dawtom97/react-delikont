import Link from "next/link";
import React, { useEffect, useState } from "react";
import { translateStatus } from "../../utils/translateStatus";
import { Heading } from "../Heading";
import { Select } from "../Select";
import * as Styled from "./styles";

export const UserOrders = ({ orders }) => {
  const [items, setItems] = useState();
  const [sorted, setSorted] = useState();

  useEffect(() => {
    if (!orders) return;
    setItems(orders?.items);
  }, [orders, sorted]);



  const sortItems = (mode) => {

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
      case "date-asc":
        sorted = [...items].sort((a, b) => {
          if (a.order_date > b.order_date) return -1;
          if (a.order_date < b.order_date) return 1;
          return 0;
        });
        setItems(sorted);
        break;
      case "date-desc":
        sorted = [...items].sort((a, b) => {
          if (a.order_date > b.order_date) return 1;
          if (a.order_date < b.order_date) return -1;
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
      <Heading level="h3">Moje zamówienia</Heading>
      {items?.length ? (
        <>
          <label>Sortuj zamówienia</label>
          <Select onChange={(e) => sortItems(e.target.value)}>
            <option value="date-desc">Od najstarszych</option>
            <option value="date-asc">Od najnowszych</option>
            <option value="price-desc">Od najdroższych</option>
            <option value="price-asc">Od najtańszych</option>
          </Select>

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
              {items
                ? items.map((item) => (
                    <Link key={item.id} href={`/konto/moje-zamowienia/${item.number}`}>
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
                  ))
                : null}
            </tbody>
          </Styled.OrdersTable>
        </>
      ) : (
        <p>Nie złożyłeś jeszcze żadnych zamówień</p>
      )}
    </Styled.Wrapper>
  );
};
