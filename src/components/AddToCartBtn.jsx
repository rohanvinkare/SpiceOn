/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { addToCart } from '../utils/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import toast from "react-hot-toast";

const AddToCartBtn = ({ info, resInfo, handleIsDiffRes }) => {

    const cartData = useSelector((state) => state.cartSlice.cartItems);
    const getResInfoFromLocalStorage = useSelector((state) => state.cartSlice.resInfo);
    const dispatch = useDispatch();



    //=============== Adding Item to Cart 
    function handelAddToCart() {

        const isAdded = cartData.find((data) => data.id == info.id);
        // const getResInfoFromLocalStorage =
        //   JSON.parse(localStorage.getItem("resInfo")) || [];

        if (!isAdded) {
            if (
                getResInfoFromLocalStorage.name === resInfo.name ||
                getResInfoFromLocalStorage.length === 0
            ) {
                dispatch(addToCart({ info, resInfo }));
                toast.success("Item Added!");
            } else {
                // alert("You Can not add items from deferent restaurent!");
                toast.error("You Can not add items from deferent restaurent!");
                handleIsDiffRes();
            }
        } else {
            // alert("Already Added!");
            toast.error("Already Added!");
        }
    }



    return (
        <button
            onClick={handelAddToCart}
            className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 bg-white text-green-700 text-lg font-bold rounded-xl border py-2 px-10 drop-shadow hover:text-white hover:bg-orange-500"
        >
            Add
        </button>
    );
}

export default AddToCartBtn;
