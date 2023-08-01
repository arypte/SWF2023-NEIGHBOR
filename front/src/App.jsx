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
import Mint from "./pages/Mint";
import NftDetail from "./pages/NftDetail";
import Event from "./pages/Event";
import AdminPage from "./pages/Adminpage";

export const AppContext = createContext();

function App() {
  const [temp, setTemp] = useState();
  const [account, setAccount] = useState("");

  return (
    <div>
      <AppContext.Provider value={{ temp , setTemp , account, setAccount }}>
        <BrowserRouter>
          <div className="iphone">
            <StatusBar />
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/main" element={<Main />} />
              <Route path="/list" element={<List />} />
              <Route path="/mint" element={<Mint />} />
              <Route path="/nftdetail" element={<NftDetail />} />
              <Route path="/event" element={<Event />} />
              <Route path="/adminpage" element={<AdminPage />} />
            </Routes>
            {account && <Footer />}
          </div>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
