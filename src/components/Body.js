import { useContext, useEffect, useState } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { RestaurantContext } from "../utils/RestaurantContext";
import Banner from "./Banner";
import Widget from "./Widget";

const Body = () => {
  // const [hide, setHide] = useState(false);

  useEffect(() => {
    document.getElementById("search").style.visibility = "visible";
  }, []);

  const PromotedRestaurant = withPromotedLabel(RestaurantCard); // Higher order component
  const {
    restaurantlist,
    setrestaurantList,
    filteredRestaurant,
    setfilteredRestaurant,
    banner,
    widget,
  } = useContext(RestaurantContext);

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return <h1>Please check your internet connection</h1>;
  } else {
  }

  return restaurantlist.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body ">
      <div className="m-2 p-2 overflow-x-auto ...">
        <h1 className=" p-1 mx-5 font-bold font-40 text-2xl">
          Best offers for you
        </h1>
        <div className="flex w-11/12 items-center  hover:overflow-x-auto ...">
          {widget.map((widg) => (
            <Widget key={widg.id} widgetData={widg} />
          ))}
        </div>
      </div>
      <div className="m-2 p-2 w-11/12 items-center">
        <h1 className="m-1 p-1 mx-4 font-bold font-30 text-2xl">
          What's on your mind ?
        </h1>
        <div className="flex border-b-2 border-gray-200 overflow-x-auto ... hover:overflow-x-auto ...">
          {banner.map((bann) => (
            <Banner key={bann.id} bannerData={bann} />
          ))}
        </div>
        {/* <div className="m-4 p-4 items-center">
          <button
            className="px-4  bg-gray-100 rounded-lg"
            onClick={() => {
              const filteredlist = filteredRestaurant.filter(
                (res) => res.info.avgRating > 4
              );
              setfilteredRestaurant(filteredlist);
            }}
          >
            Top Rated Restaurant
          </button>
        </div> */}
      </div>

      <div className="flex flex-wrap items-right mx-7">
        {filteredRestaurant.length === 0 ? (
          <h1 className="font-bold text-4xl text-orange-400 m-5 p-5">
            Sorry, The Item Is Not Available At This Moment!! 🥲
          </h1>
        ) : (
          filteredRestaurant.map((restaurant) => (
            <Link
              className="link"
              key={restaurant?.info?.id}
              to={"restaurant/" + restaurant?.info?.id}
            >
              {restaurant?.info?.promoted ? (
                <PromotedRestaurant resdata={restaurant} />
              ) : (
                <div className="flex flex-wrap">
                  <RestaurantCard resdata={restaurant} />
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
export default Body;
