import React, { useEffect, useState } from "react";
import Card from "./Card";

function OnlineFood({ data, title }) {
  return (
    <div className="my-7">
      <h2 className="text-[21px] text-[#171B20] font-[700] my-5">
        {title?.title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {" "}
        {data.map(({ info, cta: { link } }) => (
          <div key={info.id} className="hover:scale-95 duration-200 relative  ">
            <Card {...info} link={link} />
          </div>
        ))}
      </div>
      <hr className="border mt-8 text-gray-300" />
    </div>
  );
}

export default OnlineFood;
