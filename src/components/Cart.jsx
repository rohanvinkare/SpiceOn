/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { CartContext } from "../context/contextApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteItem } from "../utils/cartSlice";
import toast from "react-hot-toast";
import { toogleLogin } from "../utils/toogleSlice";

const Cart = () => {

  //-------- Navigation Hook

  const navigate = useNavigate();

  // const { cartData, setCartData } = useContext(CartContext);
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const resInfo = useSelector((state) => state.cartSlice.resInfo);
  const dispatch = useDispatch();


  const [isMore, setIsMore] = useState(false);


  function handleRemove(i) {
    if (cartData.length > 1) {
      let newArr = [...cartData];
      newArr.splice(i, 1);
      // setCartData(newArr);

      dispatch(deleteItem(newArr));
      toast.success("Item Removed!");
    } else {
      handleClearCart();
    }
  }

  // for total price of items in cart
  let totalPrice = 0;
  for (let i = 0; i < cartData.length; i++) {
    totalPrice =
      totalPrice + cartData[i].price / 100 || cartData[i].price / 100;
  }

  function handleClearCart() {
    dispatch(clearCart());
    toast.success("Cart is Cleared!");
    // setCartData([]);
    // localStorage.setItem("cartData", JSON.stringify([]));
    // localStorage.clear();
  }

  const userData = useSelector((state) => state.authSlice.userData);

  function handlePlaceOrder() {
    if (!userData) {
      toast.error("Login Required!")
      dispatch(toogleLogin())
      return
    }
    toast.success("order Is Placed!");
  }

  if (cartData.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="w-[60%] mx-auto text-center bg-white shadow-lg p-8 rounded-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Your cart is empty!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            It looks like you haven't ordered anything yet.
          </p>
          <Link
            to="/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-lg font-medium py-3 px-6 rounded-lg transition duration-300 active:bg-orange-700 active:scale-95"
          >
            Order Here
          </Link>
        </div>
      </div>
    );
  }



  return (
    <>
      <div className="w-full">

        <div className="w-[95%] md:w-[1000px]  mx-auto">


          {/*================= Restaurent Image and Information  =================*/}
          <>
            <Link to={`/restaurent-menu/${resInfo.id}`}>
              <div className="my-10 flex items-center space-x-5">
                <img
                  className="rounded-2xl w-40 h-40 object-cover shadow-lg transition-transform duration-200 ease-in-out hover:scale-105"
                  src={
                    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                    resInfo.cloudinaryImageId
                  }
                  alt={resInfo.name}
                />

                <div className="flex flex-col space-y-2">
                  <p className="text-4xl font-semibold border-b-4 border-black pb-2 hover:border-gray-500">
                    {resInfo.name}
                  </p>
                  <p className="mt-2 text-lg text-gray-600">{resInfo.areaName}</p>
                </div>
              </div>
            </Link>
          </>
          <hr className="my-5 border-2" />

          {/* ==================== Orders in Cart ====================== */}
          <>
            <div>
              {cartData.map(({
                name,
                price,
                itemAttribute,
                ratings: {
                  aggregatedRating: { rating, ratingCountV2 },
                },
                description = "",
                imageId,
              }, i) => {

                let trimDes = description.substring(0, 100) + ".... ";
                return <>

                  <div key={i} className="flex justify-between min-h-[182px]">
                    {/*>>>>>>>>>>>>>>>>>>> Text section  */}
                    <>
                      <div className="w-[55%] md:w-[65%]">
                        {itemAttribute && itemAttribute.vegClassifier == "VEG" ? (
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

                        <div className="line-clamp-2">
                          {description}
                        </div>

                      </div>
                    </>

                    {/* >>>>>>>>>>>>>>>>>>>>>> Image and Button Section */}
                    <>
                      <div className="w-[40%] md:w-[25%]   relative flex flex-col items-center mb-6">
                        <img
                          className="rounded-xl aspect-square"
                          src={
                            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                            imageId
                          }
                          alt=""
                        />
                        <button
                          onClick={handleRemove}
                          className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 bg-white text-red-700 text-lg font-bold rounded-xl border py-[3%] px-[14%] drop-shadow hover:text-white hover:bg-red-900"
                        >
                          Remove
                        </button>

                      </div>
                    </>

                  </div>  <hr className="border my-4"></hr>
                </>
              })}
            </div>
          </>

          {/* =============== Total , Place Order , Clear Cart ================  */}
          <>
            <div className="max-w-xl mx-auto p-6 sm:p-8">
              <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center">
                Total Price: <span className="text-orange-600">₹ {totalPrice}</span>
              </h1>

              <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 mt-6 sm:mt-8 space-y-4 sm:space-y-0">
                <button
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-base sm:text-lg font-semibold rounded-lg py-3 px-8 sm:px-10 shadow-lg hover:shadow-orange-500/50 active:bg-orange-700 active:scale-95 transition-transform transform ease-in-out duration-150 hover:scale-105 hover:from-orange-400 hover:to-orange-500"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>

                <button
                  className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-base sm:text-lg font-semibold rounded-lg py-3 px-8 sm:px-10 shadow-lg hover:shadow-gray-900/50 active:bg-gray-900 active:scale-95 transition-transform transform ease-in-out duration-150 hover:scale-105 hover:from-gray-700 hover:to-gray-800"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </>

        </div>
      </div >
    </>
  );
};

export default Cart;
