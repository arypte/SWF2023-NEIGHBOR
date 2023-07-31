import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";

const Register = () => {
  const { account, setAccount } = useContext(AppContext);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  const navigate = useNavigate();

  const onClickRegister = () => {
    console.log("db저장 및 회원가입완료");

    setUsername("");
    setEmail("");

    navigate("/login");
  };

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
    <div className="min-h-screen flex flex-col items-center mt-52">
      <div className="text-3xl font-bold">Sign Up</div>
      <form className="w-72 h-16 rounded-[10px] border-2 border-zinc-300 mt-10 text-lg">
        <input
          className="w-full h-full opacity-50 text-black font-light tracking-tight px-4"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </form>
      <form className="w-72 h-16 rounded-[10px] border-2 border-zinc-300 mt-4 text-lg">
        <input
          className="w-full h-full opacity-50 text-black font-light tracking-tight px-4"
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </form>
      <div className="mt-10">
        <button onClick={onClickRegister} className="w-72 h-[54px]">
          <div className="w-full h-full bg-neutral-900 rounded-[30px] text-white font-bold hover:bg-neutral-700 flex justify-center items-center">
            Create account
          </div>
        </button>
        <div className=" flex justify-center mt-4">
          <span className="text-black text-opacity-50 text-sm font-normal">
            Already have an account?
          </span>
          {/* <Link to="/login"> */}
          <button
            onClick={onClickAccount}
            className="text-black text-sm font-normal underline tracking-wide ml-2"
          >
            Login in
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
