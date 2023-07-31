import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

const Testpage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [jsonHash, setJsonHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitIpfs = async (e) => {
    try {
      e.preventDefault();

      if ( !name || !description) return;

      setIsLoading(true);
      console.log('a');

      const jsonData = {
        name,
        description,
        image: 'https://github.com/team-codeplay-project/images/blob/main/image1.png?raw=true',
        // image: `${process.env.NEXT_PUBLIC_PINATA_URL}/${imageRes.data.IpfsHash}`
      };

      console.log('aa');

      // Create a JSON Blob from the JSON data
      const jsonBlob = new Blob([JSON.stringify(jsonData)], {
        type: 'application/json',
      });

      // Create a File from the JSON Blob
      const jsonFile = new File([jsonBlob], `${name}.json`, {
        type: 'application/json',
      });

      const formData = new FormData();
      formData.append('file', jsonFile);
      formData.append(
        'pinataMetadata',
        JSON.stringify({
          name: `${name}_json`,
        })
      );
      formData.append(
        'pinataOptions',
        JSON.stringify({
          cidVersion: 0,
        })
      );

      console.log('aaa');
      const jsonRes = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${process.env.REACT_APP_PINATA_KEY}`,
          },
        }
      );

      if (jsonRes.status !== 200) return;

      setJsonHash(jsonRes.data.IpfsHash);
      console.log( jsonRes.data.IpfsHash);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const onClickMint = async () => {
    try {

      setIsLoading(true);

      // const res = await contract.methods
      //   .mintNft(
      //     // @ts-expect-error
      //     `${process.env.NEXT_PUBLIC_PINATA_URL}/${jsonHash}`
      //   )
      //   .send({ from: account });

      // if (Number(res.status) !== 1) return;

      setIsLoading(false);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  useEffect( () => {
    console.log( process.env.REACT_APP_PINATA_KEY );
  } ,[] ) ;

  return (
    <>
      {isLoading ? (
        <div className="text-3xl">Loading...</div>
      ) : (
        <>
         
          {jsonHash ? (
            <div className="flex flex-col gap-4 items-center">
              <div className="text-2xl">IPFS upload is successful.</div>
              <button className="btn-style" onClick={onClickMint}>
                Mint
              </button>
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={onSubmitIpfs}>
              <input
                className="btn-style px-2"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="btn-style px-2"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input className="btn-style" type="submit" value="Upload IPFS" />
            </form>
          )}
        </>
      )}
      
    </>
  );
};

export default Testpage;
