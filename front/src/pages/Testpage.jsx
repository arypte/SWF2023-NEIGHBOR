import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

const Testpage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [jsonHash, setJsonHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);


  const onChangeImageFile = (e) => {
    if (!e.target.files) return;

    setImageFile(e.target.files[0]);
  };

  const onSubmitIpfs = async (e) => {
    try {
      e.preventDefault();

      if (!imageFile || !name || !description) return;

      setIsLoading(true);

      const imageFormData = new FormData();
      imageFormData.append('file', imageFile);
      imageFormData.append(
        'pinataMetadata',
        JSON.stringify({
          name: `${name}_image`,
        })
      );
      imageFormData.append(
        'pinataOptions',
        JSON.stringify({
          cidVersion: 0,
        })
      );

      const imageRes = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        imageFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_KEY}`,
          },
        }
      );

      const jsonData = {
        name,
        description,
        image: '',
      };

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

      const jsonRes = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_KEY}`,
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

      // const res = await contract.methods
      //   .mintNft(
      //     // @ts-expect-error
      //     `${process.env.NEXT_PUBLIC_PINATA_URL}/${jsonHash}`
      //   )
      //   .send({ from: account });

      // if (Number(res.status) !== 1) return;

      setIsLoading(false);
      setIsOpenModal(true);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

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
              <label className="btn-style text-center truncate px-2" htmlFor="imageFile">
                {imageFile ? imageFile.name : 'Choose image.'}
              </label>
              <input
                className="hidden"
                id="imageFile"
                type="file"
                onChange={onChangeImageFile}
              />
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
