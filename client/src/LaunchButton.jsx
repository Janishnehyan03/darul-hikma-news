import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function LaunchButton() {
  const [launched, setLaunched] = useState(false);
  if (launched) {
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }
  return (
    <div className="btnBody">
      <div class="flex h-screen">
        <div class="m-auto">
          <button to={"/"} className="button" onClick={() => setLaunched(true)}>
            <span>LAUNCH </span>
          </button>
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
      {launched && (
        <h1
          style={{
            position: "absolute",
            top: "60%",
            left: "35.5%",
            fontSize: "1.5rem",
          }}
          id="successH1"
          className="text-green-600 font-bold bg-white px-4 py-2"
        >
          WEBSITE LAUNCHED SUCCESSFULLY
        </h1>
      )}
    </div>
  );
}

export default LaunchButton;
