import Web3 from "web3";
import { HAECHI_ABI, HAECHI_ADD } from "../web3.config";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const NftDetail = () => {

const web3 = new Web3(window.ethereum);
const token_c = new web3.eth.Contract(HAECHI_ABI, HAECHI_ADD) ;
const [data, setData] = useState() ;
const [sp, setSP]=useSearchParams();
const idx = sp.get( 'id' ) ;

const getData = async() => {
    try {
    const URL = await token_c.methods.tokenURI(0).call() ;
    const response = await axios.get( URL ) ;
    setData( response.data ) ;
    } catch (error) {
        console.error(error) ;
    }
}

useEffect( () => {
    getData();
} ,[] );

return (
        
    ( data &&
    <div className="min-h-screen flex">
        <div className="flex flex-col justify-center items-center">
          <img src={data.image} alt="이미지 설명" />
          <div className="mt-2">{data.name}</div>
          <div className="mt-1">{data.description}</div>
          <div className="flex flex-col justify-center items-center">속성
            {data.attributes.map((v, i) => (
              <div key={i}>{v.trait_type} : {v.value}</div>
            ))}
          </div>
        </div>
      </div>
    ) )
}

export default NftDetail;
