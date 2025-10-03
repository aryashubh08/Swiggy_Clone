import React from "react";
import Head from "./components/Head";
import Body from "./components/Body";
import { Route, Routes } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Head />}>
          <Route path="/" element={<Body />} />
          <Route path="/restaurantMenu/:id" element={<RestaurantMenu />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
