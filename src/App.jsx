import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Head from "./components/Head";
import RestaurantMenu from "./components/RestaurantMenu";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Head />}>
          <Route path="/" element={<Body />}></Route>
          <Route
            path="/restaurent-menu/:id"
            element={<RestaurantMenu />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
