import React, { Component, useEffect, useReducer, useState } from "react";

const AuthContext = React.createContext({
  //initial values
  amount: "1",
  totalAmount: "0",
  cartMeals: [],
  totalPrice: "0",
  addMealFN: (item) => {},
  amountChange: (value) => {},
  addMealFromCartHandler: (item) => {},
  clearMeals: () => {},
});

const amountReducer = (state, action) => {
  if (action.type === "AMOUNT") {
    return {
      value: action.val,
      totalAmount: state.totalAmount,
    };
  }
  if (action.type === "TOT") {
    return {
      value: "1",
      totalAmount: +action.tot + +state.totalAmount,
    };
  }
  if (action.type === "TOTADD") {
    return {
      value: "1",
      totalAmount: +state.totalAmount + 1,
    };
  }
  if (action.type === "TOTREMOVE") {
    return {
      value: "1",
      totalAmount: +state.totalAmount - 1,
    };
  }
  if (action.type === "TOTCLEAR") {
    return {
      value: "1",
      totalAmount: "0",
    };
  }

  return { value: "1", totalAmount: "0" };
};

const cartMealsReducer = (state, action) => {
  if (action.type === "MEALS") {
    const existingIndex = state.value.findIndex(
      (item) => item.id === action.va.id
    );
    const existingItem = state.value[existingIndex];
    const item = action.va;
    const itemPrice = item.price * item.amount;
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: +existingItem.amount + +action.va.amount,
      };
      const updatedArray = [...state.value];
      updatedArray[existingIndex] = updatedItem;
      return {
        value: updatedArray,
        totalPrice: +itemPrice + +state.totalPrice,
      };
    }
    return {
      value: [...state.value, item],
      totalPrice: +itemPrice + +state.totalPrice,
    };
  }
  if (action.type === "MEALSADD") {
    const [item] = state.value.filter((ele) => {
      return ele.id === action.va.id;
    });

    const updatedItem = { ...item, amount: +item.amount + 1 };
    const updatedMeals = [...state.value];
    updatedMeals[updatedMeals.indexOf(item)] = updatedItem;

    return {
      value: updatedMeals,
      totalPrice: +state.totalPrice + +item.price,
    };
  }
  if (action.type === "MEALREMOVE") {
    const [item] = state.value.filter((ele) => {
      return ele.id === action.va.id;
    });
    let updatedMeals;
    if (item.amount === 1) {
      updatedMeals = state.value.filter((ele) => {
        return ele !== item;
      });
    } else {
      const updatedItem = { ...item, amount: +item.amount - 1 };
      updatedMeals = [...state.value];
      updatedMeals[updatedMeals.indexOf(item)] = updatedItem;
    }

    return {
      value: updatedMeals,
      totalPrice: +state.totalPrice - +item.price,
    };
  }
  if (action.type === "MEALSCLEAR") {
    return { value: [], totalPrice: "0" };
  }
  return { value: [], totalPrice: "0" };
};

export const AuthContextProvider = (props) => {
  //functions

  const [amountState, dispatshAmount] = useReducer(amountReducer, {
    value: "1",
    totalAmount: "0",
  });
  const [cartMealsState, dispatshCartMeals] = useReducer(cartMealsReducer, {
    value: [],
    totalPrice: "0",
  });
  const addMealFN = (item) => {
    dispatshCartMeals({ type: "MEALS", va: item });
    dispatshAmount({ type: "TOT", tot: +amountState.value });
  };
  const addMealFromCartHandler = (item) => {
    dispatshCartMeals({ type: "MEALSADD", va: item });
    dispatshAmount({ type: "TOTADD" });
  };
  const amountChange = (value) => {
    dispatshAmount({ type: "AMOUNT", val: value });
  };

  const removeMealFN = (item) => {
    dispatshCartMeals({ type: "MEALREMOVE", va: item });
    dispatshAmount({ type: "TOTREMOVE" });
  };

  const clearMeals = () => {
    dispatshCartMeals({ type: "MEALSCLEAR" });
    dispatshAmount({ type: "TOTCLEAR" });
  };
  return (
    <AuthContext.Provider
      value={{
        amount: amountState.value,
        totalA: amountState.totalAmount,
        cartMeals: cartMealsState.value,
        totalP: cartMealsState.totalPrice,
        onAddMeal: addMealFN,
        onAddMealFromcart: addMealFromCartHandler,
        onAmountChange: amountChange,
        onRemoveMeal: removeMealFN,
        onClearMeals: clearMeals,
        // onAddClass: classBump,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
