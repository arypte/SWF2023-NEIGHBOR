import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../App";

const Mint = () => {
  const { account, web3, nft_c } = useContext(AppContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [jsonHash, setJsonHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [chk, setChk] = useState(false);
  const [sp, setSP] = useSearchParams();
  const idx = sp.get("id");

  const get_db_data = async () => {
    try {
      // console.log( `${process.env.REACT_APP_BACKEND_URL}/nftdata/${idx}` ) ;
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/nftdata/${idx}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );
      setData(response.data[0]);
      setChk(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    get_db_data();
  }, []);

  useEffect(() => {
    if (chk) {
      onSubmitIpfs();
    }
  }, [chk]);

  const onSubmitIpfs = async () => {
    try {
      setIsLoading(true);

      const jsonData = {
        name: data.name,
        description: data.description,
        image: data.image,
        attributes: [
          { trait_type: "date", value: "Yellow" },
          { trait_type: "location", value: data.location },
        ],
      };

      // Create a JSON Blob from the JSON data
      const jsonBlob = new Blob([JSON.stringify(jsonData)], {
        type: "application/json",
      });

      // Create a File from the JSON Blob
      const jsonFile = new File([jsonBlob], `${name}.json`, {
        type: "application/json",
      });

      const formData = new FormData();
      formData.append("file", jsonFile);
      formData.append(
        "pinataMetadata",
        JSON.stringify({
          name: `${name}_json`,
        })
      );
      formData.append(
        "pinataOptions",
        JSON.stringify({
          cidVersion: 0,
        })
      );

      const jsonRes = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${process.env.REACT_APP_PINATA_KEY}`,
          },
        }
      );

      if (jsonRes.status !== 200) return;

      setJsonHash(jsonRes.data.IpfsHash);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const onClickMint = async () => {
    try {
      setIsLoading(true);

      console.log(
        `${process.env.REACT_APP_PINATA_URL}${jsonHash}`,
        idx,
        account.address
      );

      const res = await nft_c.methods
        .push_STAMP(`${process.env.REACT_APP_PINATA_URL}${jsonHash}`, idx)
        .send({ from: account.address });

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/nft`,
        {
          owner: account.address,
          tokenID: parseInt(res.logs[0].topics[3], 16),
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );

      // console.log( response ) ;

      // if (Number(res.status) !== 1) return;

      setIsLoading(false);

      navigate(`/main?address=${account.address}`);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex justify-center text-3xl font-bold pt-80">
          Loading...
        </div>
      ) : (
        <>
          {jsonHash && (
            <div className="min-h-screen flex flex-col pt-40 items-center">
              <img className="h-64 w-fit" src="" alt="nft image" />
              <button
                className="mt-6 w-40 h-12 rounded-3xl bg-neutral-700 text-white font-bold text-center hover:bg-neutral-500"
                onClick={onClickMint}
              >
                Mint
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Mint;
