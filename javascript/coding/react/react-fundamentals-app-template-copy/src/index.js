import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// Module 2:
// * import BrowserRouter from 'react-router-dom'
// * wrap App components with BrowserRouter

// Module 3:
// * import Provider from 'react-redux'
// * wrap your App + Browser with Redux Provider in src/index.js

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
