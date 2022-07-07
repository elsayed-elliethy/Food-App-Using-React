import React, { Component, useState } from "react";
import useInput2 from "../hook/use-input2";
import styles from "./CheckOut.module.css";
const notEmpty = (value) => {
  return value.trim() !== "";
};
const isCode = (value) => {
  return value.trim().length === 5;
};
const CheckOut = (props) => {
  const {
    enteredvalue: enteredYourName,
    inputValid: yourNameValid,
    inputInvalid: yourNameInvalid,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetYourName,
    inputClasses: yourNameCalsses,
  } = useInput2(notEmpty);
  const {
    enteredvalue: enteredStreet,
    inputValid: streetValid,
    inputInvalid: streetInvalid,
    inputChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet,
    inputClasses: streetCalsses,
  } = useInput2(notEmpty);
  const {
    enteredvalue: enteredCode,
    inputValid: codeValid,
    inputInvalid: codeInvalid,
    inputChangeHandler: codeChangeHandler,
    inputBlurHandler: codeBlurHandler,
    reset: resetCode,
    inputClasses: codeCalsses,
  } = useInput2(isCode);
  const {
    enteredvalue: enteredCity,
    inputValid: cityValid,
    inputInvalid: cityInvalid,
    inputChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity,
    inputClasses: cityCalsses,
  } = useInput2(notEmpty);

  let formValid = false;
  if (yourNameValid && streetValid && codeValid && cityValid) {
    formValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formValid) {
      return;
    }
    console.log(`Name : ${enteredYourName}`);
    console.log(`Street : ${enteredStreet}`);
    console.log(`Code : ${enteredCode}`);
    console.log(`City : ${enteredCity}`);

    props.onConfirm({
      userName: enteredYourName,
      street: enteredStreet,
      code: enteredCode,
      city: enteredCity,
    });
    resetYourName();
    resetStreet();
    resetCode();
    resetCity();
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.control}>
        <div className={yourNameCalsses}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredYourName}
          />
          {yourNameInvalid && (
            <p className={styles["error-text"]}>Type a Valid Name</p>
          )}
        </div>
        <div className={streetCalsses}>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            onChange={streetChangeHandler}
            onBlur={streetBlurHandler}
            value={enteredStreet}
          />
          {streetInvalid && (
            <p className={styles["error-text"]}>Type a Valid Street</p>
          )}
        </div>

        <div className={codeCalsses}>
          <label htmlFor="code">Postal Code</label>
          <input
            type="text"
            id="code"
            onChange={codeChangeHandler}
            onBlur={codeBlurHandler}
            value={enteredCode}
          />
          {codeInvalid && (
            <p className={styles["error-text"]}>Type a Valid Code</p>
          )}
        </div>
        <div className={cityCalsses}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            onChange={cityChangeHandler}
            onBlur={cityBlurHandler}
            value={enteredCity}
          />
          {cityInvalid && (
            <p className={styles["error-text"]}>Type a Valid City</p>
          )}
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={props.onClose}>
            Cancel
          </button>
          <button disabled={!formValid} className={styles.submit}>
            Confirm
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckOut;
