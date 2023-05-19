import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

export const Wrapper = styled.div`
  position: fixed;
  bottom: 0px;

  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.65);
  /* background:#fafafa;
  box-shadow: 0px -2px 4px 0px rgb(0 0 0 / 12%); */
  width: 100%;
  padding: 20px;
  font-size: 1.6rem;
  text-align: center;
  box-shadow: 0px 5px 5px -5px #bbb;
  font-weight: 700;
  z-index: 1000;
  color: ${({ isError }) => (isError ? "red" : "#f57c00")};
`;

const dropIn = {
  hidden: {
    y: "120px",
    opacity: 0,
    x: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    X: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      damping: 55,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
  },
};

export const Modal = ({ msg, isError = false }) => {
  const element = document.getElementById("modal");

  return createPortal(
      <Wrapper
        isError={isError}
        as={motion.div}
        key={msg}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p>{msg}</p>
      </Wrapper>,
    element
  );
};
