import React, { useState } from "react";
import "./App.css";
import DigitMemory from "./components/DigitMemory";
import SpacialMemory from "./components/SpacialMemory";
import GoNoGo from "./components/GoNoGo";

function App() {
  const [selectedComponent, setSelectedComponent] = useState<string | undefined>();
  const openMenu = () => {
    setSelectedComponent(undefined);
  };
  if (selectedComponent === undefined) {
    return (
      <div id="menu">
        <button onClick={() => setSelectedComponent("DigitMemory")}>DigitMemory</button>
        <button onClick={() => setSelectedComponent("SpacialMemory")}>SpacialMemory</button>
        <button onClick={() => setSelectedComponent("GoNo-Go")}>Go No-Go</button>
      </div>
    );
  }
  return (
    <div className="App textCenter">
      {selectedComponent === "SpacialMemory" ? (
        <SpacialMemory openMenu={openMenu} />
      ) : selectedComponent === "DigitMemory" ? (
        <DigitMemory openMenu={openMenu} />
      ) : selectedComponent === "GoNo-Go" ? (
        <GoNoGo openMenu={openMenu} />
      ) : (
        <div className="textCenter">
          <button onClick={() => setSelectedComponent("DigitMemory")}>DigitMemory</button>
          <button onClick={() => setSelectedComponent("SpacialMemory")}>SpacialMemory</button>
        </div>
      )}
    </div>
  );
}
export default App;
