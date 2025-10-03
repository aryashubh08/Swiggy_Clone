import React, { useEffect, useState } from "react";
import OnYourMind from "./OnYourMind";
import TopRestaurant from "./TopRestaurant";
import BestPlaces from "./BestPlaces";
import BestCuisines from "./BestCuisines";
import OnlineFood from "./OnlineFood";
import { Outlet } from "react-router-dom";

function Body() {
  const [topRestaurantData, setTopRestaurantData] = useState([]);
  const [heading, setHeading] = useState("");
  //Online food
  const [onlineFood, setOnlineFood] = useState([]);
  const [onlineTitle, setOnlineTitle] = useState("");
  //what is on your mind
  const [onYourMindData, setOnYourMindData] = useState([]);

  async function fetchData() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4885651&lng=77.0109375&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const result = await data.json();
    // console.log(result);
    setTopRestaurantData(
      result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setOnlineFood(
      result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setOnYourMindData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);

    setOnlineTitle(result?.data?.cards[2]?.card?.card);
    setHeading(result?.data?.cards[1]?.card?.card);
  }

  useEffect(() => {
    fetchData();
  }, []);

  https: return (
    <div className="w-full">
      <div className="w-[80%] mx-auto  mt-3 overflow-hidden">
        <OnYourMind data={onYourMindData} />
        <hr className="border mt-12 text-gray-300" />
        <TopRestaurant data={topRestaurantData} heading={heading} />
        <OnlineFood title={onlineTitle} data={onlineFood} />
        <BestPlaces />
        <BestCuisines />
      </div>
      <Outlet />
    </div>
  );
}

export default Body;
