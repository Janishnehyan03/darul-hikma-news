import React from "react";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import AddData from "./AddData";
import Carousel from "./Carousel";

function App() {
  return (
    <BrowserRouter>
      <Route path={"/"} exact={true}>
        <Carousel />
      </Route>
      <Route path={"/add-data"} component={AddData} />
    </BrowserRouter>
  );
}

export default App;
