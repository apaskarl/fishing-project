import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn";
import Message from "./pages/Message";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Message />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
