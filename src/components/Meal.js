import React, { Component } from "react";
import styles from "./Meal.module.css";

const Meal = (props) => {
  const mealPrice = props.cart ? props.price * props.amount : props.price;
  return (
    <div>
      <h3>
        {`${props.name}  `}
        {props.cart && (
          <span className={styles.amount}>{`x ${props.amount}`}</span>
        )}
      </h3>
      <p className={styles.description}>{props.disc}</p>
      <p className={styles.price}>${mealPrice.toFixed(2)}</p>
    </div>
  );
};

export default Meal;
