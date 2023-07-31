import React, { useState } from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  const [isClick, setIsClick] = useState(false);

  const onClickLogo = () => {
    setIsClick(true);
  };

  const onClickNext = () => {
    console.log("다음이미지");
  };

  // test 끝난후 배경 색깔 지워야함

  return (
    <>
      {isClick ? (
        <div className="bg-blue-300 min-h-screen flex flex-col items-center">
          <img
            className="bg-red-300 w-[300px] h-[450px] mt-20"
            src=""
            alt="Welcome Images"
          />
          <button
            onClick={onClickNext}
            className="bg-neutral-900 text-white w-[300px] py-4 rounded-full hover:bg-neutral-700 mt-16 font-bold"
          >
            Next
          </button>
          <Link to="/login">
            <button className="bg-white text-black w-[300px] py-4 mt-5 rounded-full hover:bg-neutral-300 font-bold">
              Skip
            </button>
          </Link>
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-center">
          <button
            onClick={onClickLogo}
            className="h-full w-full bg-red-300 flex justify-center items-center"
          >
            <img
              className="bg-blue-300 mb-40 w-[200px] h-[200px]" // Logo 이미지 넣을떄 따로 값 바꿔주면됨
              src=""
              alt="Logo Image"
            />
          </button>
        </div>
      )}
    </>
  );
};

export default Welcome;
