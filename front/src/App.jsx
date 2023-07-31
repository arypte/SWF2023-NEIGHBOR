import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import StatusBar from "./components/StatusBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import List from "./pages/List";

export const AppContext = createContext();

function App() {
  const [account, setAccount] = useState("");

  return (
    <div>
      <AppContext.Provider value={{ account, setAccount }}>
        <BrowserRouter>
          <div className="iphone">
            <StatusBar />
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/main" element={<Main />} />
              <Route path="/list" element={<List />} />
            </Routes>
            {account && <Footer />}
          </div>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
