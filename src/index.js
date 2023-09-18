import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./router";
import "./assets/reset.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={Router} />); // import한 Router 파일 이용하겠다고 명시
