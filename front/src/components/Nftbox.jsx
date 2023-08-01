import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";

const NftBox = ( idx ) => {

    const { account, setAccount , web3 , nft_c } = useContext(AppContext);
    const [ data , setData ] = useState() ;

    const getData = async () => {
        try {    
          console.log(idx.idx);
          const URL = await nft_c.methods.tokenURI(idx.idx).call();
          const response = await axios.get(URL);
          setData(response.data.image);
        } catch (error) {
          console.error(error);
        }
      };

      useEffect( () => {
        getData() ;
      } , [] ) ;

    return (
      ( data && <img className="h-52 w-40 bg-neutral-400 rounded-3xl" src={data} alt="이미지 설명" /> )
    )

}

export default NftBox;