/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import AddToCartBtn from "./AddToCartBtn";
import { useDispatch, useSelector } from "react-redux";
import { setSimilarResDishes, toogleDiffRes } from "../utils/toogleSlice";
import { clearCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";


const Dishes = ({
  data: {
    info,
    restaurant: { info: resInfo },
    hideRestaurantDetails = false,
  },
}) => {

  let { imageId = "", name, price, isVeg = 0, id: itemId } = info;
  // console.log(resInfo)
  let {
    id,
    name: resName,
    avgRating,
    sla: { slaString },
    slugs: {
      restaurant: resLocation,
      city = "",

    }

  } = resInfo;

  const isDiffRes = useSelector((state) => state.toogleSlice.isDiffRes);
  const { id: cartResId } = useSelector((state) => state.cartSlice.resInfo);
  const dispatch = useDispatch();

  //============= Cart related Operations

  function handleIsDiffRes() {
    dispatch(toogleDiffRes());
  }

  function handleClearCart() {
    dispatch(clearCart());
    handleIsDiffRes();
  }

  function handleSameRes() {
    if (cartResId == id || !cartResId) {
      // dispatch(toogleIsSimilarResDishes());
      dispatch(setSimilarResDishes({
        isSimilarResDishes: true,
        city: city,
        resLocation: resLocation,
        resId: id,
        itemId: itemId,
      }))
    }

  }

  return (
    <>
      {/* ============ Cards in Dishes ================ */}
      <div className="bg-white rounded-2xl p-5 m-4">
        {/* ======= Top Section of the card ======= */}
        {!hideRestaurantDetails && (
          <>
            <Link to={`/restaurent-menu/${resLocation}-${id}`}>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <div className="flex flex-col">
                  <p className="font-bold text-lg text-gray-600">By {resName}</p>
                  <div className="flex gap-2 my-2 items-center">
                    <p className="flex items-center">
                      <i className="fi fi-ss-star mr-1 mt-1"></i> {avgRating}
                    </p>
                    <p className="text-gray-500">{slaString}</p>
                  </div>
                </div>
                <i className="fi fi-ss-location-arrow text-xl text-gray-800 p-1 hover:text-blue-500 transition-colors duration-300"></i>
              </div>
              <hr className="border-dotted" />
            </Link>
          </>

        )}



        {/*============ Bottom Section of Card ============  */}
        <>
          <div className="my-3 max-full flex justify-between">
            {/* ========== Bottom Left Section =========== */}
            <>
              <div className="w-[50%]">
                <div className="w-5 h-5">
                  {isVeg == 1 ? (
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
                </div>
                <p className="text-lg font-medium">{name}</p>
                <p>
                  <i className="fi fi-br-indian-rupee-sign text-sm pt-2 mt-1  inline-block"></i>
                  <span className="text-xl ml-1 font-bold">{price / 100}</span>
                </p>

                <button className="rounded-3xl my-4 px-2 py-1 border text-sm">
                  More Details
                </button>
              </div>
            </>

            {/* ========== Bottom Right Section =========== */}
            <>
              <div className="w-[40%] md:w-[40%]">
                <div className="relative flex flex-col justify-between gap-1">
                  {imageId ? (
                    <img
                      className="rounded-xl object-cover aspect-square"
                      src={
                        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                        imageId
                      }
                      alt=""
                    />
                  ) : (
                    <img
                      className="rounded-xl object-cover scale-125 aspect-square w-[300px]"
                      src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPijPqF61RZHfeucBcYfFtuSoHncrZwGQiZg&s"
                      alt=""
                    />
                  )}
                  <div className="" onClick={handleSameRes}>
                    <AddToCartBtn
                      info={info}
                      resInfo={resInfo}
                      handleIsDiffRes={handleIsDiffRes}
                    ></AddToCartBtn>
                  </div>
                </div>
              </div>
            </>
          </div>
        </>
      </div>

      {/*============ Pop up If items already added from different restaurent =============== */}
      <>
        {isDiffRes && (
          <div className="w-[520px] h-[204px] flex flex-col gap-2 left-[33%] p-8 border z-50  fixed bottom-10 bg-white">
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
    </>
  );
};

export default Dishes;
