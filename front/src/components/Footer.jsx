import React, { useContext } from "react";
import { RiHomeLine } from "react-icons/ri";
import { RiBookReadLine } from "react-icons/ri";
import { HiOutlineHeart } from "react-icons/hi";
import { GoScreenFull } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";

const Footer = () => {
  const { account, setAccount } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHome = () => {
    navigate(`/main?address=${account}`);
  };

  const onClickList = () => {
    navigate("/list");
  };

  return (
    <div className="absolute w-full bottom-0 h-24 flex items-center border-t border-zinc-200 bg-white">
      <button
        onClick={onClickHome}
        className="h-full w-1/4 flex justify-center items-center border-r border-zinc-200"
      >
        <RiHomeLine className="text-3xl text-neutral-700 font-bold" />
      </button>
      <button
        onClick={onClickList}
        className="h-full w-1/4 flex justify-center items-center border-r border-zinc-200"
      >
        <RiBookReadLine className="text-3xl text-yellow-400" />
      </button>
      <button className="h-full w-1/4 flex justify-center items-center border-r border-zinc-200">
        <HiOutlineHeart className="text-3xl text-pink-400" />
      </button>
      <button className="h-full w-1/4 flex justify-center items-center">
        <GoScreenFull className="text-3xl text-blue-400" />
      </button>
    </div>
  );
};

export default Footer;
