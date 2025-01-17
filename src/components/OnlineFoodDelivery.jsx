/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import RestaurentCard from "./RestaurentCard";
import { useState } from "react";
import { setFilterValue } from "../utils/filterSlice";

const OnlineFoodDelivery = ({ data, title }) => {


  //============ The options For filter 
  const filterOptions = [
    "Ratings 4.0+",
    "Rs. 300-Rs. 600",
    "Offers",
    "Less than Rs. 300",
  ];

  const [activeBtn, setActiveBtn] = useState(null);
  const dispatch = useDispatch();


  function handleFilterBtn(filterName) {
    setActiveBtn(activeBtn === filterName ? null : filterName);
  }

  dispatch(setFilterValue(activeBtn));

  return (
    <>
      <div className="mt-9">
        <h1 className="text-2xl font-bold pb-6">{title}</h1>

        {/*========== Filter option Display and activation ========== */}
        <>
          <div className="my-4 flex flex-wrap gap-3 justify-center sm:justify-start">
            {filterOptions.map((filterName, i) => (
              <button
                key={i}
                onClick={() => handleFilterBtn(filterName)}
                className={
                  "filterBtn flex gap-2 " +
                  (activeBtn === filterName ? "active" : "")
                }
              >
                <p>{filterName}</p>
                <i className="fi text-sm mt-1 fi-br-cross hidden"></i>
              </button>
            ))}
          </div>
        </>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 gap-5">
          {data.map(({ info, cta: { link } }, i) => (
            <div key={i} className="scale-[97%]  hover:scale-90 duration-300">
              <RestaurentCard {...info} link={link}></RestaurentCard>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OnlineFoodDelivery;
