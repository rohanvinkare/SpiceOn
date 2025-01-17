import { useSelector } from "react-redux";
import { Coordinates } from "../context/contextApi";
import OnlineFoodDelivery from "./OnlineFoodDelivery";
import OnYourMind from "./OnYourMind";
import TopRest from "./TopRest";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";

const Body = () => {

  const [onYourMind, setOnYourMind] = useState([]);
  const [TOpRest, setTopRest] = useState([]);
  const [data, setData] = useState({});
  const [topRestaurentTittle, setTopRestaurentTittle] = useState("");
  const [onlineTittle, setOnlineTittle] = useState("");
  const { coord: { lat, lng }, } = useContext(Coordinates);


  let result = null;

  //========== For Fetching data 
  async function fetchData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );

      result = await response.json();

      setData(result.data);
      setTopRestaurentTittle(result?.data?.cards.find(value => value?.card?.card?.id == "top_brands_for_you")?.card?.card?.header?.title),
        setOnlineTittle(result?.data?.cards.find(value => value?.card?.card?.id == "whats_on_your_mind")?.card?.card?.title);


      let mainData = result?.data?.cards.find(value => value?.card?.card?.id == "top_brands_for_you")?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      let mainData2 = result?.data?.cards.find(value => value?.card?.card?.id == "restaurant_grid_listing")?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      setTopRest(mainData || mainData2);





      let mainData3 = result?.data?.cards.find(value => value?.card?.card?.id == "whats_on_your_mind").card?.card?.imageGridCards?.info;
      setOnYourMind(mainData3);


    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [lat, lng]);



  //============ getting value from the redux store
  const filterVal = useSelector((state) => state.filterSlice.filterVal);


  //============ Filters Shown in home page 
  const filterData = TOpRest.filter((item) => {
    if (!filterVal) return true;

    switch (filterVal) {
      case "Ratings 4.0+":
        return item?.info?.avgRating > 4;
      case "Rs. 300-Rs. 600":
        return (
          item?.info?.costForTwo?.slice(1, 4) >= "300" &&
          item?.info?.costForTwo?.slice(1, 4) <= "600"
        );
      case "Offers":
        return;
      case "Less than Rs. 300":
        return item?.info?.costForTwo?.slice(1, 4) < "300";
      default:
        return true;
    }
  });


  //>>>>>>>>>>> For the places where Swiggy do not serve

  if (data.communication) {
    return (
      <div className="flex mt-64 overflow-hidden justify-center items-center flex-col h-full">
        <img
          className="w-72"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
          alt=""
        />
        <h1>Location unserviceable</h1>
      </div>
    );
  }

  return (
    <>
      <div className="w-full ">
        {
          TOpRest.length ? (<div className="w-full sm:w-[90%] lg:w-[80%] px-7  mx-auto mt-3 overflow-hidden">
            {
              onYourMind.length ? (
                <>
                  <OnYourMind data={onYourMind} />

                  <TopRest data={TOpRest} title={topRestaurentTittle} />
                </>
              ) : ""
            }

            <OnlineFoodDelivery
              data={filterVal ? filterData : TOpRest}
              title={onlineTittle}
            />
          </div>) : (<Shimmer></Shimmer>)}


      </div >
    </>
  );
};

export default Body;
