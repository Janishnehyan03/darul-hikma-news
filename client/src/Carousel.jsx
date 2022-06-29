import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "./Axios";
import { Buffer } from "buffer";

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
      5000
    );

    return () => {};
  }, [current]);

  useEffect(() => {
    getAllPosters();
  }, []);
  return (
    <div id="container">
      {posters.length > 0 && (
        <>
          <img
            className="w-full h-screen"
            src={`data:${
              posters[current].img.contentType
            };base64, ${Buffer.from(posters[current].img.data).toString(
              "base64"
            )}`}
          />
        </>
      )}
    </div>
  );
}

export default Carousel;
