import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "./config/Provider.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider
      apiKey="eyJuYW1lIjoiWFlaIFNvbHV0aW9uIiwic2x1ZyI6Inh5ei1zb2x1dGlvbiIsImFkZHJlc3MiOiIweEU2NDBkZDYzQzZDYjI0Y0Y4MjJCQjNhRDU5N0ZkRTA5QzRGQThhNUIifQ=="
      walletConnectProjectId={"45ff4575bd83a36b904dbf116e3b259e"}
      alchemyId={"RuduVAbxEGLsAZlRsvGICDI_viZYUghp"}
    >
      <BrowserRouter>
        {" "}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
