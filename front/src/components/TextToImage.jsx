import React, { useRef, useState, useEffect, useContext } from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import { AppContext } from "../App";

// Placeholder image URL
// const PLACEHOLDER_IMAGE_URL = "https://example.com/placeholder-image.png";

function TextToImage({ check, setCheck, text, idx }) {
  const imageRef = useRef(null);
  //   const [check, setCheck] = useState(false);
  const { nft_c, account } = useContext(AppContext);

  const [selectedFont, setSelectedFont] = useState(); // Default font is Arial
  const [img, setImg] = useState();
  const [ipfsHash, setIpfsHash] = useState();
  const [check2, setCheck2] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const get_R_data = async () => {
    setIsLoading(true);
    console.log(idx);
    try {
      console.log(`${process.env.REACT_APP_BACKEND_URL}/raffle/${idx}`);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/raffle/${idx}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );

      const endchk = response.data.isEnd;

      if (endchk == true) {
        console.log("none");
      } else {
        const f_B = response.data.start_block; // fromBlock : 은 디비에서
        const a = await nft_c.getPastEvents("Raffle", {
          filter: { _idx: idx },
          fromBlock: f_B,
          toBlock: "latest",
        });
        for (const v of a) {
          const nowdata = v.returnValues._add.toLowerCase();
          if (nowdata === account.address) {
            setCheck2(false);
            break; // 중지
          }
        }
      }

      setIsLoading(false);
      //console.log( 'chk_raffle!' ) ;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const onclickRaffle_participate = async () => {
    setIsLoading(true);
    try {
      await nft_c.methods
        .Raffle_participate(idx, "a", text, selectedFont)
        .send({ from: account.address });
      get_R_data();
    } catch (error) {
      setIsLoading(false);
      error(error);
    }
  };

  useEffect(() => {
    if (idx) {
      get_R_data();
    }
  }, [idx]);

  const textToImage = async () => {
    const imageWidth = 800;
    const imageHeight = 500;
    const font_size = 100;
    const background_color = "#ffffff"; // White background
    const text_color = "#000000"; // Black text

    // Create a canvas element
    const canvas = await document.createElement("canvas");
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    const ctx = await canvas.getContext("2d");

    // Set background color
    ctx.fillStyle = background_color;
    ctx.fillRect(0, 0, imageWidth, imageHeight);

    // Load the selected font
    const font = `${font_size}px ${selectedFont}`;
    ctx.font = font;
    ctx.fillStyle = text_color;

    // Calculate the size of the text to center it
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight =
      textMetrics.actualBoundingBoxAscent +
      textMetrics.actualBoundingBoxDescent;
    const x = (imageWidth - textWidth) / 2;
    const y =
      (imageHeight - textHeight) / 2 + textMetrics.actualBoundingBoxAscent;

    // Draw the text on the canvas
    ctx.fillText(text, x, y);

    // Convert canvas to data URL
    const dataURL = canvas.toDataURL("image/png");

    // Set the image source to the generated data URL
    // console.log('?' , dataURL ) ;
    imageRef.current.src = dataURL;
  };

  // Pinata 업로드
  const uploadToPinata = async () => {
    try {
      // // base64 데이터를 Blob으로 변환
      // const response = await fetch(canvasImgurl);
      // const data = await response.blob();

      // // Blob을 File 객체로 변환
      // const file = new File([data], selectedFile.name, { type: data.type });

      const formData = new FormData();
      formData.append("file", img);

      // formData.append(
      //   "pinataMetadata",
      //   JSON.stringify({
      //     name: `${name}_image`,
      //   })
      // );

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${process.env.REACT_APP_PINATA_KEY}`,
          },
        }
      );

      if (res.status !== 200) return;

      setIpfsHash(res.data.IpfsHash);
      // console.log(res.data.IpfsHas);
      // console.log(ipfsHash);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFontChange = (event) => {
    setSelectedFont(event.target.value);
  };

  const handleButtonClick = () => {
    console.log(selectedFont);
    textToImage();
    setCheck(true);
  };

  useEffect(() => {
    console.log(img);
    // uploadToPinata();
  }, [img]);

  //   useEffect(() => {
  //     // When the component mounts, show the placeholder image in the imageRef
  //     imageRef.current.src = PLACEHOLDER_IMAGE_URL;
  //   }, []);

  return (
    <div className="mt-4 flex flex-col items-center">
      <select
        className="px-4 w-[300px] h-10 text-lg rounded-xl font-bold"
        id="fontSelect"
        onChange={handleFontChange}
      >
        <option value="">Choose Font</option>
        <option value="SeoulHangangM">SeoulHangangM 한강체</option>
        <option value="SeoulNamsanM">SeoulNamsanM 남산체</option>
        <option value="Shilla_CultureB-Bold">
          Shilla CultureB Bold 신라체
        </option>
      </select>
      <br />
      {selectedFont && (
        <button
          onClick={handleButtonClick}
          className="w-[300px] h-[60px] rounded-2xl bg-neutral-700 text-white font-bold text-center hover:bg-neutral-500"
        >
          Generate Image
        </button>
      )}
      <br />
      {check == true && (
        <div className="flex flex-col items-center mt-4">
          <img ref={imageRef} alt="Generated Image" />
          {isLoading == false && check2 == true && (
            <button
              className="mt-10 w-[300px] h-[60px] rounded-2xl bg-neutral-700 text-white font-bold text-center hover:bg-neutral-500"
              onClick={onclickRaffle_participate}
            >
              Apply
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TextToImage;
