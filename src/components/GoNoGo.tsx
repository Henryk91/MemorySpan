import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import GoNoGoButtons from "./GoNoGoButtons";
import Screen from "./Screen";

function GoNoGo({ openMenu }: { openMenu: () => void }) {
  const [activeRound, setActiveRound] = useState<boolean>(false);
  const [rerunRound, setRerunRound] = useState<boolean>(false);
  const [goRound, setGoRound] = useState<number>(0);
  const [goNoRound, setNoGoRound] = useState<number>(0);
  const [goScore, setGoScore] = useState<number>(0);
  const [noGoScore, setNoGoScore] = useState<number>(0);
  const [span, setSpan] = useState<number>(5);
  const [checkForward, setCheckForward] = useState<boolean>(true);
  const [isSlow, setIsSlow] = useState<boolean>(true);
  const [calc, setCalc] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [retVal, setRetVal] = useState<string>("0/0");
  const [guessList, setGuessList] = useState<string[]>([]);
  const [intervalIdState, setIntervalIdState] = useState<string>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const addGoRound = (correct: boolean) => {
    setGoRound(goRound + 1);
    setGoScore(goScore + (correct ? 1 : 0));
  };
  const addNoGoRound = (correct: boolean) => {
    setNoGoRound(goNoRound + 1);
    setNoGoScore(noGoScore + (correct ? 1 : 0));
  };

  const delaydRerun = (delay: number) => {
    setCalc("");
    console.log("delaydRerun activeRound", activeRound);
    setTimeout(() => {
      setMessage("");
      runTest();
      // restart();
    }, delay);
  };

  const checkRunOutConditions = (calc: string) => {
    console.log("calc", calc);
    if (calc === "1") {
      setMessage("Correct !!!");
      addNoGoRound(true);
      delaydRerun(1000);
    } else {
      setMessage("You should have pressed it");
      console.log("activeRound", activeRound);
      addGoRound(false);
      delaydRerun(2000);
    }
  };
  const runTest = useCallback(() => {
    console.log("activeRound", activeRound);
    let intervalId: any = null;

    const setOption = () => {
      const rand = Math.random();
      console.log("rand", rand);
      const button = rand > 0.2 ? "2" : "1";
      // const button = rand < 0.8 ? "2" : "1";
      console.log("button", button);
      setCalc(button);
      const timeoutId = setTimeout(() => {
        checkRunOutConditions(button);
      }, 2000);
      setTimeoutId(timeoutId);
    };

    setOption();

    setIntervalIdState(intervalId);
  }, [calc, isSlow, activeRound]);

  const startTest = useCallback(() => {
    setRerunRound(false);
    setCalc("");
    setMessage("");
    runTest();
  }, [intervalIdState, runTest, span, activeRound]);

  const showCalc = ({ showCalc, retVal }: { showCalc: string; retVal: string }) => {
    console.log("showCalc", showCalc);
    // if (!activeRound) return;
    clearTimeout(timeoutId);
    setTimeoutId(undefined);

    console.log("calc", calc);
    if (calc === "1") {
      setMessage("You should not have pressed");
      // addGoRound(false)
      addNoGoRound(false);
      setCalc("");
      // setCalc("");
      setTimeout(() => {
        setMessage("");
        if (activeRound) runTest();
        //   // setRerunRound(true);
        //   runTest([]);
      }, 500);
      // setActiveRound(false);
    } else {
      console.log("ewqlkdnfoqwindpo");
      addGoRound(true);
      setMessage("Correct !!!");
      // delaydRerun(200);
      setCalc("");
      setMessage("");
      setTimeout(() => {
        setMessage("");
        if (activeRound) runTest();

        // restart();
      }, 500);
    }
  };

  const resetClick = () => {
    setCalc("");
    setMessage("");
    setGuessList([]);
  };

  const restart = () => {
    console.log("activeRound", activeRound);
    if (!activeRound) {
      setRerunRound(true);
      resetClick();
      startTest();
    }
    setActiveRound(!activeRound);

    // console.log("activeRound", activeRound);
  };

  const increaseSpan = () => {
    setSpan(span + 1);
    setMessage("");
  };
  const decreaseSpan = () => {
    if (span - 1 > 0) setSpan(span - 1);
    setMessage("");
  };

  const toggleCheckForward = () => {
    setMessage("");
    setCheckForward(!checkForward);
  };
  const toggleIsSlow = () => {
    setMessage("");
    setIsSlow(!isSlow);
  };

  return (
    <>
      <span onClick={() => openMenu()}>
        <Screen calc={"Go No-Go"} retVal={retVal} message={message} span={span} />
      </span>
      <GoNoGoButtons
        calc={calc}
        set={showCalc}
        startTest={restart}
        resetClick={resetClick}
        increaseSpan={increaseSpan}
        decreaseSpan={decreaseSpan}
        checkForward={checkForward}
        isSlow={isSlow}
        toggleCheckForward={toggleCheckForward}
        toggleIsSlow={toggleIsSlow}
        activeRound={activeRound}
      />
    </>
  );
}

export default GoNoGo;
