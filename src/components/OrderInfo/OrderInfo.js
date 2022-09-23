import React from "react";
import { translateStatus } from "../../utils/translateStatus";
import { Heading } from "../Heading";
import * as Styled from "./styles";

export const OrderInfo = ({ order }) => {
  if (!order) return;

  console.log(order);

  return (
    <Styled.Wrapper>
      <Heading level="h3">Zamówienie numer {order.items[0].number}</Heading>
      <Styled.MinorInfo>
        <p>
          Status zamówienia:{" "}
          <strong>{translateStatus(order.items[0].status)}</strong>
        </p>
        <p>
          Data zamówienia: <strong>{order.items[0].order_date}</strong>
        </p>
        <p>
          Data dostawy: <strong>Tutaj info z kalendarza</strong>
        </p>
        <p>
          Dostawa: <strong>{order.items[0].carrier}</strong>
        </p>
      </Styled.MinorInfo>

      <Styled.OrderTable>
        <thead>
          <tr>
            <td>Nazwa produktu</td>
            <td>Ilość</td>
            <td>Cena</td>
            <td>Wartość</td>
            <td>SKU</td>
          </tr>
        </thead>
        <tbody>
            {order.items[0].items.map((item)=>(
                <tr key={item.product_sku}>
                    <td>{item.product_name}</td>
                    <td>{item.quantity_ordered}</td>
                    <td>{item.product_sale_price.value} zł</td>
                    <td>{(item.product_sale_price.value * item.quantity_ordered).toFixed(2)} zł</td>
                    <td>{item.product_sku}</td>
                </tr>
            ))}
            <tr>
                <td colSpan={3}>Łącznie</td>
                <td colSpan={2}>{order.items[0].total.grand_total.value} zł + {order.items[0].carrier} </td>
            </tr>
        </tbody>
      </Styled.OrderTable>

      <Styled.MinorInfo>
        <Heading level="h4">Status produktów w zamówieniu</Heading>
        <p><strong>W REALIZACJI</strong></p>
        <p>Towar jest przygotowywany do wysyłki lub czekamy na jego dostawę do magazynu głównego.</p>
        <p><strong>GOTOWY</strong></p>
        <p>Towar został spakowany i jest gotowy do wysyłki z magazynu głównego.</p>
        <p><strong>OCZEKUJĄCY</strong></p>
        <p>Zamówienie nie zostało jeszcze potwierdzone i proces realizacji jeszcze się nie rozpoczął.</p>
        <p><strong>ANULOWANY</strong></p>
        <p>Anulowano realizacje dostarczenia towaru.</p>
      </Styled.MinorInfo>
    </Styled.Wrapper>
  );
};
