import React, { useContext } from "react";
import { CartContext } from "../context/contextApi";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  console.log(cart);
  return (
    <div className="w-full ">
      <div className="w-[50%]  mx-auto">
        {cart.map((data) => (
          <div className="flex justify-between my-5 p-2">
            <h2>{data?.info?.name}</h2>
            <img
              className="h-[150px] w-[200px] object-cover rounded-2xl"
              src={
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                data?.info?.imageId
              }
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
