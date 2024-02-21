import React from "react";

function Buttons({
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
  const numberClick = (e: number) => {
    set({ showCalc: `${e}`, retVal: "0" });
  };

  return (
    <div className="flex-buttons">
      <div className="buttonRow">
        <button id="clear" onClick={resetClick}>
          AC
        </button>
        <button id="clear" onClick={smartClick} className="smallButtonFont">
          Smart
          {isSmart ? " ++" : " --"}
        </button>
        <button id="multiply" className="smallButtonFont" onClick={toggleCheckForward}>
          {checkForward ? "Forward" : "Reverse"}
        </button>
      </div>
      <div className="buttonRow">
        <button id="seven" onClick={() => numberClick(7)}>
          7
        </button>
        <button id="eight" onClick={() => numberClick(8)}>
          8
        </button>
        <button id="nine" onClick={() => numberClick(9)}>
          9
        </button>
        <button id="subtract" onClick={decreaseSpan}>
          <span className="smallButtonFont">Span </span>
          <span className="smallButtonFont"> -</span>
        </button>
      </div>
      <div className="buttonRow">
        <button id="four" onClick={() => numberClick(4)}>
          4
        </button>
        <button id="five" onClick={() => numberClick(5)}>
          5
        </button>
        <button id="six" onClick={() => numberClick(6)}>
          6
        </button>
        <button id="add" onClick={increaseSpan}>
          <span className="smallButtonFont"> Span</span>
          <span className="smallButtonFont"> +</span>
        </button>
      </div>
      <div className="buttonRow">
        <button id="one" onClick={() => numberClick(1)}>
          1
        </button>
        <button id="two" onClick={() => numberClick(2)}>
          2
        </button>
        <button id="three" onClick={() => numberClick(3)}>
          3
        </button>
        <button id="equals" onClick={startTest}>
          {!activeRound ? "▶" : "⏸"}
        </button>
      </div>
      <div className="buttonRow">
        <button id="zero" onClick={() => numberClick(0)}>
          0
        </button>
        <button id="decimal" className="smallButtonFont" onClick={toggleIsSlow}>
          {isSlow ? "Slow" : "Fast"}
        </button>
      </div>
    </div>
  );
}
export default Buttons;
