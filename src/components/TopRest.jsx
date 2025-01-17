/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import RestaurentCard from "./RestaurentCard";
import { Link } from "react-router-dom";

const TopRest = ({ data = [], title }) => {
  const [value, setValue] = useState(0);

  // Log the value whenever it updates
  useEffect(() => {
    // console.log("Updated value:", value);
  }, [value]);

  function handleNext() {
    value >= 580 ? "" : setValue((prev) => prev + 50);
  }

  function handlePrev() {
    value <= 0 ? "" : setValue((prev) => prev - 50);
  }

  return (
    <>
    
      <div className="mt-9 h-full w-full ">
        <div className="flex justify-between mt-2">
          <h1 className="font-bold text-2xl pb-1">{title}</h1>

          <div className="flex gap-3 p-1">
            <div onClick={handlePrev} className="cursor-pointer">
              <i className="fi text-2xl fi-ss-arrow-circle-left hover:text-orange-500 transition duration-300 active:scale-90 active:text-orange-800"></i>
            </div>

            <div onClick={handleNext} className="cursor-pointer">
              <i className="fi text-2xl fi-ss-arrow-circle-right hover:text-orange-500 transition duration-300 active:scale-90 active:text-orange-800"></i>
            </div>
          </div>
        </div>

        <div
          className="flex mt-6 gap-5 w-full  duration-1000"
          style={{ translate: `-${value}%` }}
        >
          {data.map(({ info, cta: { link } }, i) => (
            <div key={i} className="scale-[97%]  hover:scale-90 duration-300">
              <RestaurentCard {...info} link={link}></RestaurentCard>
            </div>
          ))}
        </div>
        <hr className="border mt-5"></hr>
      </div>
    </>
  );
};

export default TopRest;
