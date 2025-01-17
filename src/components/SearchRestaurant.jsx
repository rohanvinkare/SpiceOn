/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const SearchRestaurant = ({
    data: {
        card: {
            card: {
                info: {
                    id,
                    name,
                    avgRating,
                    sla: { slaString },
                    cloudinaryImageId,
                    costForTwoMessage,
                    cuisines,
                    promoted = false,
                    aggregatedDiscountInfoV3,
                },
            },
        },
    },
}) => {
    return <>
        {/* ========== Restaurent Cards in search section  ======== */}
        <>

            <div className="bg-white p-4 m-4 rounded-2xl flex gap-7 items-center" >

                {/* ===== section With Image ========== */}
                <>
                    <div className="w-[30%] rounded-2xl">
                        {cloudinaryImageId ? (
                            <img
                                className="rounded-xl object-cover aspect-square"
                                src={
                                    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/" +
                                    cloudinaryImageId
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
                    </div>
                </>

                {/* ===== section With text Content ======== */}
                <>
                    <div className="w-[60%]">
                        <Link to={`/restaurent-menu/${id}`}>
                            <p className="font-bold line-clamp-1">{name}</p>

                            <div className="flex gap-2 my-1 items-center">
                                <p className="flex items-center">
                                    <i className="fi fi-ss-star mr-1 mt-1"></i> {avgRating}
                                </p>
                                <p className="text-gray-500">{costForTwoMessage}</p>
                            </div>
                            <p className="line-clamp-1">{cuisines.join(", ")}</p>
                        </Link>
                    </div>
                </>
            </div>

        </>
    </>;
};

export default SearchRestaurant;


export function withHoc(WrappedCom) {
    return (prop) => {
        return (
            <div className="relative">
                <p className="absolute top-10 text-sm bg-gray-800  p-1 left-10 text-white rounded-lg">Ad</p>
                <WrappedCom {...prop} />
            </div >
        );
    };
}