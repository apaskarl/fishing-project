import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn";
import Warning from "./pages/Warning";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/warning" element={<Warning />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
