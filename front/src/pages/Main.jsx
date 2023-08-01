import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { Link, useSearchParams } from "react-router-dom";
import NoticeModal from "../components/NoticeModal";
import axios from "axios";

const Main = () => {
  const { account, setAccount } = useContext(AppContext);
  const [isModalOn, setIsModalOn] = useState(false);
  const [data , setData ] = useState() ;
  const [searchParams, setSearchParams] = useSearchParams();
  const address = searchParams.get("address");

  const onClickModal = () => {
    setIsModalOn(!isModalOn);
  };
  
  const get_nft_data = async () => {

    try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/nft/${address}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "any",
            },
          }
        );
        setData(response.data);
    } 
    catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    get_nft_data() ;
  }, []);

  return (
    <div className="h-full mb-24 overflow-y-scroll overflow-x-hidden scrollbar-hide">
      <div className="flex justify-around mt-16 border-b-4 pb-12 border-zinc-200">
        <div className="font-bold">
          <div className="text-2xl">
            {account ? `${account.name},` : "User Name,"}
          </div>
          <div>Hi, Haechi, traveler!</div>
        </div>
        <div className="w-[70px] h-[70px] bg-neutral-500 rounded-3xl ml-4 relative">
          엠블렘 박스
          {/* <button
            onClick={onClickModal}
            className="absolute top-[-20px] right-[-20px] w-10 h-10 bg-neutral-500 rounded-3xl"
          >
            알람
          </button> */}
          {/* {isModalOn && (
            <div>
              <NoticeModal />
            </div>
          )} */}
        </div>
      </div>
      <div className="mt-10">
        <div className="flex justify-between px-4 font-bold">
          <div className="text-2xl">My Haechi</div>
        </div>
        <div className="flex justify-center items-center mt-6 mb-6">
          <div className="grid grid-cols-2 gap-x-5 gap-y-6">
            
            <div className="h-52 w-40 bg-neutral-400 rounded-3xl">box</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
