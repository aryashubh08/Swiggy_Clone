import React, { useState } from "react";
import Head from "./components/Head";
import Body from "./components/Body";
import { Route, Routes } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
import { CartContext, Coordinates, Visibility } from "./context/contextApi";
import Cart from "./components/Cart";

function App() {
  const [visible, setVisible] = useState(false);
  const [coord, setCoord] = useState({ lat: 28.4885651, lng: 77.0109375 });
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Coordinates.Provider value={{ coord, setCoord }}>
        <Visibility.Provider value={{ visible, setVisible }}>
          <div className={visible ? "max-h-screen overflow-hidden" : ""}>
            <Routes>
              <Route path="/" element={<Head />}>
                <Route path="/" element={<Body />} />
                <Route
                  path="/restaurantMenu/:id"
                  element={<RestaurantMenu />}
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<h1>Coming Soon...</h1>} />
              </Route>
            </Routes>
          </div>
        </Visibility.Provider>
      </Coordinates.Provider>
    </CartContext.Provider>
  );
}

export default App;
