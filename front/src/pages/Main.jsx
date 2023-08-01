import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { Link, useSearchParams } from "react-router-dom";
import NoticeModal from "../components/NoticeModal";
import axios from "axios";
import NftBox from "../components/Nftbox";

const Main = () => {
  const { account, setAccount } = useContext(AppContext);
  const [isModalOn, setIsModalOn] = useState(false);
  const [data, setData] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const address = searchParams.get("address");
  const [level, setLevel] = useState();

  const onClickModal = () => {
    setIsModalOn(!isModalOn);
  };

  const get_nft_data = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/nft/${account.address}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );

      setData(response.data);
      console.log(response.data);
      if (response.data.length < 3) {
        setLevel(
          `https://github.com/arypte/swf_hackathon_project/blob/main/Images/Emblem/Black.png?raw=true`
        );
      } else if (response.data.length < 5) {
        setLevel(
          `https://github.com/arypte/swf_hackathon_project/blob/main/Images/Emblem/Silver.png?raw=true`
        );
      } else {
        setLevel(
          `https://github.com/arypte/swf_hackathon_project/blob/main/Images/Emblem/Gold.png?raw=true`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // console.log(account) ;
    get_nft_data();
  }, []);

  return (
    <div className="h-full mb-24 overflow-y-scroll overflow-x-hidden scrollbar-hide">
      <div
        className="flex justify-around   h-44 items-center  border-b-4
       border-zinc-200"
      >
        <div>
          <div className="text-2xl font-bold">
            {account ? `${account.name},` : "User Name,"}
          </div>
          <div>Hi, Haechi, traveler!</div>
        </div>
        <div className="w-[70px] h-[70px]  bg-neutral-500 rounded-3xl ml-4 relative">
          {level && (
            <img
              className="justify-center items-center flex"
              src={`${level}`}
            ></img>
          )}
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
            {data?.map((v, i) => {
              return (
                <Link to = {`/nftdetail?id=${v.tokenID}`} key={i}  >
                  <NftBox  idx={v.tokenID} />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
