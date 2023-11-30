import React, { useState } from "react";
import ItemList from "./ItemList";
import { ChevronUp, ChevronDown } from "../utils/icon";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const [show, setShow] = useState(false);
  // it is controlled component beacuse it is controlled by parent (Restaurant menu i.e hide show the category)
  const handleClick = () => {
    // setShowIndex();
    if (show) setShow(false);
    else setShow(true);
  };

  return (
    <div className="">
      {/* Header Item */}
      <div className=" w-8/12 mx-auto my-4 p-4 shadow-lg">
        <div className="flex justify-between" onClick={handleClick}>
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span className="cursor-pointer">
            {show === false ? <ChevronDown /> : <ChevronUp />}
          </span>
        </div>
        {/* item Body */}
        {show && <ItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
