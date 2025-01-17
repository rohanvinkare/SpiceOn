/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";

import { useState, useEffect } from "react";

const OnYourMind = ({ data }) => {
  const [value, setValue] = useState(0);

  // Log the value whenever it updates
  useEffect(() => {
    // console.log("Updated value:", value);
  }, [value]);

  function handleNext() {
    value >= 124 ? "" : setValue((prev) => prev + 32);
  }

  function handlePrev() {
    value <= 0 ? "" : setValue((prev) => prev - 32);
  }

  return (
    <>
      <div className="flex justify-between mt-2">
        <h1 className="font-bold text-2xl">What's on your mind?</h1>

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
        style={{ transform: `translateX(-${value}%)` }}
        className="flex duration-1000"
      >
        {data.map((item) => (
          <img
            key={item.id}
            className="w-32"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
            alt=""
          />
        ))}
      </div>
      <hr className="border my-4"></hr>
    </>
  );
};

export default OnYourMind;
