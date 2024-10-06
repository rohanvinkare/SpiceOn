/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { info } from "autoprefixer";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
  const [value, setValue] = useState(0);
  const [curIndex, setCurIndex] = useState(2);

  async function fetchMenu() {
    let data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.37240&lng=78.43780&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`
    );

    let res = await data.json();
    // console.log(res);

    // console.log(res?.data?.cards[2]?.card?.card?.info);
    setResInfo(res?.data?.cards[2]?.card?.card?.info);

    // console.log(
    //   res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    // );

    setDiscountData(
      res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );

    // console.log(
    //   res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2].card
    //     ?.card
    // );

    let actualMenu =
      (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
      );

    // console.log(actualMenu);

    SetMenuData(actualMenu);
  }

  useEffect(() => {
    // console.log("Updated value:", value);
  }, [value]);

  function handleNext() {
    value >= 190 ? "" : setValue((prev) => prev + 55);
  }

  function handlePrev() {
    value <= 0 ? "" : setValue((prev) => prev - 55);
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  function toggleFun(i) {
    setCurIndex(i === curIndex ? null : i);
  }

  return (
    <>
      <div className="w-full h-full">
        <div className="w-[55%] mx-auto pt-7">
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

          <h1 className="font-bold pt-6 text-2xl">{resInfo.name}</h1>

          <div className="w-full h-[160px]  mt-3 px-4 pb-4 rounded-[30px] bg-gradient-to-t from-slate-200/80">
            <div className="w-full border rounded-[30px] h-full  border-slate-200/80 bg-white p-4">
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

          <div className="w-full overflow-hidden">
            <div className="flex justify-between mt-6">
              <h1 className="font-bold text-xl">Deals for you</h1>

              <div className="flex gap-3 p-1">
                <div onClick={handlePrev} className="cursor-pointer">
                  <i className="fi text-2xl fi-ss-arrow-circle-left hover:text-orange-600"></i>
                </div>

                <div onClick={handleNext} className="cursor-pointer">
                  <i className="fi text-2xl fi-ss-arrow-circle-right hover:text-orange-600"></i>
                </div>
              </div>
            </div>

            <div
              className="flex gap-3 duration-1000"
              style={{ transform: `translateX(-${value}%` }}
            >
              {discountData.map((data, i) => (
                <div key={i}>
                  <Discount data={data} />
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-center mt-5 mb-3">MENU</h2>
          <div className="w-full relative cursor-pointer ">
            <div className="w-full p-3 font-semibold text-sm text-center rounded-xl bg-slate-200">
              Search For Dishes
            </div>
            <i className="fi fi-bs-search absolute top-3 right-4 hover:text-orange-500"></i>
          </div>

          <div>
            {menuData.map(({ card: { card } }, i) => (
              <div key={i}>
                <MenuCard card={card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// eslint-disable-next-line react/prop-types
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

function MenuCard({ card }) {
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
          {isOpen && <DetailMenu itemCards={itemCards} />}
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
          <MenuCard card={data} />;
        })}
      </div>
    );
  }
}

function DetailMenu({ itemCards }) {
  console.log(itemCards);
  return (
    <>
      <div className="my-5">
        {itemCards.map(
          ({
            card: {
              info: {
                name,
                price,
                itemAttribute: { vegClassifier },
                ratings: {
                  aggregatedRating: { rating, ratingCountV2 },
                },
                description = "",
                imageId,
              },
            },
          }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [isMore, setIsMore] = useState(false);
            let trimDes = description.substring(0, 100) + ".... ";

            return (
              <>
                <div className="flex justify-between min-h-[182px]">
                  <div className="w-[60%]">
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
                      <i
                        className={
                          " fi mt-1 text-xl fi-ss-star text-yellow-500"
                        }
                      ></i>
                      <span>
                        {rating} ({ratingCountV2})
                      </span>
                    </div>

                    {description.length > 100 ? (
                      <div className="">
                        <span className="">
                          {isMore ? description + " " : trimDes}
                        </span>

                        <button
                          className="font-bold"
                          onClick={() => setIsMore(!isMore)}
                        >
                          {isMore ? "less" : "more"}
                        </button>
                      </div>
                    ) : (
                      <span className="">{description}</span>
                    )}
                  </div>

                  <div className="w-[30%] relative">
                    <img
                      className="rounded-xl aspect-square"
                      src={
                        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                        imageId
                      }
                      alt=""
                    />
                    <button className="absolute bottom-[-4%] left-[30%] bg-white text-green-700 text-lg font-bold rounded-xl border py-2 px-10 drop-shadow hover:text-white hover:bg-orange-500">
                      Add
                    </button>
                  </div>
                </div>
                <hr className="my-5" />
              </>
            );
          }
        )}
      </div>
    </>
  );
}

export default RestaurantMenu;
