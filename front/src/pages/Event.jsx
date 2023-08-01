import React, { useState } from "react";
import axios from "axios";
import TextToImage from "../components/TextToImage";

const Event = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [check, setCheck] = useState(false);
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
    <div className=" bg-red-200 p-8  mb-44">
      <div className=" text-center pb-5 text-md">
        {result && <div> Your Korean name is "{result}" </div>}
      </div>
      <TextToImage text={result} check={check} setCheck={setCheck} />
      <form className=" w-full flex flex-auto" onSubmit={onSubmitChat}>
        <input
          type="text"
          value={content}
          disabled={isLoading}
          name="chat"
          onChange={(e) => setContent(e.target.value)}
          className={`w-full  h-10 border-2 rounded-xl  p-4 border-gray-400/50 mt-5  shadow-lg `}
        ></input>
        <input
          type="submit"
          disabled={isLoading}
          className={`${
            isLoading && content ? "검색중..." : ""
          } m-3 font-bold  text-3x text-sky-500/50 bg-sky-400/20 px-6 py-4 rounded-xl hover:bg-sky-400/10 shadow-md`}
          value={isLoading && content ? "검색중..." : " 이름 검색"}
        />
      </form>
    </div>
  );
};

export default Event;
