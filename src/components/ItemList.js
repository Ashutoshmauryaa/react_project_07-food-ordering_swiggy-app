import React from "react";
import { CDN_URL } from "../utils/constant";
import sorry from "../logo/sorry.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../Redux/cartSlice";
const ItemList = ({ items }) => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };
  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card?.info?.id}
          className="p-2 m-2 border-b-2 border-gray-200 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span className="font-medium">{item.card?.info?.name}</span>
              <span>
                {" "}
                - ₹
                {item.card?.info?.price
                  ? item.card?.info?.price / 100
                  : item.card?.info?.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs truncate font-light">
              {item.card?.info?.description}
            </p>
          </div>
          <div className="w-2/12 p-4">
            {cartItems.filter((obj) => obj.card.info.id === item.card.info.id)
              .length === 0 ? (
              <div className="absolute my-[4.3rem]">
                <button
                  className="px-6 py-1 mx-5  bg-white text-green-600 font-medium rounded-md hover:shadow-xl border "
                  onClick={() => handleAddItem(item)}
                >
                  ADD +
                </button>
              </div>
            ) : (
              <>
                <div className="absolute my-[4.8rem] mx-4 bg-white text-gray-600 font-bold border border-gray-100 shadow-md">
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
              </>
            )}

            <div className="">
              {item.card?.info?.imageId ? (
                <img
                  className=" rounded-lg"
                  src={CDN_URL + item.card?.info?.imageId}
                  alt="logo"
                />
              ) : (
                <img className="rounded-lg" src={sorry} alt="sorry" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
