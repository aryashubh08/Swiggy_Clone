import React, { useState } from "react";
import MenuDetails from "./MenuDetails";

function MenuCard({ card }) {
  let hello = false;

  if (card["@type"]) {
    hello = true;
  }
  const [isOpen, setIsOpen] = useState(hello);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  if (card?.itemCards) {
    const { title, itemCards } = card;
    return (
      <>
        <div className="mt-3">
          <div className="flex justify-between items-center">
            <h1 className={"font-bold text-" + (card["@type"] ? "17px" : "sm")}>
              {title} ({itemCards.length})
            </h1>
            <i
              className={
                "fi  text-xl fi-rr-angle-small-" + (isOpen ? "up" : "down")
              }
              onClick={toggle}
            ></i>
          </div>
          {isOpen && <MenuDetails card={itemCards} />}
        </div>
        <hr
          className={
            "my-3 border-slate-200 border-" +
            (card["@type"] ? "[10px]" : "[4px]")
          }
        />
      </>
    );
  } else {
    const { title, categories } = card;
    return (
      <div>
        <h1 className="font-bold text-[17px]">{card.title}</h1>
        {categories.map((data) => (
          <MenuCard card={data} />
        ))}
      </div>
    );
  }
}

export default MenuCard;
