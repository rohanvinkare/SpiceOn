/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useContext } from "react";
import { useState } from "react";
import Dishes from "./Dishes";
import SearchRestaurant, { withHoc } from "./SearchRestaurant";
import { Coordinates } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { resetSimilarResDishes } from "../utils/toogleSlice";


const Search = () => {
    //============ The options For filter
    const filterOptions = ["Dishes", "Restaurant"];

    const [searchQuery, setSearchQuery] = useState("");
    const [activeBtn, setActiveBtn] = useState("Dishes");
    const [dishes, setDishes] = useState([]);
    const [restaurant, setRestaurant] = useState([]);
    const [selectedResDish, setSelectedResDish] = useState(null);
    const [similarResDishes, setSimilarResDishes] = useState([]);

    const { coord: { lat, lng } } = useContext(Coordinates);
    const { isSimilarResDishes, city, resId, itemId, resLocation } = useSelector((state) => state.toogleSlice.similarResDishes);
    // console.log({ isSimilarResDishes, city, resId, itemId, resLocation })
    const dispatch = useDispatch();

    const PromotedRes = withHoc(SearchRestaurant);


    function handleFilterBtn(filterName) {
        setActiveBtn(activeBtn === filterName ? activeBtn : filterName);
    }


    function handleSearchQuery(e) {

        let val = e.target.value;
        if (e.keyCode == 13) {
            setSearchQuery(val);
            setSelectedResDish(null);
            setDishes([])
        }
    }

    async function fetchDishes() {
        let data = await fetch(
            `${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}%20Hut&trackingId=undefined&submitAction=ENTER&queryUniqueId=903eb3d8-a06b-3348-0855-d9efc9648dfc&selectedPLTab=DISH`
        );

        let res = await data.json();
        let finalData =
            (res?.data?.cards[0]?.groupedCard?.cardGroupMap?.DISH?.cards).filter(
                (data) => data?.card?.card?.info
            );
        setDishes(finalData);
        // console.log(finalData)
    }

    async function fetchRestaurantData() {

        let data = await fetch(
            `${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}%20Hut&trackingId=79e4dbbc-ef54-bd4d-3755-02e61814d0cd&submitAction=ENTER&queryUniqueId=903eb3d8-a06b-3348-0855-d9efc9648dfc`
        );

        let res = await data.json();
        let finalData =
            (res?.data?.cards?.[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter(
                (data) => data?.card?.card?.info
            );
        setRestaurant(finalData);
        // console.log(restaurant)
    }


    useEffect(() => {
        if (isSimilarResDishes) {
            fetchSimilarResDishes();
        }
    }, [isSimilarResDishes])


    async function fetchSimilarResDishes() {

        let pathName = `/city/${city}/${resLocation}`;
        let encodedPath = encodeURIComponent(pathName);
        // console.log(encodedPath);


        let data = await fetch(
            `${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedPath}-rest${resId}%3Fquery%3D${searchQuery}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`
        );

        let res = await data.json();
        // console.log(res)
        // console.log(res.data?.cards[1])
        setSelectedResDish(res.data?.cards[1])
        // console.log(res.data?.cards[2]?.card?.card?.cards)
        setSimilarResDishes(res.data?.cards[2]?.card?.card?.cards)
        dispatch(resetSimilarResDishes());
    }


    useEffect(() => {
        if (searchQuery == "") {
            return;
        }
        // setSearchQuery("")
        fetchDishes();
        fetchRestaurantData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    return (
        <>
            <div className="w-full mt-10 md:w-[1000px] mx-auto">

                <div className="relative w-full">
                    <i className="fi fi-rr-angle-small-left text-2xl absolute top-1/2 -translate-y-1/2 mt-1 ml-4"></i>

                    <i className="fi fi-br-search  text-l absolute right-5 top-1/2 -translate-y-1/2 mt-1"></i>
                    <input
                        // onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearchQuery}
                        className="border-2 w-full pl-12 py-3 outline-none rounded-2xl"
                        type="text"
                        placeholder="search for restaurant"
                    />

                </div>


                {/*========== Filter option Display and activation ========== */}
                <>

                    {
                        !selectedResDish && <div className="my-4 flex flex-wrap gap-3 justify-center sm:justify-start">
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
                                </button>
                            ))}
                        </div>
                    }

                </>

                {/* ========================================= */}
                <>
                    <div className="w:full md:w-[1000px]  grid grid-cols-1 md:grid-cols-2 rounded-2xl bg-[#f4f5f7]  ">
                        {

                            selectedResDish ?
                                <>
                                    <div>
                                        <p className="p-4">Item added to cart</p>
                                        <Dishes data={selectedResDish.card.card} />
                                        <p className="p-4">
                                            More dishes from this restaurant
                                        </p>
                                    </div>
                                    <br />

                                    {similarResDishes?.map((data, i) => (
                                        <Dishes
                                            key={i}
                                            data={{
                                                ...data.card,
                                                restaurant: selectedResDish.card.card.restaurant,
                                            }}
                                        />
                                    ))}
                                </>

                                :
                                activeBtn === "Dishes"
                                    // eslint-disable-next-line react/jsx-key
                                    ? dishes.map((data) => <Dishes data={data.card.card}></Dishes>)

                                    : restaurant.map((data, i) => (data?.card?.card?.info?.promoted ? <PromotedRes data={data} key={i} /> : <SearchRestaurant data={data} key={i}></SearchRestaurant>))}
                    </div>
                </>
            </div>
        </>
    );
};

export default Search;
