import Web3 from "web3";
import { HAECHI_ABI, HAECHI_ADD } from "../web3.config";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { AppContext } from "../App";

const NftDetail = () => {
  const { account, setAccount } = useContext(AppContext);

  const web3 = new Web3(window.ethereum);
  const token_c = new web3.eth.Contract(HAECHI_ABI, HAECHI_ADD);
  const [data, setData] = useState();
  const [sp, setSP] = useSearchParams();
  const idx = sp.get("id");

  const getData = async () => {
    try {
      const URL = await token_c.methods.tokenURI(idx).call();
      const response = await axios.get(URL);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    data && (
      <div className="bg-neutral-200 flex justify-center h-screen pt-10 mb-24">
        <div className="flex flex-col items-center">
          <div className="min-w-screen">
            <img className="" src={data.image} alt="이미지 설명" />
          </div>
          <div className="w-full h-full bg-white mt-10 rounded-t-3xl">
            <div className="m-4">
              <div className="text-4xl font-bold">{data.name}</div>
              <div className="text-xl font-bold mt-2">{data.description}</div>
              <div className="flex flex-col justify-center mt-2">
                {data.attributes.map((v, i) => (
                  <div key={i}>
                    {v.trait_type} : {v.value}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <div className="mt-2">{data.name}</div>
          <div className="mt-1">{data.description}</div>
          <div className="flex flex-col justify-center items-center">
            속성
            {data.attributes.map((v, i) => (
              <div key={i}>
                {v.trait_type} : {v.value}
              </div>
            ))}
          </div> */}
        </div>
      </div>
    )
  );
};

export default NftDetail;
