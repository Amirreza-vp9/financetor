import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./nav-foot/navbar";
import Cookies from "universal-cookie";

const Weblayout = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  return (
    <>
      <Navbar />
      {token ? (
        <div className="bg-gray-900 min-h-[100vh] py-[1em] w-[100vw] pt-[4em]">
          <Outlet />
        </div>
      ) : (
        <div className="bg-gray-900 flex justify-center items-center h-[100vh] w-[100vw]">
          <div className="text-white text-[3rem] font-[italic]">
            Please LogIn
          </div>
        </div>
      )}
    </>
  );
};

export default Weblayout;
