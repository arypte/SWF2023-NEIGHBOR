import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { account, setAccount } = useContext(AppContext);
  const navigate = useNavigate();

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

  useEffect(() => {
    console.log(account);
    if (account !== "") {
      navigate(`/main?address=${account}`);
    }
  }, [account]);

  return (
    <div className="min-h-screen flex flex-col items-center">
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
        <button
          onClick={onClickAccount}
          className="bg-neutral-200 text-black w-[140px] py-4 mt-5 rounded-full hover:bg-neutral-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
