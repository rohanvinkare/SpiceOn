/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import RestaurentCard from "./RestaurentCard";

const OnlineFoodDelivery = ({ data }) => {
  useEffect(() => {
    return localStorage.clear();
  }, []);

  return (
    <>
      <div className="mt-9">
        <h1 className="text-2xl font-bold">
          Restaurent with online food delivery
        </h1>
        <div className="grid grid-cols-3 gap-5">
          {data.map(({ info, cta: { link } }) => (
            <div className="scale-[97%]  hover:scale-90 duration-300">
              <RestaurentCard {...info} link={link}></RestaurentCard>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OnlineFoodDelivery;
