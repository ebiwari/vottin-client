import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Result } from "./pages/Result";
import { NomineeForm } from "./pages/NomineeForm";
import { AssignPix } from "./pages/AssignPix";

import { ListResult } from "./pages/ListResult";
import "./App.css";

export const URL_ADDRESS = "https://vottin-api.onrender.com";

//xport const URL_ADDRESS = "http://localhost:9090";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NomineeForm />} />

          <Route path="/nominees" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/listing" element={<ListResult />} />

          <Route path="/profile" element={<AssignPix />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
