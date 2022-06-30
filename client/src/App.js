import React from "react";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import AddData from "./AddData";
import Carousel from "./Carousel";
import LaunchButton from "./LaunchButton";

function App() {
  return (
    <BrowserRouter>
      <Route path={"/"} exact={true}>
        <Carousel />
      </Route>
      <Route path={"/add-data"} component={AddData} />
      <Route path={"/btn"} component={LaunchButton} />
    </BrowserRouter>
  );
}

export default App;
