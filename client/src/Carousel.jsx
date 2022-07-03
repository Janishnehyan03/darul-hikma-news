import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "./Axios";
import { Buffer } from "buffer";
import { CircularProgress } from "@material-ui/core";

function Carousel() {
  const [current, setCurrent] = useState(0);
  const [posters, setPosters] = useState([]);

  const getAllPosters = async () => {
    let res = await Axios.get("/news");
    setPosters(res.data);
  };

  useEffect(() => {
    setTimeout(
      () =>
        setCurrent((prevIndex) =>
          prevIndex === posters.length - 1 ? 0 : prevIndex + 1
        ),
      10000
    );

    return () => {};
  }, [current]);

  useEffect(() => {
    getAllPosters();
  }, []);
  return (
    <div id="container" className="w-full h-screen">
      {posters.length > 0 ? (
        <>
          <img className="w-full h-screen" src={posters[current].img} />
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default Carousel;
