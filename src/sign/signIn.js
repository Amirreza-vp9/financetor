import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const SIGN_IN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submit] = useMutation(SIGN_IN);
  const cookies = new Cookies();
  const navigate = useNavigate();

  const click = async () => {
    try {
      if (username === "" || password === "")
        return alert("Please enter your name");
      const {
        data: {
          login: { token },
        },
      } = await submit({
        variables: {
          username: username,
          password: password,
        },
      });
      if (token) {
        cookies.set("token", token, { path: "/" });
        navigate("/home");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-900 h-[100vh] w-[100vw]">
      <div className="w-[320px] cursor-default absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] py-[1em] px-[2em] bg-gray-700">
        <div className="text-center text-[2rem] p-[1em]">
          <h2 className="text-gray-100 font-bold">LogIn</h2>
        </div>
        <div className="mb-[4em]">
          <h5 className="text-gray-200 mb-[.5em]">username</h5>
          <input
            className="px-[.5em] py-[2px] w-[100%]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-[4em]">
          <h5 className="text-gray-200 mb-[.5em]">password</h5>
          <input
            type="password"
            className="px-[.5em] py-[2px] w-[100%]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={click}
          className="bg-gray-400 text-gray-800 w-[100%] py-[2px] font-medium hover:bg-gray-300"
        >
          Submit
        </button>
        <div className="flex mt-[1em]">
          <h5 className="text-gray-400">Dont have ant account's ?</h5>
          <button
            className="text-gray-400 ml-[5px] rounded-[1em] bg-gray-900 p-[.25em] hover:bg-gray-800"
            onClick={() => navigate("/signUp")}
          >
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
