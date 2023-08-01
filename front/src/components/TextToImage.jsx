import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import axios from "axios";

// Placeholder image URL
// const PLACEHOLDER_IMAGE_URL = "https://example.com/placeholder-image.png";

function TextToImage({ check, setCheck, text }) {
  const imageRef = useRef(null);
  //   const [check, setCheck] = useState(false);
  const [selectedFont, setSelectedFont] = useState(); // Default font is Arial
  const [img, setImg] = useState();
  const [ipfsHash, setIpfsHash] = useState();

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
    setSelectedFont(event.target.value) ;
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
    <div className=" bg-yellow-200">
      {check == true && <img ref={imageRef} alt="Generated Image" />}
      <label htmlFor="fontSelect">Select Font: </label>
      <select id="fontSelect" onChange={handleFontChange}>
        <option value="">선택 해주세요</option>
        <option value="SeoulHangangM">SeoulHangangM 한강체</option>
        <option value="SeoulNamsanM">SeoulNamsanM 남산체</option>
        <option value="Shilla_CultureB-Bold">
          Shilla CultureB Bold 신라체
        </option>
      </select>
      <br />
      { selectedFont && <button onClick={handleButtonClick}>Generate Image</button> }
      <br />
      <button >추후 응모하기 or 응모버튼</button>
    </div>
  );
}

export default TextToImage;
