/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { info } from "autoprefixer";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext, Coordinates } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart } from "../utils/cartSlice";
import { toogleDiffRes } from "../utils/toogleSlice";
import toast from "react-hot-toast";
import AddToCartBtn from "./AddToCartBtn";
import { MenuShimmer } from "./Shimmer";

const RestaurantMenu = () => {
  const { id } = useParams();

  // console.log(id.split("-").at(-1));

  let newId = id.split("-").at(-1);
  // spiting the  number an text
  let mainId = newId.match(/\d+/)[0];

  // console.log(mainId);

  const [resInfo, setResInfo] = useState([]);
  const [menuData, SetMenuData] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [topPicksData, setTopPicksData] = useState();
  const [value, setValue] = useState(0);
  const [topPicks, setTopPicks] = useState(0);
  const [curIndex, setCurIndex] = useState(2);

  const {
    coord: { lat, lng },
  } = useContext(Coordinates);

  async function fetchMenu() {
    let data = await fetch(
      `${import.meta.env.VITE_BASE_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`
    );

    let res = await data.json();

    const resInfo = res?.data?.cards.find(value => value?.card?.card?.["@type"].includes("food.v2.Restaurant"))?.card?.card?.info
    setResInfo(resInfo);

    const discountInfo = res?.data?.cards.find((value) => value?.card?.card?.["@type"].includes("v2.GridWidget"))?.card?.card?.gridElements?.infoWithStyle?.offers;
    setDiscountData(discountInfo);

    let actualMenu = res?.data?.cards.find((data) => data?.groupedCard);
    // (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter( 
    //   (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
    // );

    setTopPicksData(
      (actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (data) => data.card.card.title == "Top Picks"
      )[0]
    );

    SetMenuData(
      actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (data) =>
          data?.card?.card?.itemCards || data?.card?.card?.categories
      )
    );
  }

  useEffect(() => {
  }, [value]);


  function handleNext() {
    value >= 190 ? "" : setValue((prev) => prev + 55);
  }

  function handlePrev() {
    value <= 0 ? "" : setValue((prev) => prev - 55);
  }

  function handleNextTopPicks() {
    topPicks >= 190 ? "" : setTopPicks((prev) => prev + 55);
  }

  function handlePrevTopPicks() {
    topPicks <= 0 ? "" : setTopPicks((prev) => prev - 55);
  }


  useEffect(() => {
    fetchMenu();
  }, []);


  function toggleFun(i) {
    setCurIndex(i === curIndex ? null : i);
  }


  return (
    <>
      <div className="w-full">
        {
          menuData.length ? (<div className="w-[95%] md:w-[1000px] mx-auto pt-7">

            {/*=========== Links to home page ========== */}
            <>
              <p className="text-[12px] text-slate-500 cursor-pointer">
                <Link to={"/"}>
                  <span className=" hover:text-slate-800">Home</span>{" "}
                </Link>{" "}
                /
                <Link to={"/"}>
                  <span className=" hover:text-slate-800"> {resInfo.city}</span>
                </Link>{" "}
                / <span className="text-slate-800">{resInfo.name}</span>
              </p>
            </>

            {/*============ Restaurent rating and Intro ============ */}
            <>
              <h1 className="ml-4 font-bold pt-6 text-2xl">{resInfo.name}</h1>
              <div className="w-full h-[160px]  mt-3 px-4 pb-4 rounded-[30px] bg-gradient-to-t from-slate-200/80">
                <div className="w-full border rounded-[30px] h-full  border-slate-200/80 bg-white p-4">

                  {/* >>>> Ratings And other info <<<<<<*/}
                  <>
                    <div className="flex items-center gap-1 font-semibold">
                      <i className="fi fi-sr-circle-star text-l mt-1 text-green-600 "></i>
                      <span>{resInfo.avgRating}</span>
                      <span>({resInfo.totalRatingsString})</span>.
                      <span>{resInfo.costForTwoMessage}</span>
                    </div>
                    <p className="underline font-semibold text-orange-600">
                      {resInfo?.cuisines?.join(", ")}
                    </p>
                  </>

                  {/* >>>>>>>>>> Outlet , timing< <<<<<<<< */}
                  <>
                    <div className="flex gap-2 mt-2">
                      <div className="w-[9px] flex flex-col items-center mt-2">
                        <div className="w-[7px] h-[7px] bg-gray-400 rounded-full"></div>
                        <div className="w-[2px] h-[20px] bg-gray-400 "></div>
                        <div className="w-[7px] h-[7px] bg-gray-400 rounded-full"></div>
                      </div>

                      <div className="flex flex-col text-sm gap-1 font-semibold">
                        <p className="mb-1">
                          Outlet{" "}
                          <span className="text-gray-600 font-normal">
                            {resInfo.locality}
                          </span>
                        </p>
                        <p>{resInfo.sla?.slaString}</p>
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </>



            {/* =============== Deals for you section ================ */}
            <>
              <div className="w-full overflow-hidden">
                {/* >>>>>>>>>>>> Handle the control<<<<<<  */}
                <>
                  <div className="flex justify-between mt-6">
                    <h1 className="font-bold text-xl">Deals for you</h1>

                    <div className="flex gap-3 p-1">
                      <div onClick={handlePrev} className="cursor-pointer">
                        <i className="fi text-2xl fi-ss-arrow-circle-left hover:text-orange-500 transition duration-300 active:scale-90 active:text-orange-800"></i>
                      </div>

                      <div onClick={handleNext} className="cursor-pointer">
                        <i className="fi text-2xl fi-ss-arrow-circle-right hover:text-orange-500 transition duration-300 active:scale-90 active:text-orange-800"></i>
                      </div>
                    </div>
                  </div>
                </>
                {/* >>>>>>>>>>>> mapping the deals <<<<<<  */}
                <>
                  <div
                    className="flex gap-3 duration-1000"
                    style={{ transform: `translateX(-${value}%` }}
                  >
                    {discountData.map((data, i) => (
                      <div key={i}>
                        {/* Prop Dealing Sending data to other function */}
                        <Discount data={data} />
                      </div>
                    ))}
                  </div>
                </>
              </div>
            </>



            {/* ================== MENU Section ==================== */}
            <>
              {/* >>>>>>>>>>>> Titles and Search Bar */}
              <>
                <h2 className="text-center font-bold text-xl mt-5 mb-3 text-gray-800">MENU</h2>
                <div className="w-full relative cursor-pointer ">
                  <div className="w-full p-3 font-semibold text-sm text-center rounded-xl bg-slate-200">
                    Search For Dishes
                  </div>
                  <i className="fi fi-bs-search absolute top-3 right-4 hover:text-orange-500"></i>
                </div>
              </>

              {/* ==================== Mapping Top Picks Data==================== */}
              {topPicksData && (
                <div className="w-full overflow-hidden">
                  <div className="flex justify-between mt-6">
                    <h1 className="font-bold text-2xl mt-5 mb-3">
                      {topPicksData[0]?.card?.card?.title}
                    </h1>

                    <div className="flex gap-3 p-1">
                      <div onClick={handlePrevTopPicks} className="cursor-pointer">
                        <i className="fi text-2xl fi-ss-arrow-circle-left hover:text-orange-500 transition duration-300 active:scale-90 active:text-orange-800"></i>
                      </div>

                      <div onClick={handleNextTopPicks} className="cursor-pointer">
                        <i className="fi text-2xl fi-ss-arrow-circle-right hover:text-orange-500 transition duration-300 active:scale-90 active:text-orange-800"></i>
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex gap-4 duration-1000"
                    style={{ transform: `translateX(-${topPicks}%` }}
                  >
                    {topPicksData[0]?.card.card.carousel.map(
                      (
                        {
                          creativeId,
                          dish: {
                            info: { price },
                          },
                        },
                        i
                      ) => (
                        <div key={i} className="min-w-[384px] h-[394px] relative">
                          <img
                            className="w-full h-full"
                            src={
                              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/" +
                              creativeId
                            }
                          />

                          <div className="absolute w-full flex justify-between items-center px-6 bottom-4 text-white text-xl font-bold ">
                            <p className="mt-1"> Rs {price / 100}</p>
                            <button className="px-9 py-3 text-green-700 bg-white hover:bg-orange-500 hover:text-white rounded-xl transition duration-300 active:bg-orange-600 active:scale-95 focus:bg-orange-600 focus:scale-95">
                              Add
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Fo */}
              <div>
                {menuData.map(({ card: { card } }, i) => (
                  <div key={i}>
                    <MenuCard card={card} resInfo={resInfo} />
                  </div>
                ))}
              </div>
            </>
          </div>) : (<MenuShimmer></MenuShimmer>)
        }

      </div>
    </>
  );
};


function Discount({
  data: {
    info: { offerLogo, couponCode, header },
  },
}) {
  // console.log(info);
  return (
    <>
      <div className="flex gap-2  min-w-[280px] h-[76px] p-4 border border-slate-400/80 rounded-2xl">
        <img
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" +
            offerLogo
          }
          alt=""
        />
        <div>
          <h2 className="font-bold text-xl">{header}</h2>
          <p className="text-slate-500">{couponCode}</p>
        </div>
      </div>
    </>
  );
}

// cards coming below in the recommended sections and all

function MenuCard({ card, resInfo }) {
  let hello = false;

  if (card["@type"]) {
    hello = true;
  }

  const [isOpen, setIsOpen] = useState(hello);

  // Toggle to open the card and close
  function toggleDropDown() {
    setIsOpen((prev) => !prev);
  }

  // handling the api Response
  if (card.itemCards) {
    const { title, itemCards } = card;
    return (
      <>
        <div className="mt-7">
          <div className="flex justify-between">
            <h1 className={"font-bold text-" + (card["@type"] ? "xl" : "base")}>
              {title}
            </h1>
            <i
              className={"text-xl fi fi-br-angle-" + (isOpen ? "up" : "down")}
              onClick={() => {
                toggleDropDown();
              }}
            ></i>
          </div>
          {isOpen && <DetailMenu itemCards={itemCards} resInfo={resInfo} />}
        </div>

        <hr className={"mt-3 border-" + (card["@type"] ? "[7px]" : "[4px]")} />
      </>
    );
  } else {
    const { title, categories } = card;
    return (
      <div>
        <h1 className="font-bold text-xl"> {title}</h1>
        {categories.map((data) => {
          <MenuCard card={data} resInfo={resInfo} />;
        })}
      </div>
    );
  }
}



function DetailMenu({ itemCards, resInfo }) {
  // console.log(itemCards);

  return (
    <div className="my-5">
      {itemCards.map(({ card: { info } }) => (
        <DetailMenuCard key={info.id} info={info} resInfo={resInfo} />
      ))}
    </div>
  );
}


// ============================= Cards in Hotel menu recommended Section ========================
function DetailMenuCard({ info, resInfo }) {
  // console.log(itemCards)
  const {
    name,
    price,
    itemAttribute: { vegClassifier },
    ratings: {
      aggregatedRating: { rating, ratingCountV2 },
    },
    description = "",
    imageId,
  } = info;



  const isDiffRes = useSelector((state) => state.toogleSlice.isDiffRes)
  const dispatch = useDispatch();

  //============= Cart related Operations 

  function handleIsDiffRes() {
    dispatch(toogleDiffRes())
  }

  function handleClearCart() {
    dispatch(clearCart());
    handleIsDiffRes();
  }

  const [isMore, setIsMore] = useState(false);
  let trimDes = description.substring(0, 100) + ".... ";

  return (
    <div className="relative w-full">

      {/*================ Two Sections inside the Card ============ */}
      <>
        <div className="flex justify-between min-h-[182px]">
          {/* ============= Section with item Info ============== */}
          <div className="w-[55%] md:w-[65%]">
            {vegClassifier == "VEG" ? (
              <img
                className="w-6 rounded-sm"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSobEpnTnvPgrbjOr6MvY07Jub0DDiBJm-sUPhtWDFOKIlrsEK2UbnXdm3YTmeGMgTcpRQ&usqp=CAU"
                alt=""
              />
            ) : (
              <img
                className="w-6 rounded-sm"
                src="https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png"
                alt=""
              />
            )}

            <h2 className="font-bold text-lg">{name}</h2>
            <p className="font-bold text-lg">₹ {price / 100} </p>

            <div className="flex items-center gap-1">
              <i className={" fi mt-1 text-xl fi-ss-star text-yellow-500"}></i>
              <span>
                {rating} ({ratingCountV2})
              </span>
            </div>

            {description.length > 100 ? (
              <div className="">
                <span className="line-clamp-2 md:line-clamp-none">{isMore ? description + " " : trimDes}</span>

                <button className="hidden md:block font-bold" onClick={() => setIsMore(!isMore)}>
                  {isMore ? "less" : "more"}
                </button>
              </div>
            ) : (
              <span className="">{description}</span>
            )}
          </div>
          {/* =========== Section With Image ================== */}
          <div className="w-[40%] md:w-[25%] relative">
            <img
              className="rounded-xl object-cover aspect-square"
              src={
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                imageId
              }
              alt=""
            />
            <AddToCartBtn info={info} resInfo={resInfo} handleIsDiffRes={handleIsDiffRes}></AddToCartBtn>

          </div>
        </div>
      </>


      <hr className="my-5" />


      {/*============ Pop up If items already added from different restaurent =============== */}
      <>
        {isDiffRes && (

          <div className="w-[520px] h-[204px] flex flex-col gap-2 left-[33%] p-8 border z-50 shadow-md fixed bottom-10 bg-white">
            {/* {console.log("hey here")} */}
            <h1>Items already in cart</h1>
            <p>
              Your cart contains items from other restaurant. Would you like to
              reset your cart for adding items from this restaurant?
            </p>
            <div className="flex justify-between gap-3 w-full uppercase">
              <button
                onClick={handleIsDiffRes}
                className="border-2 w-1/2 p-3 border-green-600 text-green-600"
              >
                No
              </button>
              <button
                className="  w-1/2 p-3 bg-green-600 text-white "
                onClick={handleClearCart}
              >
                Yes, start Afresh
              </button>
            </div>
          </div>
        )}
      </>


    </div>
  );
}

export default RestaurantMenu;
