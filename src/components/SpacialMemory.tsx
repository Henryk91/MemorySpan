import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import SpaceButtons from "./SpaceButtons";
import Screen from "./Screen";

interface LogItem {
  number: string[];
  correct: boolean;
}

function SpacialMemory({ openMenu }: { openMenu: () => void }) {
  const [activeRound, setActiveRound] = useState<boolean>(false);
  const [rerunRound, setRerunRound] = useState<boolean>(false);
  const [round, setRound] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [span, setSpan] = useState<number>(5);
  const [checkForward, setCheckForward] = useState<boolean>(true);
  const [isSlow, setIsSlow] = useState<boolean>(true);
  const [isSmart, setIsSmart] = useState<boolean>(true);
  const [smartCount, setSmartCount] = useState<number>(0);
  const [calc, setCalc] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [retVal, setRetVal] = useState<string>("0/0");
  const [numberList, setNumberList] = useState<string[]>([]);
  const [guessList, setGuessList] = useState<string[]>([]);
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
          setGuessList([]);
        }
        if (index > numberListB.length) {
          setCalc("");
          setGuessList([]);
          clearInterval(intervalId);
        }
      };

      intervalId = setInterval(iterateNumbers, isSlow ? 1000 : 600);
      setIntervalIdState(intervalId);
    },
    [calc, isSlow]
  );

  const startTest = useCallback(() => {
    setRerunRound(false);
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
    const newGuessList = [...guessList, showCalc];
    setGuessList(newGuessList);
    setCalc(newCalc);
    setLastTime(new Date().toString());

    if (newGuessList.length === numberList.length) {
      let newScore = score;
      let newRound = round + 1;
      const checkVal = checkForward ? newGuessList : newGuessList.reverse();

      const log: LogItem = { number: checkVal, correct: false };
      if (checkVal.toString() === numberList.toString()) {
        newScore++;
        log.correct = true;
        const newSmartCount = smartCount + 1;
        const msg = isSmart && newSmartCount === 2 ? `Correct !!! Span: ${span + 1}` : "Correct !!!";
        setMessage(msg);
        if (isSmart) setSmartCount(newSmartCount);

        setTimeout(() => {
          setRerunRound(true);
        }, 2000);
      } else {
        setActiveRound(!activeRound);
        const newSmartCount = smartCount - 1;
        const msg = isSmart && newSmartCount === -2 ? `Incorrect !!!  Span:${span - 1}` : "Incorrect !!!";
        setMessage(msg);
        if (isSmart) setSmartCount(newSmartCount);
      }
      setLogList(logList ? [...logList, log] : [log]);
      setCalc("");
      setGuessList([]);
      setRetVal(`${newScore}/${newRound}`);
      setScore(newScore);
      setRound(newRound);
    } else if (newCalc.length > numberList.join("").length) {
      setMessage("Incorrect !!");
      setCalc("");
      setGuessList([]);
      setRetVal(`${score}/${round + 1}`);
      setRound(round + 1);
      setActiveRound(false);
    }
  };

  const resetClick = () => {
    setCalc("");
    setMessage("");
    setGuessList([]);
  };

  const generateRandomList = (length: number) => {
    const numberArray: string[] = [];

    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * 12);
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
    setActiveRound(false);
    const scoreString = getMappedLogData();
    const logString = `Spacial Memory:\nStart Time: ${startTime}\nEnd Time: ${lastTime}\n${scoreString}${
      checkForward ? "" : "\nReversed"
    }`;
    navigator.clipboard.writeText(logString);
  };

  const smartClick = () => {
    setIsSmart(!isSmart);
  };

  return (
    <>
      <span onClick={() => openMenu()}>
        <Screen calc={"Spatial Memory"} retVal={retVal} message={message} span={span} />
      </span>
      <SpaceButtons
        calc={calc}
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

export default SpacialMemory;
