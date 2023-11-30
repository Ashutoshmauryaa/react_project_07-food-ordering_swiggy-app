import { useContext } from "react";
import { RestaurantContext } from "../utils/RestaurantContext";

export const Footer = () => {
  const { Developed } = useContext(RestaurantContext);
  return (
    <div className="py-6 ml-2 flex  border-slate-200 border items-center flex-col">
      <div className="flex items-center">
        <span className=" text-black ml-[50px]">
          Developed by :
          <span className="text-red-600 font-bold"> {Developed.name}</span>
        </span>
        {/* <span>Email : {user.email}</span> */}
      </div>
      <div className="flex justify-between">
        <span className="m-2 mr-[80px]">
          Email :{" "}
          <span className="font-semibold m-1 hover:text-red-500">
            <a href="mailto:ashutosh.mauryavanshi96@gmail.com">
              {Developed.email}
            </a>
          </span>
        </span>
        <span className="m-2 ml-[70px]">
          {" "}
          Contact :
          <span className="m-1 font-semibold">{Developed.contact}</span>
        </span>
      </div>
    </div>
  );
};
