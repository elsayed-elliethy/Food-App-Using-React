import React, { Component, useState, useReducer } from "react";
import styles from "../components/CheckOut.module.css";
const InputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { enteredvalue: action.val, inputTouch: state.inputTouch };
  }
  if (action.type === "BLUR") {
    return { enteredvalue: state.enteredvalue, inputTouch: action.touch };
  }
  if (action.type === "RESET") {
    return { enteredvalue: "", inputTouch: false };
  }
  return { enteredvalue: "", inputTouch: false };
};
const useInput2 = (checkValid) => {
  //   const [enteredvalue, setEnteredValue] = useState("");
  //   const [inputTouch, setInputTouch] = useState(false);
  const [inputState, dispatchInput] = useReducer(InputReducer, {
    enteredvalue: "",
    inputTouch: false,
  });
  const inputValid = checkValid(inputState.enteredvalue);
  const inputInvalid = !inputValid && inputState.inputTouch;

  const inputChangeHandler = (event) => {
    // setEnteredValue(event.target.value);
    dispatchInput({ type: "INPUT", val: event.target.value });
  };
  const inputBlurHandler = () => {
    // setInputTouch(true);
    dispatchInput({ type: "BLUR", touch: true });
  };

  const reset = () => {
    // setEnteredValue("");
    // setInputTouch(false);
    dispatchInput({ type: "RESET" });
  };
  const inputClasses = inputInvalid
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  return {
    enteredvalue: inputState.enteredvalue,
    inputValid,
    inputInvalid,
    inputChangeHandler,
    inputBlurHandler,
    reset,
    inputClasses,
  };
};
export default useInput2;
