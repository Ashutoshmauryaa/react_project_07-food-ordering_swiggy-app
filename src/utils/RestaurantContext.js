import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
// import App from "../App";

export const RestaurantContext = createContext();

const Restaurant = ({ children }) => {
  const [restaurantlist, setrestaurantList] = useState([]);
  const [filteredRestaurant, setfilteredRestaurant] = useState([]);
  const [banner, setfilteredBanner] = useState([]);
  const [widget, setWidget] = useState([]);
  const [user, setUser] = useState(null);
  const [Developed, setDeveloped] = useState({
    name: "Ashutosh Kumar",
    email: "ashutosh.mauryavanshi96@gmail.com",
    contact: "+91-8750524716",
  });

  useEffect(() => {
    fetchdata();
  }, []);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const fetchdata = async () => {
    const data = await fetch(
      // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6139391&lng=77.2090212&collection=83645&tags=layout_CCS_NorthIndian&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
      // `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location?.latitude}&lng=${location?.longitude}`
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5353183&lng=77.0879142"
    );

    const json = await data.json();
    console.log(json);

    setWidget(
      json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info?.slice(
        0,
        3
      )
    );
    setfilteredBanner(
      json?.data?.cards.slice(1)[0]?.card?.card?.gridElements?.infoWithStyle
        ?.info
    );
    setrestaurantList(
      json?.data?.cards.slice(2)[0]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
      // ||
      // json?.data?.cards.slice(4)[0]?.card?.card?.gridElements?.infoWithStyle
      //   ?.restaurants
    );
    setfilteredRestaurant(
      json?.data?.cards.slice(2)[0]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
      // ||
      // json?.data?.cards.slice(4)[0]?.card?.card?.gridElements?.infoWithStyle
      //   ?.restaurants
    );
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurantlist,
        setrestaurantList,
        filteredRestaurant,
        setfilteredRestaurant,
        banner,
        widget,
        user,
        Developed,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
export default Restaurant;
