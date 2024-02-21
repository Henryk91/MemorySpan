import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import Buttons from "./Buttons";
import Screen from "./Screen";

function DigitMemory({ openMenu }: { openMenu: () => void }) {
  const [activeRound, setActiveRound] = useState<boolean>(false);
  const [rerunRound, setRerunRound] = useState<boolean>(false);
  const [round, setRound] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [span, setSpan] = useState<number>(5);
  const [checkForward, setCheckForward] = useState<boolean>(true);
  const [isSlow, setIsSlow] = useState<boolean>(true);
  const [isSmart, setIsSmart] = useState<boolean>(false);
  const [smartCount, setSmartCount] = useState<number>(0);
  const [calc, setCalc] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [retVal, setRetVal] = useState<string>("0/0");
  const [numberList, setNumberList] = useState<string[]>([]);
  const [intervalIdState, setIntervalIdState] = useState<string>();

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
    setCalc(newCalc);

    if (newCalc.length === numberList.length) {
      let newScore = score;
      let newRound = round + 1;
      const checkVal = checkForward ? newCalc : newCalc.split("").reverse().join("");

      if (checkVal === numberList.join("")) {
        newScore++;
        setMessage("Correct !!!");
        setSmartCount(smartCount + 1);

        setTimeout(() => {
          setRerunRound(true);
        }, 2000);
      } else {
        const expectedVal = checkForward
          ? numberList.join("")
          : JSON.parse(JSON.stringify(numberList)).reverse().join("");
        setMessage("Wrong: " + expectedVal);
        setSmartCount(smartCount - 1);
        setActiveRound(false);
      }
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

  return (
    <>
      <span onClick={() => openMenu()}>
        <Screen calc={calc} retVal={retVal} message={message} span={span} />
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
        activeRound={activeRound}
      />
    </>
  );
}

export default DigitMemory;
