/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { CartContext, Visibility } from "../context/contextApi";
import { Coordinates } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { toogleLogin, toogleSearchBar } from "../utils/toogleSlice";
import SigninBtn from "./SigninBtn";

function Head() {
  var navItems = [
    // {
    //   name: "Swiggy Corporate",
    //   image: "fi-sr-shopping-bag",
    //   path: "/corporate",
    // },
    {
      name: "Search",
      image: "fi-br-search",
      path: "/search",
    },
    // {
    //   name: "Offers",
    //   image: "fi-rr-badge-percent",
    //   path: "/offers",
    // },
    {
      name: "Help",
      image: "fi-ss-life-ring",
      path: "/help",
    },
    {
      name: "Sign In",
      image: "fi-ss-user",
      path: "/signin",
    },
    {
      name: "Cart",
      image: "fi-sr-cart-shopping-fast",
      path: "/cart",
    },
  ];

  // const { visible, setVisible } = useContext(Visibility);

  const { coord, setCoord } = useContext(Coordinates);
  const [searchResult, SetSearchResult] = useState([]);
  const [address, setAddress] = useState("");

  // const { cartData, setCartData } = useContext(CartContext);
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const userData = useSelector((state) => state.authSlice.userData);

  // Accessing Data from Redux Store using useSelector (i.e selecting a slice)
  const visible = useSelector((state) => state.toogleSlice.searchBarToogle);
  const loginVisible = useSelector((state) => state.toogleSlice.loginToggle);
  const dispatch = useDispatch();



  //=========== For search bar Visibility
  function handleVisibility() {
    // setVisible((prev) => !prev);
    dispatch(toogleSearchBar());
  }

  function handleLogin() {
    dispatch(toogleLogin());
  }

  //============ Here We are making API call for available locations
  async function searchResultFun(val) {
    if (val == "") return;

    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/misc/place-autocomplete?input=${val}`
    );
    const data = await res.json();
    SetSearchResult(data.data);
  }

  //============= Here We are making API call for location geographical Data
  async function fetchLatAndLong(id) {
    if (id == "") return;

    handleVisibility();

    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/misc/address-recommend?place_id=${id}`
    );
    const data = await res.json();

    setCoord({
      lat: data.data[0].geometry.location.lat,
      lng: data.data[0].geometry.location.lng,
    });

    setAddress(data.data[0].formatted_address);
  }

  return (
    <>
      {/*================ Complete Location Functionality {long ,lat}================*/}
      <>
        <div className="w-full">
          {/* >>>>>>> This is the right side black div */}
          <div
            className={
              "absolute w-full bg-black/30 z-30 h-full " +
              (visible ? "visible" : "invisible")
            }
            onClick={handleVisibility}
          ></div>
          {/* >>>>>>> This is the main white div */}
          <div
            className={
              "w-full md:w-[35%] bg-white p-10  h-full z-40 absolute duration-500 " +
              (visible ? "left-[0%]" : "-left-[100%]")
            }
          >
            {/* <><><><><><><><> Main Search for location starts here <<><><><><><><> */}

            <div className="mx-14 my-10 flex flex-col">
              <i
                className="fi fi-sr-cross-circle text-3xl font-bold "
                onClick={handleVisibility}
              ></i>
              <br />
              <input
                type="text"
                className="border p-5 focus:outline-none focus:shadow-lg mb-4"
                onChange={(e) => searchResultFun(e.target.value)}
              />

              <div>
                <ul>
                  {searchResult.map((data, i) => (
                    <div key={i} className="flex gap-2">
                      <i className="mt-1 fi fi-rr-marker"></i>
                      <li onClick={() => fetchLatAndLong(data.place_id)}>
                        {data.structured_formatting.main_text}
                        <p className="text-sm opacity-60 mb-3">
                          {data.structured_formatting.secondary_text}
                        </p>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>

      {/*================ Complete Sign in View ================*/}
      <>
        <div className="w-full">

          {/* >>>>>>> This is the left side black div */}
          <div
            className={
              "absolute w-full bg-black/30 z-30 h-full " +
              (loginVisible ? "visible" : "invisible")
            }
            onClick={handleLogin}
          ></div>

          {/* >>>>>>> This is the right side White div */}
          <div
            className={
              "w-full md:w-[40%] bg-white p-10  h-full z-40 fixed duration-500 " +
              (loginVisible ? "right-[0%]" : "-right-[100%]")
            }
          >

            <div className="m-3 w-[60%]">
              <i
                className="fi fi-sr-cross-circle text-3xl font-bold "
                onClick={handleLogin}
              ></i>

              <div className="mt-10 w-full flex justify-between items-center">
                <h2 className="font-bold text-3xl border-b-2 border-black pb-5">
                  Login
                </h2>
                <img
                  className="w-28"
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                  alt=""
                />
              </div>
              {/* >>>>>>>>>>>>>>> navigation To SigninBtn Component */}
              <SigninBtn />
              <p className="text-base mt-2 opacity-70">
                By clicking on Login, I accept the Terms & Conditions & Privacy
                Policy
              </p>
            </div>
          </div>
        </div>

      </>


      {/* =============== This is related to Complete Navbar Options ================*/}
      <>
        <div className="relative w-full">
          <div className="w-full  h-20 z-20 shadow-md flex justify-center items-center sticky top-0 bg-white">
            <div className="w-full  sm:w-[90%] lg:w-[80%] flex justify-between">
              <div className="flex items-center">
                {/* >>>>>>>>>> Swiggy Main Logo in Navbar*/}
                <Link to={"/"}>
                  <div className="w-14 h-14">
                    <img
                      src="./public\\\/spiceon.png"
                      alt=""
                    />
                  </div>
                </Link>

                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={handleVisibility}
                >
                  <p className="flex items-center gap-2">
                    <span className="text-sm font-bold border-b-2 border-black hover:text-orange-600 hover:border-orange-600 text-black/75 ">
                      Other
                    </span>
                    <span className="ml-3 mt-1 text-sm opacity-50 line-clamp-1 mx-w-[250px]">
                      {address}
                    </span>
                  </p>
                  <i className="mt-2  text-2xl text-orange-500 fi fi-rr-angle-small-down"></i>
                </div>
              </div>

              {/* >>>>>>>>>>>>>>>>>> This is For The right side options in NavBar */}
              <>
                {/* we see the below div in website   */}
                <div className="hidden md:flex items-center md:gap-7 cursor-pointer ">
                  {navItems.map((data, i) =>
                    data.name == "Sign In" ? (
                      <div onClick={handleLogin} key={i}>
                        <div
                          className="flex text-black/75 font-bold text-sm gap-2 hover:text-orange-600 items-center"
                          key={i}
                        >
                          {userData ? (
                            <img
                              className="w-8 h-8 rounded-full"
                              src={`${userData.photo}`}
                              alt=""
                            />
                          ) : (
                            <i className={"text-base fi " + data.image}></i>
                          )}

                          <p>{userData ? userData.name : data.name}</p>

                          {data.name == "Cart" && <p>{cartData.length}</p>}
                        </div>
                      </div>
                    ) : (
                      <Link to={data.path} key={i}>
                        <div
                          className="flex text-black/75 font-bold text-sm gap-2 hover:text-orange-600"
                          key={i}
                        >
                          <i className={"text-base fi " + data.image}></i>
                          <p>{data.name}</p>
                          {data.name == "Cart" && <p>{cartData.length}</p>}
                        </div>
                      </Link>
                    )
                  )}
                </div>

                {/* we see the below div for Mobile not  */}

                <div className="md:hidden flex items-center gap-10 mr-4 cursor-pointer">
                  {navItems.map((data, i) =>
                    data.name == "Sign In" ? (
                      <div onClick={handleLogin} key={i}>
                        <div
                          className="flex text-black/75 font-bold text-sm gap-2 hover:text-orange-600 items-center"
                          key={i}
                        >
                          {userData ? (
                            <img
                              className="w-8 h-8 rounded-full"
                              src={`${userData.photo}`}
                              alt=""
                            />
                          ) : (
                            <i className={"text-base fi " + data.image}></i>
                          )}

                          <p>{userData ? userData.name : data.name}</p>

                          {data.name == "Cart" && <p>{cartData.length}</p>}
                        </div>
                      </div>
                    ) : (
                      <Link to={data.path} key={i}>
                        <div
                          className="flex text-black/75 font-bold text-sm gap-2 hover:text-orange-600"
                          key={i}
                        >
                          <i className={"text-base fi " + data.image}></i>
                          {/* <p>{data.name}</p> */}
                          {data.name == "Cart" && <p>{cartData.length}</p>}
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </>
            </div>
          </div>
          <Outlet />
        </div>
      </>
    </>
  );
}

export default Head;
