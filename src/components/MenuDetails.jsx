import React, { useState } from "react";

let veg =
  "https://imgs.search.brave.com/QeV3zw9-5SUPp-T6MLMYZ2toWALMcghytwXlj7EY4Sk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2IyL1ZlZ19zeW1i/b2wuc3Zn";
let nonVeg =
  "https://imgs.search.brave.com/g7CQZHrp-ZVk0u_Vb9kAVOm9fYKZFYgPM2rN_6lnDCI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5na2V5LmNvbS9w/bmcvZnVsbC8yNDUt/MjQ1OTA3MV9ub24t/dmVnLWljb24tbm9u/LXZlZy1zeW1ib2wt/cG5nLnBuZw";

function MenuDetails({ card }) {
  // console.log(card);
  return (
    <div className="m-3">
      {card.map(
        ({
          card: {
            info: {
              name,
              price,
              defaultPrice,
              imageId,
              description = "",
              itemAttribute: { vegClassifier },
              ratings: {
                aggregatedRating: { rating, ratingCount },
              },
            },
          },
        }) => {
          const [isMore, setIsMore] = useState(false);
          let trimDescription = description.substring(0, 130) + "...";
          return (
            <>
              <div className=" w-full my-5 flex justify-between">
                <div className="w-[70%] ">
                  <img
                    className="w-[18px]"
                    src={vegClassifier === "VEG" ? veg : nonVeg}
                    alt=""
                  />
                  <h1 className="text-[17px] font-bold">{name}</h1>
                  <p className="font-semibold">
                    ₹{price / 100 || defaultPrice / 100}
                  </p>
                  <p className="flex items-center">
                    {rating ? <i className="fi fi-ss-star mt-1"></i> : ""}
                    <span>
                      {rating ? rating : ""} {ratingCount ? ratingCount : ""}
                    </span>
                  </p>
                  {description.length > 130 ? (
                    <div>
                      <span className="">
                        {isMore ? description : trimDescription}
                      </span>

                      <button
                        className="font-semibold cursor-pointer"
                        onClick={() => setIsMore(!isMore)}
                      >
                        {isMore ? "less" : "more"}
                      </button>
                    </div>
                  ) : (
                    <span className="">{description}</span>
                  )}
                </div>
                <div className="w-[20%] relative">
                  <img
                    className="h-[150px] w-[200px] object-cover rounded-2xl"
                    src={
                      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                      imageId
                    }
                    alt=""
                  />
                  <button className="bg-white text-green-500 font-bold border border-slate-200 shadow cursor-pointer px-10 rounded-lg py-2 absolute -bottom-3 left-5">
                    ADD
                  </button>
                </div>
              </div>
              <hr className="my-8 border-slate-200" />
            </>
          );
        }
      )}
    </div>
  );
}

export default MenuDetails;
