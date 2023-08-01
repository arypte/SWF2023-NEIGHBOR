import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Welcome = () => {
  const images = [
    "/images/Welcome/Welcome1.png",
    "/images/Welcome/Welcome2.png",
    "/images/Welcome/Welcome3.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const [isClick, setIsClick] = useState(false);

  const onClickLogo = () => {
    setIsClick(true);
  };

  const onClickNext = () => {
    if (currentImageIndex === 2) {
      setCurrentImageIndex(0);
      navigate("/login");
    }

    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // test 끝난후 배경 색깔 지워야함

  return (
    <>
      {isClick ? (
        <div className="min-h-screen flex flex-col justify-between items-center relative">
          <img
            className="mt-10 absoulte left-0"
            src={images[currentImageIndex]}
            alt="Slider Image"
            style={{ objectFit: "cover" }}
          />

          <div className="w-[300px] mb-60">
            <button
              onClick={onClickNext}
              className="bg-neutral-900 text-white w-full py-4 rounded-full hover:bg-neutral-700 mt-16 font-bold"
            >
              Next
            </button>
            <Link to="/login">
              <button className="bg-neutral-200 text-black w-full py-4 mt-5 rounded-full hover:bg-neutral-300 font-bold">
                Skip
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-center">
          <button
            onClick={onClickLogo}
            className="h-full w-full flex justify-center items-center"
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
