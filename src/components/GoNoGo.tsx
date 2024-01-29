import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import GoNoGoButtons from "./GoNoGoButtons";
import Screen from "./Screen";

function GoNoGo({ openMenu }: { openMenu: () => void }) {
  const [activeRound, setActiveRound] = useState<boolean>(false);
  const [rerunRound, setRerunRound] = useState<boolean>(false);
  const [goRound, setGoRound] = useState<number>(0);
  const [goNoRound, setGoNoRound] = useState<number>(0);
  const [goScore, setGoScore] = useState<number>(0);
  const [noGoScore, setNoGoScore] = useState<number>(0);
  const [span, setSpan] = useState<number>(2);
  const [checkForward, setCheckForward] = useState<boolean>(true);
  const [isSlow, setIsSlow] = useState<boolean>(true);
  const [calc, setCalc] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [retVal, setRetVal] = useState<string>("0/0");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [shouldCheckConditions, setShouldCheckConditions] = useState<boolean>(false);

  const addGoRound = useCallback(
    (correct: boolean) => {
      console.log("");
      const score = goScore + (correct ? 1 : 0);
      const round = goRound + 1;
      console.log("addGoRound", score, round);
      console.log("");
      setGoRound(round);
      setGoScore(score);
      const msg = `Go: ${score}/${round} NoGO: ${noGoScore}/${goNoRound}`;
      console.log("msg", msg);
      setRetVal(msg);
    },
    [goRound, goScore, goNoRound, noGoScore]
  );
  const addNoGoRound = useCallback(
    (correct: boolean) => {
      const score = noGoScore + (correct ? 1 : 0);
      const round = goNoRound + 1;
      console.log("addGoRound", score, round);
      setGoNoRound(round);
      setNoGoScore(score);
      const msg = `Go: ${goScore}/${goRound} NoGO: ${score}/${round}`;
      setRetVal(msg);
    },
    [goNoRound, goRound, goScore, noGoScore]
  );

  const runTest = useCallback(() => {
    console.log("activeRound", activeRound);

    const setOption = () => {
      const rand = Math.random();
      console.log("rand", rand);
      const button = rand > span / 10 ? "2" : "1";
      console.log("button", button);
      setCalc(button);
      const timeoutId = setTimeout(() => {
        setShouldCheckConditions(!shouldCheckConditions);
      }, 2000);
      setTimeoutId(timeoutId);
    };

    setOption();
  }, [activeRound, setShouldCheckConditions, shouldCheckConditions, span]);

  useEffect(() => {
    if (shouldCheckConditions) {
      setShouldCheckConditions(false);
      if (calc === "1") {
        setMessage("Correct !!!");
        setCalc("");
        setTimeout(() => {
          setMessage("");
          if (activeRound) setRerunRound(true);
        }, 1000);
        addNoGoRound(true);
      } else {
        setMessage("You should have pressed it");
        setCalc("");
        console.log("useEffect activeRound", activeRound);
        addGoRound(false);
        setTimeout(() => {
          setMessage("");
          if (activeRound) setRerunRound(true);
        }, 1000);
      }
    }
  }, [shouldCheckConditions, calc, activeRound, addGoRound, addNoGoRound]);

  useEffect(() => {
    if (rerunRound) {
      setRerunRound(false);

      runTest();
    }
  }, [rerunRound, setRerunRound, runTest]);

  const showCalc = ({ showCalc, retVal }: { showCalc: string; retVal: string }) => {
    console.log("showCalc", showCalc);

    clearTimeout(timeoutId);
    setTimeoutId(undefined);

    if (calc === "1") {
      setMessage("You should not have pressed");
      addNoGoRound(false);
      setCalc("");
      setTimeout(() => {
        setMessage("");
        if (activeRound) setRerunRound(true);
      }, 1000);
    } else {
      addGoRound(true);
      setMessage("Correct !!!");
      setCalc("");
      setMessage("");
      setTimeout(() => {
        setMessage("");
        if (activeRound) setRerunRound(true);
      }, 1000);
    }
  };

  const resetClick = () => {
    setCalc("");
    setGoRound(0);
    setGoScore(0);
    setGoNoRound(0);
    setNoGoScore(0);
    setRetVal("0/0");
    setActiveRound(false);
  };

  const restart = () => {
    console.log("activeRound", activeRound);
    if (!activeRound) {
      setRerunRound(true);
    }
    setActiveRound(!activeRound);
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
