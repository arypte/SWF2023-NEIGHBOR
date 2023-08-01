import React from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const QR = () => {
  const navigate = useNavigate();

  const onClickMint1 = () => {
    navigate("/mint?id=1");
  };
  const onClickMint2 = () => {
    navigate("/mint?id=2");
  };
  const onClickMint3 = () => {
    navigate("/mint?id=3");
  };
  const onClickMint4 = () => {
    navigate("/mint?id=4");
  };

  return (
    <>
      <div className="min-h-screen relative">
        <img className="opacity-100" src="images/QR.png" alt="QR Image" />
        <div className="bg-yellow-400 absolute w-72 h-72 top-[227px] left-[51px] rounded-3xl opacity-0">
          <div className="w-full h-1/2 flex">
            <button
              onClick={onClickMint1}
              className="bg-red-400 w-full"
            ></button>
            <button
              onClick={onClickMint2}
              className="bg-orange-400 w-full"
            ></button>
          </div>
          <div className="w-full h-1/2 flex">
            <button
              onClick={onClickMint3}
              className="bg-green-400 w-full"
            ></button>
            <button
              onClick={onClickMint4}
              className="bg-blue-400 w-full"
            ></button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QR;
