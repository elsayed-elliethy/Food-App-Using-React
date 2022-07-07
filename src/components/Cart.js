import React, { Component, Fragment, useContext, useState } from "react";
import styles from "./Cart.module.css";
import Modal from "./Modal";
import Meal from "./Meal";
import AuthContext from "../store/auth-context";
import CheckOut from "./CheckOut";
import useHttp from "../hook/use-http";
const Cart = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [submitForm, setSubmitForm] = useState(false);
  const [showItems, setShowItems] = useState(true);

  const ctx = useContext(AuthContext);
  let cartMeals = ctx.cartMeals;
  const removeMealsHandler = (event) => {
    const [item] = ctx.cartMeals.filter((ele) => {
      return ele.id === event.target.id;
    });
    ctx.onRemoveMeal(item);
  };
  const addMealsHandler = (event) => {
    const [targetMeal] = ctx.cartMeals.filter((ele) => {
      return ele.id === event.target.id;
    });
    ctx.onAddMealFromcart(targetMeal);
  };
  const totalPrice = ctx.cartMeals.length === 0 ? 0 : ctx.totalP.toFixed(2);

  const orderHandle = () => {
    setShowForm(true);
  };
  const orderClose = () => {
    setShowForm(false);
  };
  /////////////

  const { isLoading, error, requestFn: sendOrder } = useHttp();
  const submitFn = () => {
    setSubmitForm(true);
    ctx.onClearMeals();
  };
  const confirmOrderHandler = async (userData) => {
    sendOrder(
      {
        url: "https://food-e7d7c-default-rtdb.firebaseio.com/data/orders.json",
        method: "POST",
        body: { user: userData, orderedItems: ctx.cartMeals },
        headers: {
          "Content-Type": "application/json",
        },
      },
      submitFn
    );
  };
  ///////////
  let content = showItems && (
    <div>
      <ul className={styles.mealsUL}>
        {cartMeals.length === 0 && (
          <p className={styles.noMeals}>No Meals Added</p>
        )}
        {cartMeals.map((meal) => {
          return (
            <li key={meal.id} className={styles.meal}>
              <Meal
                cart
                id={meal.id}
                name={meal.name}
                disc={meal.disc}
                price={meal.price}
                amount={meal.amount}
              ></Meal>

              <div className={styles.actions2}>
                <button id={meal.id} onClick={removeMealsHandler}>
                  -
                </button>
                <button id={meal.id} onClick={addMealsHandler}>
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.total}>
        <span>Total Price</span>
        <span>${totalPrice}</span>
      </div>
      {showForm && (
        <CheckOut
          onCancel={orderClose}
          onClose={props.onClose}
          onConfirm={confirmOrderHandler}
        />
      )}
      {error && <p>{error}</p>}
      <div className={styles.actions}>
        {!showForm && (
          <button className={styles.close} onClick={props.onClose}>
            Close
          </button>
        )}
        {ctx.cartMeals.length > 0 && !showForm && (
          <button className={styles.order} onClick={orderHandle}>
            Order
          </button>
        )}
      </div>
    </div>
  );

  if (error) {
    content = (
      <Fragment>
        <p>{error}</p>
        <div className={styles.actions}>
          <button className={styles.order} onClick={props.onClose}>
            Close
          </button>
        </div>
      </Fragment>
    );
  }
  if (isLoading) {
    content = <p>loading...</p>;
  }
  if (submitForm && !error && !isLoading) {
    content = (
      <Fragment>
        <p className={styles.success}>Your Order Has Been Sent</p>
        <div className={styles.actions}>
          <button className={styles.order} onClick={props.onClose}>
            Close
          </button>
        </div>
      </Fragment>
    );
  }

  /////////////

  return <Modal onClose={props.onClose}>{content}</Modal>;
};

export default Cart;
