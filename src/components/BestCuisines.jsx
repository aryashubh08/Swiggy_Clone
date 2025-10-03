import React, { useEffect, useState } from "react";

// Define the number of items to show initially
const INITIAL_DISPLAY_COUNT = 11;

function BestCuisines() {
  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [heading, setHeading] = useState("Best Cuisines Near Me");

  async function fetchData() {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.9690247&lng=72.8205292&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const result = await response.json();

    const cuisinesCard = result?.data?.cards.find(
      (card) => card?.card?.card?.title === "Explore Every Type of Cuisine"
    );

    const placesData = result?.data?.cards[7]?.card?.card?.brands || [];

    const sectionHeading = result?.data?.cards[7]?.card?.card?.title;
    if (sectionHeading) {
      setHeading(sectionHeading);
    }

    setData(placesData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const displayData = showAll ? data : data.slice(0, INITIAL_DISPLAY_COUNT);

  const isShowMoreVisible = data.length > INITIAL_DISPLAY_COUNT && !showAll;

  return (
    <div className="mt-5">
      <div>
        <h2 className="text-[21px] text-[#171B20] font-[700]">{heading}</h2>
        <div className="grid grid-cols-4 mt-8 gap-5 items-center justify-between">
          {(displayData || []).map((places, i) => (
            <div
              key={i}
              className="h-18 w-[240px] leading-[2vw] font-semibold text-gray-600 text-center px-8 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 duration-150 cursor-pointer"
            >
              {places.text}
            </div>
          ))}

          {/* RENDER THE SHOW MORE BUTTON BOX */}
          {isShowMoreVisible && (
            <div
              onClick={() => setShowAll(true)}
              className="h-18 w-[240px] leading-[2vw] font-semibold text-center px-8 py-2 border border-gray-200 rounded-xl bg-gray-50 text-[#F26F44] cursor-pointer hover:bg-gray-100 duration-150 flex items-center justify-center"
            >
              Show More{" "}
              <span className="ml-2 mt-1">
                <i className="fi fi-rr-angle-small-down"></i>
              </span>
            </div>
          )}

          {/* Optional: Add a 'Show Less' button if needed */}
          {showAll && (
            <div
              onClick={() => setShowAll(false)}
              className="h-18 w-[240px] leading-[2vw] font-semibold text-center px-8 py-2 border border-gray-200 rounded-xl bg-gray-50 text-red-600 cursor-pointer hover:bg-gray-100 duration-150 flex items-center justify-center"
            >
              Show Less{" "}
              <span className="ml-2 mt-1">
                <i className="fi fi-rr-angle-small-up"></i>
              </span>
            </div>
          )}
        </div>
      </div>
      <hr className="border mt-8 text-gray-300" />
    </div>
  );
}

export default BestCuisines;
