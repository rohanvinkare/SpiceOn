/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Head = () => {
  var navItems = [
    {
      name: "Swiggy Corporate",
      image: "fi-sr-shopping-bag",
    },
    {
      name: "Search",
      image: "fi-br-search",
    },
    {
      name: "Offers",
      image: "fi-rr-badge-percent",
    },
    {
      name: "Help",
      image: "fi-ss-life-ring",
    },
    {
      name: "Sign In",
      image: "fi-ss-user",
    },
    {
      name: "Cart",
      image: "fi-sr-cart-shopping-fast",
    },
  ];

  return (
    <>
      <div className="w-full h-20 shadow-md flex justify-center items-center">
        <div className=" w-[70%] flex justify-between">
          <div className="flex items-center">
            <Link to={"/"}>
              <img
                className="w-24"
                src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png"
                alt=""
              />
            </Link>
            <div className="flex items-center gap-2 cursor-pointer">
              <p className="text-sm font-bold border-b-2 border-black hover:text-orange-600 hover:border-orange-600 text-black/75 ">
                Other
              </p>
              <i className="mt-2  text-2xl text-orange-500 fi fi-rr-angle-small-down"></i>
            </div>
          </div>

          <div className="flex items-center gap-7 cursor-pointer ">
            {navItems.map((data) => (
              <div className="flex text-black/75 font-bold text-sm gap-2 hover:text-orange-600">
                <i className={"text-base fi " + data.image}></i>
                <p>{data.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Head;
