import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import Buttons from "./Buttons";
import Screen from "./Screen";

interface LogItem {
  number: string;
  correct: boolean;
}

function DigitMemory({ openMenu }: { openMenu: () => void }) {
  const [activeRound, setActiveRound] = useState<boolean>(false);
  const [rerunRound, setRerunRound] = useState<boolean>(false);
  const [round, setRound] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [span, setSpan] = useState<number>(5);
  const [checkForward, setCheckForward] = useState<boolean>(true);
  const [activeMemorize, setActiveMemorize] = useState<boolean>(false);
  const [isSlow, setIsSlow] = useState<boolean>(true);
  const [isSmart, setIsSmart] = useState<boolean>(false);
  const [smartCount, setSmartCount] = useState<number>(0);
  const [calc, setCalc] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [retVal, setRetVal] = useState<string>("0/0");
  const [numberList, setNumberList] = useState<string[]>([]);
  const [intervalIdState, setIntervalIdState] = useState<string>();

  const [startTime, setStartTime] = useState<string>();
  const [lastTime, setLastTime] = useState<string>();
  const [logList, setLogList] = useState<LogItem[]>();

  const runTest = useCallback(
    (numberListB: string[]) => {
      let index = 0;
      let calcy = calc;
      let intervalId: any = null;

      const iterateNumbers = () => {
        if (calcy === "" || calcy === "0" || calcy === "Correct !!!") {
          setCalc(`${numberListB[index]}`);
          index++;
        } else {
          setCalc("");
        }
        if (index > numberListB.length) {
          setCalc("");
          clearInterval(intervalId);
          setActiveMemorize(false);
        }
      };

      intervalId = setInterval(iterateNumbers, isSlow ? 1000 : 600);
      setIntervalIdState(intervalId);
    },
    [calc, isSlow]
  );

  const startTest = useCallback(() => {
    setRerunRound(false);
    setActiveMemorize(true);
    setCalc("");
    setMessage("");
    let localSpan = span;
    if (smartCount === 2) {
      localSpan++;
      setSpan(localSpan);
      setSmartCount(0);
    }
    if (smartCount === -2) {
      localSpan--;
      if (localSpan < 1) localSpan = 1;
      setSpan(localSpan);
      setSmartCount(0);
    }
    if (intervalIdState) clearInterval(intervalIdState);
    const numbers = generateRandomList(localSpan);
    setNumberList(numbers);
    runTest(numbers);
  }, [intervalIdState, runTest, span, smartCount]);

  useEffect(() => {
    if (rerunRound && activeRound) startTest();
  }, [rerunRound, activeRound, startTest]);

  const showCalc = ({ showCalc, retVal }: { showCalc: string; retVal: string }) => {
    if (message) {
      setMessage("");
    }

    const newCalc = `${calc}${showCalc}`;
    setCalc(newCalc);
    setLastTime(new Date().toString());

    if (newCalc.length === numberList.length) {
      let newScore = score;
      let newRound = round + 1;
      const checkVal = checkForward ? newCalc : newCalc.split("").reverse().join("");
      const log = { number: checkVal, correct: false };
      if (checkVal === numberList.join("")) {
        log.correct = true;
        newScore++;
        const newSmartCount = smartCount + 1;
        const msg = isSmart && newSmartCount === 2 ? `Correct !!! Span: ${span + 1}` : "Correct !!!";
        setMessage(msg);
        if (isSmart) setSmartCount(newSmartCount);
        setActiveMemorize(false);

        setTimeout(() => {
          setRerunRound(true);
        }, 2000);
      } else {
        const expectedVal = checkForward
          ? numberList.join("")
          : JSON.parse(JSON.stringify(numberList)).reverse().join("");
        setMessage("Wrong: " + expectedVal);
        const newSmartCount = smartCount - 1;
        const msg =
          isSmart && newSmartCount === -2 ? `Wrong: ${expectedVal}  Span:${span - 1}` : `Wrong: ${expectedVal}`;
        setMessage(msg);
        if (isSmart) setSmartCount(newSmartCount);
        setActiveRound(false);
      }
      setLogList(logList ? [...logList, log] : [log]);
      setCalc("");
      setRetVal(`${newScore}/${newRound}`);
      setScore(newScore);
      setRound(newRound);
    }
  };

  const resetClick = () => {
    setCalc("");
    setMessage("");
  };

  const smartClick = () => {
    setIsSmart(!isSmart);
  };

  const generateRandomList = (length: number) => {
    const numberArray: string[] = [];

    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * 10);
      if (numberArray[i - 1] !== `${randomNumber}`) {
        numberArray.push(`${randomNumber}`);
      } else {
        i--;
      }
    }

    return numberArray;
  };

  const restart = () => {
    if (!startTime) {
      setStartTime(new Date().toString());
    }
    if (!activeRound) {
      setRerunRound(true);
      resetClick();
      startTest();
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

  const getMappedLogData = () => {
    const data: { [key: string]: { count: number; success: number } } = {};
    logList?.forEach((item) => {
      const length = item.number.length.toString();
      if (!data[length]) data[length] = { count: 0, success: 0 };

      const lengthScore = data[length];
      data[length] = {
        count: lengthScore.count + 1,
        success: item.correct ? lengthScore.success + 1 : lengthScore.success,
      };
    });
    const keys = Object.keys(data);
    let total = 0;
    let score = 0;
    const scores = keys
      .map((key) => {
        const item = data[key];
        total += item.count;
        score += item.success;
        return `Length: ${key} score: ${item.success}/${item.count}`;
      })
      .join("\n");
    return `${scores}\nTotal: ${score}/${total}`;
  };
  const showLogs = () => {
    if (!startTime) return;
    const scoreString = getMappedLogData();
    const logString = `Digit Memory:\nStart Time: ${startTime}\nEnd Time: ${lastTime}\n${scoreString}${
      checkForward ? "" : "\nReversed"
    }`;
    navigator.clipboard.writeText(logString);
  };

  return (
    <>
      <span onClick={() => openMenu()}>
        <Screen calc={calc} retVal={retVal} message={message} span={span} active={activeMemorize} />
      </span>
      <Buttons
        set={showCalc}
        startTest={restart}
        resetClick={resetClick}
        smartClick={smartClick}
        increaseSpan={increaseSpan}
        decreaseSpan={decreaseSpan}
        checkForward={checkForward}
        isSlow={isSlow}
        isSmart={isSmart}
        toggleCheckForward={toggleCheckForward}
        toggleIsSlow={toggleIsSlow}
        showLogs={showLogs}
        activeRound={activeRound}
      />
    </>
  );
}

export default DigitMemory;
