import { CDN_URL } from "../utils/constant";
import { RatingIcon } from "../utils/icon";
const RestaurantCard = (props) => {
  const { resdata } = props;
  const { name, avgRating, costForTwo, cuisines, sla, cloudinaryImageId } =
    resdata?.info;
  return (
    <div className="m-2 p-1 w-[240px]  rounded-lg hover:shadow-2xl hover:w-[260px] ">
      <img
        className="rounded-lg w-[350px] h-40 object-cover "
        src={CDN_URL + cloudinaryImageId}
        alt="res-logo"
      />
      <div className="py-1 my-2 mx-2 p-1">
        <h3 className="font-bold ">{name}</h3>
        <h4 className="flex py-1 space-x-1">
          <span className="py-0.5">
            <RatingIcon />
          </span>
          <p className=" -py-1 font-semibold"> {avgRating}</p>
          <h4 className="px-0.5 font-semibold">• {sla.deliveryTime} mins</h4>
        </h4>

        <h4 className="truncate font-serif text-gray-500">
          {cuisines.join("-")}
        </h4>
      </div>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  // taking a component - eg of higher order component
  return (props) => {
    // returning a component
    return (
      <div>
        <label className="absolute bg-slate-900 text-white rounded-md px-2 m-1">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
export default RestaurantCard;
