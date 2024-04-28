import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App.jsx";
import Homescreen from "./components/screens/home-screen/index.jsx";
import AgentsScreen from "./components/screens/agent-screen/index.jsx";

import "./index.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Homescreen />} />
      <Route index={true} path="/agents" element={<AgentsScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
      <ToastContainer theme="dark"/>
    </RouterProvider>
  </React.StrictMode>
);
