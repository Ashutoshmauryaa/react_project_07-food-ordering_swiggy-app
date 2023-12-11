import React from "react";
import { CDN_URL } from "../utils/constant";

const Banner = (props) => {
  const { bannerData } = props;
  //   console.log(bannerData);

  return (
    <div className="">
      <div className="w-[100px] ">
        <img src={CDN_URL + bannerData.imageId} alt="img" />
      </div>
    </div>
  );
};

export default Banner;
