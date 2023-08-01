import React, { useEffect, useState } from "react";
import axios from "axios";
import TextToImage from "../components/TextToImage";

const Event = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [check, setCheck] = useState(false);
  const [data, setData] = useState();

  const get_Data = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/raffle/`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
          params: {
            isEnd: false,
          },
        }
      );
      setData(response.data[0].id);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // console.log( 'test get data' ) ;
    get_Data();
  }, []);

  const onSubmitChat = async (e) => {
    try {
      e.preventDefault();
      if (!content) return;
      setCheck(false);
      setResult("");
      setContent(e.target.elements.chat.value);

      setIsLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_GPT_URL}/chat`,
        {
          content: `이 " '${content}' " 영어 이름을 한글 발음으로 적어줘. 아름 뒤에 (Tom) 같은 설명 붙이지마. :한국 이름:과 같은의 형식으로 만 표시해줘 . 예시 :톰:,:토니:,:자스민: 등.  `,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          },
        }
      );

      setResult(response.data.result);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-200">
      <form className=" w-[300px] flex gap-2 pt-4" onSubmit={onSubmitChat}>
        <input
          type="text"
          value={content}
          disabled={isLoading}
          placeholder="Write Your Name"
          name="chat"
          onChange={(e) => setContent(e.target.value)}
          className={`w-full h-10 border-2 rounded-2xl text-sm font-bold  p-4 border-gray-400/50 shadow-lg `}
        ></input>
        <input
          type="submit"
          disabled={isLoading}
          className={`${
            isLoading && content ? "Translating..." : ""
          } w-32 text-sm text-white bg-neutral-700 rounded-2xl hover:bg-neutral-400 shadow-md`}
          value={isLoading && content ? "..." : "Translate"}
        />
      </form>
      <div className=" text-center pt-5 text-md font-bold">
        {result && (
          <div className="px-5 py-2 rounded-3xl">
            {" "}
            Your Korean name is "{result}"{" "}
          </div>
        )}
      </div>
      {result && (
        <TextToImage
          text={result}
          check={check}
          setCheck={setCheck}
          idx={data}
        />
      )}
    </div>
  );
};

export default Event;
