import React from "react";

import { createRoot } from "react-dom/client"; // Import createRoot

import App from "./App"; // Import your main App component

import "./index.css"; // Import your CSS (if you have one)

// Get the root element from your HTML (usually <div id="root"></div>)

const container = document.getElementById("root");

// Create a root for your React app using createRoot

const root = createRoot(container); // createRoot returns a Root object.

// Render your App component inside the root

root.render(
  <div>
    {" "}
    {/* Use StrictMode in development for catching common bugs */}
    <App />
  </div>
);
