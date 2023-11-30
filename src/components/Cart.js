import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sorry from "../logo/sorry.jpeg";
import { addItem, clearCart, removeItem } from "../Redux/cartSlice";
import { CDN_URL } from "../utils/constant";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { RestaurantContext } from "../utils/RestaurantContext";

const Cart = () => {
  const [newCartItems, setNewCartItem] = useState([]);

  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const { user } = useContext(RestaurantContext);

  useEffect(() => {
    let uniqueCards = 0;
    if (cartItems.length > 0) {
      uniqueCards = [...new Set(cartItems)];
    }
    setNewCartItem(uniqueCards);
    console.log(newCartItems);
    document.getElementById("search").style.visibility = "hidden";
    // document.getElementById("searchbutton").style.visibility = "hidden";
  }, [addItem, removeItem]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };
  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };
  const showToast = (a) => {
    setTimeout(() => {
      toast.dismiss(a);
      dispatch(clearCart());
    }, 3000);
    setTimeout(() => {
      toast.success("Your order has been placed.Thank You!!");
    }, 3000);
  };
  const handlePlaceOrder = () => {
    if (user === null) {
      toast.error("To place your order now, Kindly log in to your account", {
        position: "top-center",
      });
    } else {
      let a = toast.loading("Placing Order");
      showToast(a);
    }
  };

  let totalAmount = 0;
  cartItems.map((item) => {
    return item?.card?.info?.price
      ? (totalAmount = totalAmount + item?.card?.info?.price / 100).toFixed(2)
      : (totalAmount =
          totalAmount + item?.card?.info?.defaultPrice / 100).toFixed(2);
  });
  const ToPay = totalAmount + 45 + 57;
  return (
    <div className="bg-slate-200">
      <div className="text-center m-0 p-4 ">
        <h1 className="font-bold text-2xl text-orange-400">
          CART-({cartItems.length})
        </h1>
        {/* <button
          className="p-2 m-2 rounded-lg bg-black text-white"
          onClick={handleClearCart}
        >
          Clear Cart
        </button> */}
      </div>
      <div className="">
        {cartItems.length === 0 && (
          <div className="items-center m-12 p-12 mx-20 ">
            <p className="mx-20 font-bold text-3xl text-green-500 ">
              Your Cart is Empty. Go to
              <Link
                to="/"
                className="cursor-pointer underline text-orange-500 mx-2"
              >
                Home
              </Link>
              page to View more Restaurant
            </p>
          </div>
        )}
      </div>
      <div className="flex ">
        <div className="w-6/12 justify-items-start ms-8 ">
          <div className="bg-white ">
            {cartItems.length !== 0 &&
              newCartItems.map((item) => {
                let count = cartItems.filter((c) => {
                  return c.card.info.id === item.card.info.id;
                }).length;

                return count === 0 ? null : (
                  <div
                    key={item.card?.info?.id}
                    className="p-2 m-2 border-b-2 border-gray-200 text-left flex justify-between"
                  >
                    <div className="w-9/12">
                      <div className="py-2">
                        <span className="font-medium">
                          {item.card?.info?.name}
                        </span>
                        <span>
                          {" "}
                          - ₹
                          {item.card?.info?.price
                            ? item.card?.info?.price / 100
                            : item.card?.info?.defaultPrice / 100}
                        </span>
                      </div>
                    </div>
                    <div className="w-3/12 p-4 h-auto">
                      <div className="absolute my-[5rem] mx-4 bg-white text-gray-600 font-bold border border-gray-100 rounded-md shadow-md">
                        <button
                          className="mx-2 px-2 text-lg "
                          onClick={() => handleRemoveItem(item.card.info)}
                        >
                          -
                        </button>
                        <span className="text-green-600">
                          {
                            cartItems.filter(
                              (obj) => obj.card.info.id === item.card.info.id
                            ).length
                          }
                        </span>
                        <button
                          className="mx-2 px-2 text-lg  text-green-600 "
                          onClick={() => handleAddItem(item)}
                        >
                          +
                        </button>
                      </div>
                      <div className="w-15">
                        {item.card?.info?.imageId ? (
                          <img
                            className="rounded-lg"
                            src={CDN_URL + item.card?.info?.imageId}
                            alt="logo"
                          />
                        ) : (
                          <img className="rounded-lg" src={sorry} alt="sorry" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {cartItems.length !== 0 && (
          <div className="bg-white w-6/12 m-2 me-12 p-2 ">
            <div className="border border-slate-400 m-4 p-4 flex bg-white">
              <div>
                <input type="checkbox" id="checkbox" className="" />
              </div>
              <div className="mx-2">
                <p className="font-semibold text-bg-">
                  Opt in for No-contact Delivery
                </p>
                <p className="text-slate-500">
                  Unwell, or avoiding contact? Please select no-contact
                  delivery. Partner will safely place the order outside your
                  door (not for COD)
                </p>
              </div>
            </div>

            <div className="my-2 m-2 p-2">
              <div className="border-b-2 p-2 m-3 -mx-1">
                <h2 className="font-bold">Bill Details</h2>
              </div>
              <div className="flex items-center justify-between m-2">
                <p className="text-gray-500">Item Total</p>
                <span className="mx-10 text-gray-500">
                  ₹ {totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between m-2">
                <p className="text-gray-500">Delivery Fee | 3.0 kms</p>{" "}
                <span className="mx-10 text-gray-500">₹ 45</span>
              </div>
              <div className="flex items-center justify-between border-b-2 m-2">
                <p className="text-gray-500">GST and Restaurant Charges</p>
                <span className="mx-10 text-gray-500">₹ 57</span>
              </div>
              <div className="font-bold flex items-center justify-between my-5">
                <p>TO PAY</p>
                <span className="mx-10">₹ {ToPay.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="p-2 m-1 bg-green-500 font-bold rounded-md text-white cursor-pointer"
                onClick={() => {
                  handlePlaceOrder();
                }}
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
