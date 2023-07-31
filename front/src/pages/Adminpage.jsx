import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../App";

const chk = {};
const AdminPage = () => {
  const [data, setData] = useState();
  const [Goods_name, setName] = useState("상품 이름");
  const [winner, setWinner] = useState([]);
  const [n, setN] = useState();
  const [E, setE] = useState();
  const { token_c , web3 , account } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);

  const imageRef = useRef(null);
  //   const [check, setCheck] = useState(false);
  const [selectedFont, setSelectedFont] = useState(); // Default font is Arial
  const [img, setImg] = useState();
  const [ipfsHash, setIpfsHash] = useState();
  const [text, setText ] = useState() ; // event emit 에서 ke읽어오면됨
//  text : ke

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
      console.log("res");
      console.log(res);

      setIpfsHash(res.data.IpfsHash); // pinata
      console.log(res.data.IpfsHas);
      console.log(ipfsHash);
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (e) => {
    try {
      e.preventDefault();

      let start_block = await web3.eth.getBlockNumber();
      start_block = Number(start_block);

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/raffle/`,
        {
          start_block,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );

      get_Data();
    } catch (error) {
      console.error(error);
    }
  };
  const RaffleEnd = async (key) => {
    try {
      setN(key);
      let end_block = await web3.eth.getBlockNumber();
      end_block = Number(end_block);
      setE(end_block);

      console.log(`web3 ok`);

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/raffle/${key}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );

      console.log(response);

      console.log("db ok");

      const f_B = response.data.start_block; // fromBlock : 은 디비에서
      const e_B = end_block;

      const a = await token_c.getPastEvents("Raffle", {
        filter: { _idx: key },
        fromBlock: f_B,
        toBlock: e_B,
      });

      initializeChk();

      a.map((v) => {
        const nowdata = v.returnValues._add.toLowerCase();
        if (chk[nowdata] !== true) {
          chk[nowdata] = true;

          setWinner((prev) => [...prev, v.returnValues]);
        }
      });

      console.log("delete ing~");
    } catch (error) {
      console.error(error);
    }
  };

  const get_R_winner = async () => {
    if (winner.length != 0) {
      let idx = await token_c.methods.Raffle_End(n, winner.length).call();
      // idx = Number(idx);

      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/raffle/${n}}/done`,
        {
          end_block: E,
          winner: winner[idx],
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }

        // setText( winner[ idx ].ko ) ;
      );
      get_Data();
    }
  };

  useEffect(() => {
    const length = winner.length;
    if (length !== 0) {
      setWinner([]);
      get_R_winner();
    }
  }, [winner]);

  const initializeChk = () => {
    for (const key in chk) {
      if (chk.hasOwnProperty(key)) {
        delete chk[key];
      }
    }
  };

  const get_Data = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/raffle`,
        {
          params: {
            isEnd: false,
          },
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // get_Data();
    console.log('aaaaa');
  }, []);

  return (
    <div >
    <div >
      <form onSubmit={create}>
        <button className="p-2 m-2">래플 생성</button>
      </form>

      {isLoading ? (
        <div>loading</div>
      ) : (
        data?.map((v, i) => {
          return (
            <button
              key={i}
              onClick={() => RaffleEnd(v.id)}
              className="raffle-end-button">
              {v.id} {v.name} 래플 종료
            </button>
          );

          return null;
        })
      )}
    </div>
  </div>
  );
};

export default AdminPage;