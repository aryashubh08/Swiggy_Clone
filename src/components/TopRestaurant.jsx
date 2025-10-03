import React, { useEffect, useState } from "react";
import Card from "./Card";

function TopRestaurant({ data, heading }) {
  const [value, setValue] = useState(0);
  // console.log(data);

  function handlePrev() {
    value <= 0 ? "" : setValue((prev) => prev - 42.2);
    console.log(value);
  }
  function handleNext() {
    value >= 442 ? "" : setValue((prev) => prev + 42.2);
    console.log(value);
  }

  return (
    <div className="mt-10 w-full">
      <div className="flex justify-between mt-5">
        <h1 className="font-bold text-2xl">{heading?.header?.title}</h1>
        <div className="flex gap-3">
          <div
            onClick={handlePrev}
            className={
              ` cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` +
              (value <= 0 ? "bg-gray-100" : "bg-gray-200")
            }
          >
            <i
              className={
                `fi text-2xl mt-1 fi-rr-arrow-small-left ` +
                (value <= 0 ? "text-gray-300" : "text-gray-800")
              }
            ></i>
          </div>
          <div
            onClick={handleNext}
            className={
              ` cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` +
              (value >= 442.1 ? "bg-gray-100" : "bg-gray-200")
            }
          >
            <i
              className={
                `fi text-2xl mt-1 fi-rr-arrow-small-right ` +
                (value >= 442.1 ? "text-gray-300" : "text-gray-800")
              }
            ></i>
          </div>
        </div>
      </div>

      <div
        className={`flex mt-4 gap-5 w-full duration-300`}
        style={{ translate: `-${value}%` }}
      >
        {data.map(({ info, cta: { link } }) => (
          <div className="hover:scale-95 duration-300" key={info.id}>
            <Card {...info} link={link} />
          </div>
        ))}
      </div>

      <hr className="border mt-10 text-gray-300" />
    </div>
  );
}

export default TopRestaurant;
