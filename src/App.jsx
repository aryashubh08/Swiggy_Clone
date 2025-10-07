import React, { useState } from "react";
import Head from "./components/Head";
import Body from "./components/Body";
import { Route, Routes } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
import { Coordinates, Visibility } from "./context/contextApi";

function App() {
  const [visible, setVisible] = useState(false);
  const [coord, setCoord] = useState({ lat: 28.4885651, lng: 77.0109375 });

  return (
    <Coordinates.Provider value={{ coord, setCoord }}>
      <Visibility.Provider value={{ visible, setVisible }}>
        <div className={visible ? "max-h-screen overflow-hidden" : ""}>
          <Routes>
            <Route path="/" element={<Head />}>
              <Route path="/" element={<Body />} />
              <Route path="/restaurantMenu/:id" element={<RestaurantMenu />} />
            </Route>
          </Routes>
        </div>
      </Visibility.Provider>
    </Coordinates.Provider>
  );
}

export default App;
