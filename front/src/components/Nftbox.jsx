import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";

const NftBox = (idx) => {
  const { account, setAccount, web3, nft_c } = useContext(AppContext);
  const [data, setData] = useState();
  const [name, setName] = useState();

  const getData = async () => {
    try {
      console.log(idx.idx);
      const URL = await nft_c.methods.tokenURI(idx.idx).call();
      const response = await axios.get(URL);
      setData(response.data.image);
      setName(response.data.name);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    data && (
      <div>
        <img
          className="h-40 w-40 bg-white border-gray-200 border-2 rounded-t-3xl"
          src={data}
          alt="이미지 설명"
        />
        <div className="h-[48px] bg-zinc-500 opacity-60 text-white text-center items-center flex justify-center  rounded-b-3xl">
          {name}
        </div>
      </div>
    )
  );
};

export default NftBox;
