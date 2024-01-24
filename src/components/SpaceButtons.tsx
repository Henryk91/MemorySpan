import React from "react";

function SpaceButtons({
  calc,
  set,
  startTest,
  resetClick,
  increaseSpan,
  decreaseSpan,
  toggleCheckForward,
  toggleIsSlow,
  checkForward,
  isSlow,
  activeRound,
}: {
  calc: string;
  set: (val: { showCalc: string; retVal: string }) => void;
  startTest: () => void;
  resetClick: () => void;
  increaseSpan: () => void;
  decreaseSpan: () => void;
  toggleCheckForward: () => void;
  toggleIsSlow: () => void;
  checkForward: boolean;
  isSlow: boolean;
  activeRound: boolean;
}) {
  const numberClick = (e: number) => {
    set({ showCalc: `${e}`, retVal: "0" });
  };

  const checkActive = (buttonNumber: number) => {
    return calc === `${buttonNumber}` ? "buttonActiveClass" : "";
  };

  return (
    <div id="buttons">
      <button id="clear" onClick={resetClick}>
        AC
      </button>
      <button id="multiply" className="smallButtonFont" onClick={toggleCheckForward}>
        {checkForward ? "Forward" : "Reverse"}
      </button>
      <button className={checkActive(7)} id="seven" onClick={() => numberClick(7)}>
        7
      </button>
      <button className={checkActive(8)} id="eight" onClick={() => numberClick(8)}>
        8
      </button>
      <button className={checkActive(9)} id="nine" onClick={() => numberClick(9)}>
        9
      </button>
      <button id="subtract" className={`smallButtonFont ${checkActive(10)}`} onClick={() => numberClick(10)}>
        10
      </button>
      <button className={checkActive(4)} id="four" onClick={() => numberClick(4)}>
        4
      </button>
      <button className={checkActive(5)} id="five" onClick={() => numberClick(5)}>
        5
      </button>
      <button className={checkActive(6)} id="six" onClick={() => numberClick(6)}>
        6
      </button>
      <button id="add" className={`smallButtonFont ${checkActive(11)}`} onClick={() => numberClick(11)}>
        11
      </button>
      <button className={checkActive(1)} id="one" onClick={() => numberClick(1)}>
        1
      </button>
      <button className={checkActive(2)} id="two" onClick={() => numberClick(2)}>
        2
      </button>
      <button className={checkActive(3)} id="three" onClick={() => numberClick(3)}>
        3
      </button>
      <button className={checkActive(0)} id="three" onClick={() => numberClick(0)}>
        0
      </button>
      <button id="subtract" className="smallButtonFont" onClick={decreaseSpan}>
        Span <br /> -
      </button>
      <button id="add" className="smallButtonFont" onClick={increaseSpan}>
        Span +
      </button>
      <button id="decimal" className="smallButtonFont" onClick={toggleIsSlow}>
        {isSlow ? "Slow" : "Fast"}
      </button>
      <button id="three " onClick={startTest}>
        {!activeRound ? "▶" : "⏸"}
      </button>
    </div>
  );
}
export default SpaceButtons;
