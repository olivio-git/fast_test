import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./Root";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

// axios.defaults.baseURL = "https://games.cba.org.bo/api/"
axios.defaults.baseURL = "http://localhost:3001/api/"


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>,
); 