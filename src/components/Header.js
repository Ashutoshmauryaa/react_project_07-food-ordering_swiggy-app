import { Link } from "react-router-dom";
import logo from "../logo/logo.jpeg";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useContext, useState } from "react";
import {
  CartIcon,
  HomeIcon,
  OfflineSignal,
  OnlineSignal,
  SearchIcon,
} from "../utils/icon";
import { useSelector } from "react-redux";
import { RestaurantContext } from "../utils/RestaurantContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";
const Header = () => {
  const [searchText, setSearchText] = useState("");
  const onlineStatus = useOnlineStatus();

  // subscribing to the store by using selector hook(it will read the cart continuosly)
  const cartItems = useSelector((store) => store.cart.items);

  const { restaurantlist, setfilteredRestaurant, user } =
    useContext(RestaurantContext);
  // console.log(cartItems);
  return (
    <div className="flex justify-between shadow-lg m-1">
      <div className="logo-container">
        <Link to="/">
          <img className="w-32" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="flex items-center">
        <div id="search" className="flex h-10 mx-10">
          <input
            className="border border-slate-400 w-80 px-1 h-10 rounded-lg"
            type="text"
            placeholder="Search for Restaurant"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="rounded-lg w-14 mx-1 h-10 items-center border-slate-400 border bg-slate-100 hover:bg-orange-400 px-4"
            onClick={() => {
              const filteredlist = restaurantlist.filter((restaurant) => {
                return restaurant.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });

              setfilteredRestaurant(filteredlist);
              setSearchText(" ");
            }}
          >
            <SearchIcon />
          </button>
        </div>

        <ul className="flex p-4 m-4 space-x-10">
          <li className="font-bold">
            {onlineStatus ? <OnlineSignal /> : <OfflineSignal />}
          </li>
          <li className="px-4 flex ">
            <Link to="/">
              <HomeIcon />
            </Link>
            <Link to="/">
              <span className="flex mx-2 ">Home</span>
            </Link>
          </li>
          {/* <li className="px-4">
            <Link to="/about">About us</Link>
          </li> */}
          {/* <li className="px-4">
            <Link to="/contact">
              <ProfileIcon />
            </Link>
          </li> */}

          <li className="px-4 flex">
            <Link to="/cart">
              <div className="font-bold cursor-pointer ">
                <CartIcon />
              </div>
              <span className="absolute -m-10 px-12 font-bold hover:text-orange-400">
                {cartItems.length}
              </span>
            </Link>
            <Link to="/cart">
              <span className="flex mx-2 ">Cart</span>
            </Link>
          </li>
          <li className="px-2 -my-1 flex">
            {user ? <UserSidebar /> : <AuthModal />}
            {/* {user === null ? (
              <span className="flex my-1 -mx-2 ">Sign In</span>
            ) : null} */}
          </li>
          {/* <li className="px-4">{user}</li> */}
        </ul>
      </div>
    </div>
  );
};
export default Header;
