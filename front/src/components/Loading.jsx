import React, { useState, useEffect } from "react";
import "../styles/Loading.css";

function IconPage() {
  return (
    <div className="Icon-container">
      <img src="/loading.gif" alt="Loading..." />
    </div>
  );
}

function LoadingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const StateChange = () => {
    setIsLoading(!isLoading);
  };

  return (
    <div className="icon">
      {isLoading && <IconPage />}
      <button onClick={StateChange}>{isLoading ? "" : ""}</button>
    </div>
  );
}

export default LoadingPage;
