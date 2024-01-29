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
  const [span, setSpan] = useState<number>(3);
  const [checkForward, setCheckForward] = useState<boolean>(true);
  const [isSlow, setIsSlow] = useState<boolean>(true);
  const [calc, setCalc] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [retVal, setRetVal] = useState<string>("0/0");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [shouldCheckConditions, setShouldCheckConditions] = useState<boolean>(false);

  const addGoRound = useCallback(
    (correct: boolean) => {
      const score = goScore + (correct ? 1 : 0);
      const round = goRound + 1;
      setGoRound(round);
      setGoScore(score);
      const msg = `Go: ${score}/${round} NoGO: ${noGoScore}/${goNoRound}`;
      setRetVal(msg);
    },
    [goRound, goScore, goNoRound, noGoScore]
  );
  const addNoGoRound = useCallback(
    (correct: boolean) => {
      const score = noGoScore + (correct ? 1 : 0);
      const round = goNoRound + 1;
      setGoNoRound(round);
      setNoGoScore(score);
      const msg = `Go: ${goScore}/${goRound} NoGO: ${score}/${round}`;
      setRetVal(msg);
    },
    [goNoRound, goRound, goScore, noGoScore]
  );

  const runTest = useCallback(() => {
    const setOption = () => {
      const rand = Math.random();
      const button = rand > span / 10 ? "2" : "1";
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
      setCalc("");
      if (!activeRound) return;
      if (calc === "1") {
        setMessage("Correct !!!");
        setTimeout(() => {
          setMessage("");
          setRerunRound(true);
        }, 300);
        addNoGoRound(true);
      } else {
        setMessage("You should have pressed it");
        addGoRound(false);
        setTimeout(() => {
          setMessage("");
          setRerunRound(true);
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

  const buttonPress = () => {
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
      setTimeout(() => {
        setMessage("");
        if (activeRound) setRerunRound(true);
      }, 300);
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
        <Screen calc={""} retVal={retVal} message={message} span={span} />
      </span>
      <GoNoGoButtons
        calc={calc}
        buttonPress={buttonPress}
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
