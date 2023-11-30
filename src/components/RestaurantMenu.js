import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useEffect, useState } from "react";
import { CDN_URL } from "../utils/constant";
import sorry from "../logo/sorry.jpeg";
import { RatingIcon, RupeeIcon, TimeIcon } from "../utils/icon";
import offerIcon from "../logo/OfferIconCart.webp";
const RestaurantMenu = () => {
  const { resId } = useParams();
  const restaurantInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  // console.log("---" + restaurantInfo);

  useEffect(() => {
    document.getElementById("search").style.visibility = "hidden";
  }, []);
  if (restaurantInfo === null) return <Shimmer />;

  const {
    name,
    cuisines,
    costForTwoMessage,
    cloudinaryImageId,
    avgRating,
    city,
    totalRatingsString,
    locality,
    aggregatedDiscountInfo,
  } = restaurantInfo?.cards[0]?.card?.card?.info;
  console.log(restaurantInfo?.cards[0]?.card?.card?.info);
  const categories =
    restaurantInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  // console.log(categories);
  return (
    <div className="items-center ">
      <div className="items-center mx-auto my-4 p-4 w-8/12 border-b-2 border-gray-200 flex justify-between">
        <div>
          <h1 className="font-bold text-lg  ">{name}</h1>
          <p className="font-thin font-extralight">{cuisines.join(" , ")}</p>
          <p className="font-thin font-extralight">
            {locality}, {city}
          </p>
          <div className="flex  my-2">
            <span className="mx-1 my-0.5">
              <RatingIcon />
            </span>
            <span className="text-md text-green-400">
              {avgRating} | {totalRatingsString}
            </span>
          </div>
          <p className="font-thin text-lg">₹45 Delivery fee will apply</p>
        </div>
        <div className="w-2/12 p-2">
          {cloudinaryImageId ? (
            <img
              className="rounded-lg"
              src={CDN_URL + cloudinaryImageId}
              alt="logo"
            />
          ) : (
            <img className="rounded-lg" src={sorry} alt="sorry" />
          )}
        </div>
      </div>
      <div className=" flex mx-auto my-2 p-2 w-8/12  font-bold">
        <TimeIcon />
        <span className="px-1">26 MINS</span>
        <span className="flex mx-4 px-4">
          <RupeeIcon />
          {costForTwoMessage}
        </span>
      </div>
      <div className="w-8/12 mx-auto my-2 flex">
        {aggregatedDiscountInfo.descriptionList.map((item, index) => (
          <div
            className="flex border p-4 m-2 bg-slate-50  border-gray-100 rounded-lg border-b-gray-200 font-serif"
            key={index}
          >
            <img src={offerIcon} alt="icon" className="mx-2" /> {item.meta}
          </div>
        ))}
      </div>
      <div className="">
        {categories.map((category, index) => (
          <RestaurantCategory //controlled component passing the props from parent to children
            key={category?.card?.card.title}
            data={category?.card?.card}
            showItems={false}
            // setShowIndex={() => setShowIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
export default RestaurantMenu;
