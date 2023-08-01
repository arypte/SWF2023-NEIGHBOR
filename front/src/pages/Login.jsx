import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { account, setAccount , setTemp } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickAccount = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/${accounts[0]}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );

      console.log( response.data ) ;

      if (!response.data.ok) {
        setTemp(accounts[0]);
        navigate('/register');
      }
      else{
      setAccount(response.data.user);
      navigate(`/main?address=${accounts[0]}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <img
        className="bg-red-300 w-[300px] h-[450px] mt-20"
        src=""
        alt="Login Image"
      />
      <div className="mt-16 font-bold">
        
        <button 
        onClick={onClickAccount}
        className="bg-neutral-900 text-white w-[140px] py-4 rounded-full hover:bg-neutral-700 mr-6">
            Register
        </button>
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
