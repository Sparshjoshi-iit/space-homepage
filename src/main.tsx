import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Lunar3DView from "./pages/Lunar3DView"; // 👈 you'll create this page
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/lunar3d" element={<Lunar3DView />} />
    </Routes>
  </BrowserRouter>
);
