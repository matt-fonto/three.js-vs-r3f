import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ThreeComponent from "./Three";
import R3F from "./R3F";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ThreeComponent />
        <R3F />
      </div>
    </>
  );
}

export default App;
