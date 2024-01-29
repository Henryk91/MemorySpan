import React from "react";

function GoNoGoButtons({
  calc,
  buttonPress,
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
  buttonPress: () => void;
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
  const checkActive = () => {
    if (calc === `${1}`) return "buttonNoGoClass";
    if (calc === `${2}`) return "buttonGoClass";
    return "";
  };

  return (
    <div className="flex-buttons" id="noGoButtons">
      <div className="buttonRow">
        <button id="clear" className="smallButtonFont" onClick={resetClick}>
          AC
        </button>
        <button id="multiply" className="smallButtonFont" onClick={toggleCheckForward}>
          {checkForward ? "Forward" : "Reverse"}
        </button>
      </div>
      <div className="buttonRow height100">
        <button className={`${checkActive()} height100`} id="goNoGoButton" onClick={() => buttonPress()}></button>
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
export default GoNoGoButtons;
