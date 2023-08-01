import React from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const QR = () => {
  const navigate = useNavigate();

  const onClickMint = () => {
    navigate("/mint?id=2");
  };

  return (
    <>
      <div className="min-h-screen relative">
        <img className="opacity-100" src="images/QR.png" alt="QR Image" />
        <button
          onClick={onClickMint}
          className="bg-yellow-400 absolute w-72 h-72 top-[227px] left-[51px] rounded-3xl opacity-5"
        ></button>
      </div>
      <Footer />
    </>
  );
};

export default QR;
