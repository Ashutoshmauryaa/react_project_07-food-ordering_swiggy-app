import React from "react";
import { CDN_URL } from "../utils/constant";

const Widget = (props) => {
  const { widgetData } = props;
  // console.log(widgetData);
  return (
    <div className="">
      <div className="m-2 p-2 ">
        <img src={CDN_URL + widgetData.imageId} alt="img" />
      </div>
    </div>
  );
};

export default Widget;
