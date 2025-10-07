import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Discount from "./Discount";
import MenuCard from "./MenuCard";
import { Coordinates } from "../context/contextApi";

function RestaurantMenu() {
  const [menuData, setMenuData] = useState([]);
  const [resInfo, setResInfo] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const { id } = useParams();
  const {
    coord: { lat, lng }, } = useContext(Coordinates);
  // const [currIndex, setCurrIndex] = useState(0);
  // console.log(resInfo);

  const [value, setValue] = useState(0);

  function handlePrev() {
    value <= 0 ? "" : setValue((prev) => prev - 36.35);
    // console.log(value);
  }
  function handleNext() {
    value >= 109 ? "" : setValue((prev) => prev + 36.35);
    // console.log(value);
  }

  var mainId = id.split("-").at(-1).replace("rest", "");

  async function fetchMenu() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`
    );
    const res = await data.json();
    setResInfo(res?.data?.cards[2]?.card?.card?.info);
    setDiscountData(
      res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
    let filterMenu =
      (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (item) => item?.card?.card?.itemCards || item?.card?.card?.categories
      );
    setMenuData(filterMenu);
    console.log(
      (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (item) => item?.card?.card?.itemCards
      )
    );
  }
  // console.log(discountData);

  useEffect(() => {
    fetchMenu();
  }, []);

  // function toggleFunction(i) {
  //   console.log(i);
  //   setCurrIndex(i === currIndex ? null : i);
  // }

  return (
    <div className="w-full ">
      <div className="w-[60%]  mx-auto pt-8 overflow-hidden">
        <p className="text-[10px] font-semibold text-gray-400">
          <Link>
            <span className="hover:text-slate-700 hover:cursor-pointer">
              Home
            </span>{" "}
          </Link>
          /{" "}
          <Link>
            <span className="hover:text-slate-700 hover:cursor-pointer">
              {resInfo.city}
            </span>
          </Link>{" "}
          / <span className="text-black">{resInfo.name}</span>
        </p>
        <h1 className="mt-5 text-[28px] font-bold">{resInfo.name}</h1>
        <div className="w-full mt-5 max-h-content p-4 bg-gradient-to-t from-slate-200/70  h-[212px] rounded-3xl">
          <div className="w-full border border-slate-200/70 rounded-3xl h-full p-4 bg-white">
            {/* first line */}
            <div className="flex items-center gap-2 font-bold">
              <i className="fi fi-ss-circle-star mt-1 text-green-600 text-lg"></i>
              <span>
                {resInfo.avgRating} ({resInfo.totalRatingsString})
              </span>

              <span className=" rounded-full h-[4px] bg-slate-400 w-[4px] inline-block"></span>
              <span>{resInfo.costForTwoMessage}</span>
            </div>
            {/* second div */}
            <div className="flex items-center gap-2 font-bold">
              <span className="underline text-[#FE5300] my-1 text-[14px]">
                {resInfo?.cuisines?.join(",")}
              </span>
            </div>
            {/* third div */}
            <div className="flex gap-3 justify-between">
              <div className="justify-center items-center  flex flex-col">
                <span className="w-[6px] h-[6px] rounded-full bg-slate-400"></span>
                <span className="h-5 bg-slate-400 w-[1px]"></span>
                <span className="w-[6px] h-[6px] rounded-full bg-slate-400"></span>
              </div>
              <div className="w-full flex flex-col ">
                <div className="flex gap-2">
                  <p className="text-[14px] font-bold">Outlet</p>
                  <p className="text-[13px] text-slate-500 font-semibold">
                    {resInfo.areaName}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="text-[13px]  font-bold">
                    {resInfo?.sla?.slaString}
                  </p>
                </div>
              </div>
            </div>
            <hr className="mt-5 border-slate-300 " />
            <div className="w-full flex items-center gap-2 bg-gradient-to-r from-white p-[3px] rounded-b-2xl to-[#fe5300]/5  mt-2 mb-2">
              <img
                className="w-10 "
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_86,h_30/v1634558776/swiggy_one/OneLogo_3x.png"
                alt=""
              />
              <p className="text-[#fe4300] font-bold text-[14px]">
                Free delivery on orders above ₹99
              </p>
            </div>
          </div>
        </div>

        {/* deals slider */}

        <div className="flex justify-between mt-5">
          <h2 className="text-[21px] text-[#171B20] font-[700]">
            Deals for you
          </h2>
          <div className="flex gap-3">
            <div
              onClick={handlePrev}
              className={
                ` h-8 w-8 rounded-full cursor-pointer bg-gray-200 flex items-center justify-center ` +
                +(value <= 0 ? "bg-gray-50" : "bg-gray-200")
              }
            >
              <i
                className={
                  `fi fi-rr-arrow-small-left mt-1 ` +
                  (value <= 0 ? "text-gray-300" : "text-gray-600")
                }
              ></i>
            </div>
            <div
              onClick={handleNext}
              className={
                ` h-8 w-8 rounded-full cursor-pointer bg-gray-200 flex items-center justify-center ` +
                (value >= 109 ? "bg-gray-50" : "bg-gray-200")
              }
            >
              <i
                className={
                  `fi fi-rr-arrow-small-right mt-1 ` +
                  (value >= 106 ? "text-gray-300" : "text-gray-600")
                }
              ></i>
            </div>
          </div>
        </div>
        <div
          style={{ translate: `-${value}%` }}
          className="flex  gap-4 duration-300 mt-5 "
        >
          {" "}
          {(discountData || []).map((data, idx) => (
            <Discount data={data} />
          ))}
        </div>
        <h2 className="text-center mt-5">MENU</h2>
        <div className="w-full mt-5 relative">
          <div className="w-full text-center  p-2 font-bold text-[16px] bg-slate-200/70 rounded-xl text-gray-700 ">
            Search for dishes
          </div>
          <i className="fi fi-rr-search absolute top-3 font-semibold text-gray-700 right-4 "></i>
        </div>
        <div>
          {menuData.map(({ card: { card } }, i) => (
            <MenuCard card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenu;
