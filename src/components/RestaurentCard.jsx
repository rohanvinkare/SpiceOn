import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const RestaurentCard = (info) => {
  console.log(info);
  console.log(info?.link.split("/")[5]);

  return (
    <Link to={`/restaurent-menu/${info.link.split("/").at(-1)}`}>
      <div className="min-w-[295px] h-[182px] relative">
        <img
          className="w-full h-full object-cover rounded-2xl"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/${info?.cloudinaryImageId}`}
          alt=""
        />
        <div className="rounded-2xl bg-gradient-to-t from-black from-1% via-transparent to-transparent w-full h-full absolute top-0"></div>

        <p className="absolute bottom-0 text-white text-2xl ml-2 mb-2 font-bold">
          {info?.aggregatedDiscountInfoV3?.header +
            " " +
            info?.aggregatedDiscountInfoV3?.subHeader}
        </p>
      </div>

      <div className="mt-3">
        <h2 className="text-lg font-bold ">{info?.name}</h2>
        <p className="flex item-center gap-1 text-base font-semibold">
          <i className="fi fi-sr-circle-star text-l text-green-600 mt-0.5"></i>
          {info?.avgRatingString} * <span>{info?.sla?.slaString}</span>
        </p>
        <p className="line-clamp-1 text-black/70 font-medium">
          {info?.cuisines?.join(", ")}
        </p>
        <p className="line-clamp-1 text-black/70 font-medium">
          {info?.locality}
        </p>
      </div>
    </Link>
  );
};

export default RestaurentCard;
