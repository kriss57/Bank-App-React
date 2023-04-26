import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import PublicRouter from "./_utils/PublicRouter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PublicRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
