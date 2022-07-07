import React, { Component, useContext, useEffect, useState } from "react";
import styles from "./Meals.module.css";
import Card from "./Card";
import Meal from "./Meal";
import AuthContext from "../store/auth-context";

import useHttp from "../hook/use-http";
const Meals = (props) => {
  const ctx = useContext(AuthContext);

  // /////////////
  const [avilableMeals, setAvilableMeals] = useState([]);

  const { isLoading, error, requestFn: getMeals } = useHttp();

  useEffect(() => {
    const transformMeals = (data) => {
      // console.log(typeof data);
      const loadedMeals = [];

      Object.entries(data).map(([key, value]) => {
        loadedMeals.push({
          id: key,
          name: value.name,
          desc: value.disc,
          price: value.price,
        });
      });
      setAvilableMeals(loadedMeals);
    };

    getMeals(
      {
        url: "https://food-e7d7c-default-rtdb.firebaseio.com/data/meals.json",
      },
      transformMeals
    );
  }, [getMeals]);

  const addMealHandler = (event) => {
    const newMeal = avilableMeals.filter((ele) => {
      return ele.id === event.target.id;
    });
    const [added] = newMeal;
    const item = { ...added, amount: +ctx.amount };
    ctx.onAddMeal(item);
  };

  const amountChangehandler = (event) => {
    ctx.onAmountChange(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // getDefaultAmount("1")
  };
  // //////////
  let content = (
    <div className={styles.meals}>
      <ul>
        {avilableMeals.map((meal) => {
          return (
            <li key={meal.id} className={styles.meal}>
              <Meal
                meals
                id={meal.id}
                name={meal.name}
                disc={meal.desc}
                price={meal.price}
              ></Meal>

              <form className={styles.form} onSubmit={submitHandler}>
                <div>
                  <label htmlFor={`amo ${meal.id}`}>Amount</label>
                  <input
                    id={`amo ${meal.id}`}
                    type="number"
                    min="1"
                    step="1"
                    max="5"
                    defaultValue="1"
                    onChange={amountChangehandler}
                    // value={ctx.amount}
                  ></input>
                </div>
                <button onClick={addMealHandler} id={meal.id}>
                  Add
                </button>
              </form>
            </li>
          );
        })}
      </ul>
    </div>
  );
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>loading...</p>;
  }
  // //////////
  return <Card>{content}</Card>;
};

export default Meals;
