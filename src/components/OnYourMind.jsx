import React, { useEffect, useState } from "react";

function OnYourMind({ data }) {
  const [value, setValue] = useState(0);

  function handlePrev() {
    value <= 0 ? "" : setValue((prev) => prev - 36);
    console.log(value);
  }
  function handleNext() {
    value >= 157 ? "" : setValue((prev) => prev + 36);
    console.log(value);
  }
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-[21px] text-[#171B20] font-[700]">
          What's on your mind?
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
              (value >= 151.2 ? "bg-gray-50" : "bg-gray-200")
            }
          >
            <i
              className={
                `fi fi-rr-arrow-small-right mt-1 ` +
                (value >= 151.2 ? "text-gray-300" : "text-gray-600")
              }
            ></i>
          </div>
        </div>
      </div>
      <div
        style={{ translate: `-${value}%` }}
        className="flex  gap-2 duration-300"
      >
        {" "}
        {(data || []).map((item, idx) => (
          <img
            key={idx}
            className="w-36 cursor-pointer"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
            alt=""
          />
        ))}
      </div>
    </>
  );
}

export default OnYourMind;
