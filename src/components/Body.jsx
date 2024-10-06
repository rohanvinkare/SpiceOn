import OnlineFoodDelivery from "./OnlineFoodDelivery";
import OnYourMind from "./OnYourMind";
import TopRest from "./TopRest";
import { useState, useEffect } from "react";

const Body = () => {
  const [onYourMind, setOnYourMind] = useState([]);
  const [TOpRest, setTopRest] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.37240&lng=78.43780&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      const result = await response.json();
      // console.log(result);
      console.log(result?.data?.cards[1]?.card);

      console.log(
        result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );

      setOnYourMind(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);

      // console.log(result);
      setTopRest(
        result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="w-[75%] mx-auto mt-3 overflow-hidden">
          <OnYourMind data={onYourMind} />
          <TopRest data={TOpRest} />
          <OnlineFoodDelivery data={TOpRest} />
        </div>
      </div>
    </>
  );
};

export default Body;
