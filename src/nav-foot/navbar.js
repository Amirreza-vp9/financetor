import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as GiIcons from "react-icons/gi";
import * as AiIcons from "react-icons/ai";
import Cookies from "universal-cookie";
import Chart from "../chart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");

  const logOut = () => {
    cookies.remove("token", { path: "/" });
    setIsOpen(false);
    window.location.assign("/");
  };

  return (
    <>
      <div className="bg-gray-600 flex fixed w-[100vw] gap-[2em] py-[1em]">
        {token ? (
          <div className="flex justify-center items-center ml-[1em]">
            <GiIcons.GiHamburgerMenu
              onClick={() => setIsOpen(true)}
              className="text-gray-100 text-[1.5em] hover:text-gray-400"
            />
          </div>
        ) : (
          ""
        )}
        <Link
          className="cursor-default font-medium ml-[1em] text-gray-100 hover:text-gray-400"
          to={"/home"}
        >
          Home
        </Link>
        <Link
          className="cursor-default font-medium text-gray-100 hover:text-gray-400"
          to={"/signIn"}
        >
          LogIn
        </Link>
      </div>
      {isOpen === true ? (
        <>
          <div
            onClick={() => setIsOpen(false)}
            className="absolute h-[100vh] w-[100vw] z-[1] bg-[rgba(0,0,0,.6)]"
          ></div>
          <div className="absolute z-[1] flex flex-col w-[9em] p-[1em] bg-gray-300 top-[3.5em]">
            <AiIcons.AiOutlineCloseSquare
              onClick={() => setIsOpen(false)}
              className="absolute top-[1px] right-[1px] text-[1.5em] hover:text-gray-500"
            />
            <div className="mb-[1em] font-medium">
              <Link
                onClick={() => setIsOpen(false)}
                className="cursor-default hover:text-gray-500"
                to={"/me"}
              >
                Me
              </Link>
            </div>
            <div className="font-medium mb-[1em]">
              <Link
                onClick={() => setIsOpen(false)}
                className="cursor-default hover:text-gray-500"
                to={"/createExpense"}
              >
                Create Expense
              </Link>
            </div>
            <div className="font-medium">
              <Link
                onClick={() => setIsOpen(false)}
                className="cursor-default hover:text-gray-500"
                to={"/createTag"}
              >
                Create Tag
              </Link>
            </div>
            <div className="font-medium mt-[1em]">
              <Link
                onClick={() => setIsOpen(false)}
                className="cursor-default hover:text-gray-500"
                to={"/myTags"}
              >
                My Tags
              </Link>
            </div>
            <div className="font-medium mt-[1em]">
              <div
                onClick={() => {
                  navigate("/myExpenses");
                  setIsOpen(false);
                }}
                className="cursor-default hover:text-gray-500"
              >
                My Expenses
              </div>
            </div>
            <div className="font-medium mt-[1em]">
              <div
                onClick={() => {
                  navigate("/chart");
                  setIsOpen(false);
                }}
                className="cursor-default hover:text-gray-500"
              >
                Charts
              </div>
            </div>
            <div className="font-medium mt-[1em]">
              <div
                onClick={logOut}
                className="cursor-default hover:text-gray-500"
              >
                LogOut
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
