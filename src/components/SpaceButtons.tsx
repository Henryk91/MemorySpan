import React, { useState } from "react";

function SpaceButtons({
  calc,
  set,
  startTest,
  resetClick,
  smartClick,
  increaseSpan,
  decreaseSpan,
  toggleCheckForward,
  toggleIsSlow,
  checkForward,
  isSlow,
  isSmart,
  activeRound,
}: {
  calc: string;
  set: (val: { showCalc: string; retVal: string }) => void;
  startTest: () => void;
  resetClick: () => void;
  smartClick: () => void;
  increaseSpan: () => void;
  decreaseSpan: () => void;
  toggleCheckForward: () => void;
  toggleIsSlow: () => void;
  checkForward: boolean;
  isSlow: boolean;
  isSmart: boolean;
  activeRound: boolean;
}) {
  const [lastButton, setLastButton] = useState<string>("");
  const [intervalIdState, setIntervalIdState] = useState<NodeJS.Timeout>();
  const numberClick = (e: number) => {
    setLastButton(`${e}`);
    set({ showCalc: `${e}`, retVal: "0" });
    if (intervalIdState) {
      clearTimeout(intervalIdState);
    }
    const x = setTimeout(() => {
      setLastButton("");
    }, 1000);
    setIntervalIdState(x);
  };

  const checkActive = (buttonNumber: number) => {
    return calc === `${buttonNumber}` || lastButton === `${buttonNumber}` ? "buttonActiveClass" : "";
  };

  return (
    <div className="flex-buttons">
      <div className="buttonRow">
        <button id="clear" className="smallButtonFont" onClick={resetClick}>
          AC
        </button>
        <button id="clear" onClick={smartClick} className="smallButtonFont">
          Smart
          {isSmart ? " on" : " off"}
        </button>
        <button id="multiply" className="smallButtonFont" onClick={toggleCheckForward}>
          {checkForward ? "Forward" : "Reverse"}
        </button>
      </div>
      <div className="buttonRow">
        <button className={checkActive(7)} id="seven" onClick={() => numberClick(7)}></button>
        <button className={checkActive(8)} id="eight" onClick={() => numberClick(8)}></button>
        <button className={checkActive(9)} id="nine" onClick={() => numberClick(9)}></button>
        <button id="subtract" className={`${checkActive(10)}`} onClick={() => numberClick(10)}></button>
      </div>
      <div className="buttonRow">
        <button className={checkActive(4)} id="four" onClick={() => numberClick(4)}></button>
        <button className={checkActive(5)} id="five" onClick={() => numberClick(5)}></button>
        <button className={checkActive(6)} id="six" onClick={() => numberClick(6)}></button>
        <button id="add" className={`${checkActive(11)}`} onClick={() => numberClick(11)}></button>
      </div>
      <div className="buttonRow">
        <button className={checkActive(1)} id="one" onClick={() => numberClick(1)}></button>
        <button className={checkActive(2)} id="two" onClick={() => numberClick(2)}></button>
        <button className={checkActive(3)} id="three" onClick={() => numberClick(3)}></button>
        <button className={checkActive(0)} id="three" onClick={() => numberClick(0)}></button>
      </div>
      <div className="buttonRow">
        <button id="subtract" onClick={decreaseSpan}>
          <span className="smallButtonFont">Span </span>
          <span className="smallButtonFont"> -</span>
        </button>
        <button id="add" onClick={increaseSpan}>
          <span className="smallButtonFont">Span </span>
          <span className="smallButtonFont"> +</span>
        </button>
        <button id="decimal" onClick={toggleIsSlow}>
          <span className="smallButtonFont">{isSlow ? "Slow" : "Fast"} </span>
        </button>
        <button id="three " onClick={startTest}>
          {!activeRound ? "▶" : "⏸"}
        </button>
      </div>
    </div>
  );
}
export default SpaceButtons;
