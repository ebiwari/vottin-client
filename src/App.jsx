import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Result } from "./pages/Result";
import { NomineeForm } from "./pages/NomineeForm";
import { AssignPix } from "./pages/AssignPix";

import { ListResult } from "./pages/ListResult";

import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

import { Category } from "./pages/Category";

import { URL_ADDRESS } from "./components/Api";
import "./App.css";
import { AssignsNominees } from "./pages/AssignsNominees";

//export const URL_ADDRESS = "https://vottin-api.onrender.com";
//export const URL_ADDRESS = "http://localhost:9090";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/nominees" element={<NomineeForm />} />
          <Route path="/result" element={<Result />} />
          <Route path="/listing" element={<ListResult />} />
          <Route path="/profile" element={<AssignPix />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category" element={<Category />} />

          <Route path="/assigns" element={<AssignsNominees />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
