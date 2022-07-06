import logo from "./logo.svg";
import "./App.css";

import Header from "./components/Header";
import Landing from "./components/Landing";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import { useState } from "react";

function App() {
  const [openCart, setOpenCart] = useState(false);
  const openCartHandler = () => {
    setOpenCart(true);
  };
  const closeCartHandler = () => {
    setOpenCart(false);
  };

  return (
    <div className="App">
      <Header onOpen={openCartHandler} />
      <Landing />
      <Meals />
      {openCart && <Cart onClose={closeCartHandler} />}
    </div>
  );
}

export default App;
