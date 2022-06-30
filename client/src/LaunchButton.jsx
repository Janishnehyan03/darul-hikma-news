import React from "react";
import { Link } from "react-router-dom";

function LaunchButton() {
  return (
    <div className="btnBody">
      <div class="flex h-screen">
        <div class="m-auto">
          <Link to={"/"} className="button">
            <span>LAUNCH </span>
          </Link>
        </div>
        <h1
          className="text-white mx-auto"
          style={{
            position: "absolute",
            top: "35%",
            left: "43%",
            fontSize: "1.5rem",
          }}
        >
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </h1>
      </div>
    </div>
  );
}

export default LaunchButton;
