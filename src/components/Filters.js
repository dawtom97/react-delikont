import React from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 30px;
  margin-bottom: 20px;
  padding: 10px 10px;
  border: 1px solid #e1e1e1;
  & > div {
    display: flex;
    align-items: center;
    gap: 10px;

    & > label {
        font-size: 12px;
    }
    & > select {
        color: #9c9c9c;
        height: 30px;
    border-color: #e1e1e1;
    background: transparent;
    font-size: 12px;
    }
  }
`;

export const Filters = () => {
  return (
    <Wrapper>
      <div>
        <label>Producent</label>
        <select>
          <option>Wybierz producenta</option>
        </select>
      </div>
      <div>
        <label>Sortuj</label>
        <select>
          <option>Cena za kg rosnąco</option>
          <option>Cena za kg malejąco</option>
        </select>
      </div>
    </Wrapper>
  );
};