import React from "react";

function Discount({
  data: {
    info: { header, offerLogo, couponCode },
  },
}) {
  return (
    <div className="flex items-center gap-3 border rounded-2xl p-2 border-slate-300 min-w-[330px] h-[76px]">
      <img
        className="bg-cover w-12 h-12"
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" +
          offerLogo
        }
        alt=""
      />

      <div className="">
        <h2 className="font-extrabold">{header}</h2>
        <p className="text-[14px] text-slate-400 font-bold">{couponCode}</p>
      </div>
    </div>
  );
}

export default Discount;
