import { Outlet } from "react-router-dom";

import Header from "./components/header/Header.jsx";
import { useEffect } from "react";
import { useBoundStore } from "./stores/useBoundStore.js";

function App() {
  useEffect(() => {
    useBoundStore.getState().fetchAgentsData();
    useBoundStore.getState().fetchCallersData();
    useBoundStore.getState().fetchQueueCallsData();
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
