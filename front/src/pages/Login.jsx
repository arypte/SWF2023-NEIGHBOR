import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";

const Login = () => {
  const { account, setAccount } = useContext(AppContext);

  const onClickAccount = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickLogOut = () => {
    setAccount("");
  };

  useEffect(() => {
    console.log(account);
  });

  return (
    <div className="bg-blue-300 min-h-screen flex flex-col items-center">
      <img
        className="bg-red-300 w-[300px] h-[450px] mt-20"
        src=""
        alt="Login Image"
      />
      <div className="mt-16 font-bold">
        <Link to="/register">
          <button className="bg-neutral-900 text-white w-[140px] py-4 rounded-full hover:bg-neutral-700 mr-6">
            Register
          </button>
        </Link>
        <Link to="/main">
          <button
            onClick={onClickAccount}
            className="bg-white text-black w-[140px] py-4 mt-5 rounded-full hover:bg-neutral-300"
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
