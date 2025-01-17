import { Route, Routes } from "react-router-dom";
import { lazy, useState, Suspense } from "react";
import { Coordinates } from "./context/contextApi";
import { useSelector } from "react-redux";
import Help from "./components/Help";
// import Body from "./components/Body";
// import Head from "./components/Head";
// import RestaurantMenu from "./components/RestaurantMenu";
// import Cart from "./components/Cart";
// import Search from "./components/Search"

// ==========> Having Lazy loading for components
const Body = lazy(() => import("./components/Body"))
const Head = lazy(() => import("./components/Head"))
const Search = lazy(() => import("./components/Search"));
const Cart = lazy(() => import("./components/Cart"));
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu"));
// const Help = lazy(()=>{import("./components/Help")})

function App() {

  const [coord, setCoord] = useState({ lat: 17.3724, lng: 78.4378 });


  // ======== with redux
  const visible = useSelector((state) => state.toogleSlice.searchBarToogle);
  const loginVisible = useSelector((state) => state.toogleSlice.loginToggle);


  return (
    <>
      {/* <CartContext.Provider value={{ cartData, setCartData }}> */}
      <Coordinates.Provider value={{ coord, setCoord }}>
        {/* <Visibility.Provider value={{ visible, setVisible }}> */}
        <div className={visible || loginVisible ? "max-h-screen overflow-hidden" : " "}>
          {/*Suspense For Lazy Loading*/}
          <Suspense>
            {/*Routes for Routing*/}
            <Routes>
              <Route path="/" element={<Head />}>
                <Route path="/" element={<Body />}></Route>
                <Route path="/restaurent-menu/:id" element={<RestaurantMenu />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/search" element={<Search></Search>}></Route>
                <Route path="/help" element={<Help></Help>}></Route>
                <Route path="*" element={<h1>Coming Soon</h1>}></Route>
              </Route>
            </Routes>
          </Suspense>
        </div>
        {/* </Visibility.Provider> */}
      </Coordinates.Provider>
      {/* </CartContext.Provider> */}
    </>
  );
}

export default App;
