import React, { use, useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Coordinates, Visibility } from "../context/contextApi";

function Head() {
  const { visible, setVisible } = useContext(Visibility);
  const { setCoord } = useContext(Coordinates);
  const [locHeading, setLocHeading] = useState("");

  const navLinks = [
    {
      name: "Swiggy Corporate",
      img: "fi-rr-briefcase-blank",
    },
    {
      name: "Search",
      img: " fi-rr-search",
    },
    {
      name: "Offers",
      img: "fi-rr-badge-percent",
    },
    {
      name: "Help",
      img: "fi-ss-life-ring",
    },
    {
      name: "Profile",
      img: "fi-rr-user",
    },
    {
      name: "Cart",
      img: "fi-rr-shopping-cart-add",
    },
  ];
  const [searchLoc, setSearchLoc] = useState([]);

  async function searchLocation(e) {
    if (e == "") return;
    const data = await fetch(
      `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${e}`
    );
    const result = await data.json();
    setSearchLoc(result?.data);
  }

  async function fetchLatAndLong(id) {
    if (id == "") return;
    handleClose()
    const data = await fetch(
      `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`
    );
    const result = await data.json();
    setCoord({
      lat: result.data[0]?.geometry?.location?.lat,
      lng: result.data[0]?.geometry?.location?.lng,
    });
    console.log(result?.data[0]?.formatted_address);
    setLocHeading(result?.data[0]?.formatted_address);
  }

  function handleLocationSearch() {
    setVisible((prev) => !prev);
  }
  function handleClose() {
    setVisible((prev) => !prev);
  }

  return (
    <div className="relative w-full">
      <div className="w-full">
        <div
          onClick={handleClose}
          className={
            "w-full bg-black/50 h-full absolute z-30 " +
            (visible ? "visible" : "invisible")
          }
        ></div>
        <div
          className={
            "bg-white flex flex-col w-[36%] h-full z-40 absolute duration-500 p-10 " +
            (visible ? "left-0" : "-left-[100%]")
          }
        >
          {/* <p
            className="bg-black w-[10%] text-white inline-block p-2"
            onClick={handleClose}
          >
            cut
          </p> */}
          <i onClick={handleClose} className="fi fi-rr-cross cursor-pointer max-w-fit"></i>
          <input
            onChange={(e) => searchLocation(e.target.value)}
            type="search" placeholder="Search for area, street name"
            className="border border-gray-400 shadow-lg text-md font-semibold p-5 focus:outline-none mt-5 focus:shadow-xl"
          />
          <div>
            <ul className="flex flex-col gap-2 mt-5">
              
              {searchLoc.map((data) => ( 
                <li onClick={() => fetchLatAndLong(data.place_id)} className="p-2 font-semibold cursor-pointer border text-sm border-gray-400 text-gray-500">
               <i className="fi fi-rs-marker mr-2"></i>  {data.structured_formatting?.main_text}{" "}
                  <p>{data.structured_formatting?.secondary_text}  </p>
                </li>
              ))}
            </ul>
           
          </div>
        </div>
      </div>

      <div className="w-full sticky z-20 shadow-lg h-20 flex items-center justify-between">
        <div className="flex items-center  justify-between w-[88%] mx-auto gap-8">
          <div className="flex items-center gap-8">
            <Link to={"/"}>
              <svg className="VXJlj hover:scale-110 duration-200" viewBox="0 0 61 61" height="49" width="49">
                <g clipPath="url(#a)">
                  <path
                    fill="#FF5200"
                    d="M.32 30.5c0-12.966 0-19.446 3.498-23.868a16.086 16.086 0 0 1 2.634-2.634C10.868.5 17.354.5 30.32.5s19.446 0 23.868 3.498c.978.774 1.86 1.656 2.634 2.634C60.32 11.048 60.32 17.534 60.32 30.5s0 19.446-3.498 23.868a16.086 16.086 0 0 1-2.634 2.634C49.772 60.5 43.286 60.5 30.32 60.5s-19.446 0-23.868-3.498a16.086 16.086 0 0 1-2.634-2.634C.32 49.952.32 43.466.32 30.5Z"
                  ></path>
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M32.317 24.065v-6.216a.735.735 0 0 0-.732-.732.735.735 0 0 0-.732.732v7.302c0 .414.336.744.744.744h.714c10.374 0 11.454.54 10.806 2.73-.03.108-.066.21-.102.324-.006.024-.012.048-.018.066-2.724 8.214-10.092 18.492-12.27 21.432a.764.764 0 0 1-1.23 0c-1.314-1.776-4.53-6.24-7.464-11.304-.198-.462-.294-1.542 2.964-1.542h3.984c.222 0 .402.18.402.402v3.216c0 .384.282.738.666.768a.73.73 0 0 0 .582-.216.701.701 0 0 0 .216-.516v-4.362a.76.76 0 0 0-.756-.756h-8.052c-1.404 0-2.256-1.2-2.814-2.292-1.752-3.672-3.006-7.296-3.006-10.152 0-7.314 5.832-13.896 13.884-13.896 7.17 0 12.6 5.214 13.704 11.52.006.054.048.294.054.342.288 3.096-7.788 2.742-11.184 2.76a.357.357 0 0 1-.36-.36v.006Z"
                    clipRule="evenodd"
                  ></path>
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M.32.5h60v60h-60z"></path>
                  </clipPath>
                </defs>
              </svg>
            </Link>
            <div onClick={handleClose} className="flex items-center gap-2">
              <h3 className="flex gap-2">
                <span className="font-bold border-b-2 uppercase cursor-pointer text-sm">
                  {" "}
                  Home
                </span>{" "}
                <span className="line-clamp-1 text-sm text-slate-600 font-semibold">
                  {locHeading}
                </span>
              </h3>
              <i className="fi fi-rr-angle-small-down cursor-pointer text-2xl mt-1 text-[#fe5300] "></i>
            </div>
          </div>
          <div className="flex items-center justify-center gap-10">
            {navLinks.map((link, i) => (
              <div
                key={i}
                className="flex items-center cursor-pointer hover:text-[#fe5300] duration-150 font-[600] text-gray-800 justify-center gap-3"
              >
                <i className={`fi ${link.img} text-lg mt-[4px]`}></i>
                <h3>{link.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Head;
