import React, { Component, Fragment } from "react";
import styles from "./Landing.module.css";
import mealImg from "../imgs/meals.jpg";
const Landing = () => {
  return (
    <Fragment>
      <div className={styles["main-image"]}>
        <img src={mealImg} alt="meals"></img>
      </div>
      <div className={styles.summary}>
        <h2>Delicious Food,Delivered To You</h2>
        <p>
          Choose your favorite meal from our broad selection of available meals
          and enjoy a delicious lunch or dinner at home. All our meals are
          cooked with high-quality ingredients,just-in-time and of course by
          experienced chefs!
        </p>
      </div>
    </Fragment>
  );
};
export default Landing;
