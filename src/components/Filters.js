import React, { useState } from "react";
import styled from "styled-components";
import { Heading } from "./Heading";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 20px;
  margin-top: 24px;
  background: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FiltersBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 33px;
  width: 170px;
  text-align: center;
  z-index: 100;
  gap: 10px;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 12%), 0 0 2px 0 rgb(0 0 0 / 14%);
  border-radius: 20px;
  cursor: pointer;
  transition: 0.4s;
  color: #fff;
  color: ${({ theme }) => theme.colorPrimary};

  &:hover {
    background-color: ${({ theme }) => theme.colorPrimary};

    & > span {
      color: #fff;
    }
  }

  & > span {
    font-weight: 600;
    text-align: center;

    font-size: 0.9rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & svg {
      font-size: 1.5rem;
    }
  }
`;

export const FiltersContent = styled.div`
  position: absolute;
  background-color: #fff;
  bottom: -200px;
  font-size: 14px;
  min-width: 320px;
  text-align: left;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 12%), 0 0 2px 0 rgb(0 0 0 / 14%);
  right: 0;

  @media (max-width: 768px) {
    left: 0;
  }

  & > div {
    padding: 15px;
    border-bottom: 1px solid #f2f2f2;
    color: #0707078c;
    font-weight: 500;
    transition: 0.4s;

    &:hover {
      background-color: #ffe1c2;
    }
  }
`;

export const Filters = ({ onChangeFilter, msg }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Wrapper>
      <Heading level="h1">{msg}</Heading>
      <FiltersBox onClick={() => setShowFilters(!showFilters)}>
        <span>
          Sortuj według{" "}
          {showFilters ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </span>

        <AnimatePresence>
          {showFilters ? (
            <FiltersContent
              as={motion.div}
              initial={{ opacity: 0 }}
              exit={{opacity:0}}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div onClick={onChangeFilter} data-filter="name,ASC">
                Nazwa produktu A-Z
              </div>
              <div onClick={onChangeFilter} data-filter="name,DESC">
                Nazwa produktu Z-A
              </div>
              <div onClick={onChangeFilter} data-filter="price,ASC">
                Cena rosnąco
              </div>
              <div onClick={onChangeFilter} data-filter="price,DESC">
                Cena malejąco
              </div>
              <div onClick={onChangeFilter} data-filter="relevance,DESC">
                Stosowność
              </div>
            </FiltersContent>
          ) : null}
        </AnimatePresence>
      </FiltersBox>
    </Wrapper>
  );
};
