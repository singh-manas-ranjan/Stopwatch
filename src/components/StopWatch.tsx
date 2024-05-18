import { useEffect, useState } from "react";
import style from "./stopWatch.module.css";
const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval: number | NodeJS.Timeout;
    if (running) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [running]);

  const getM = (ms: number) => `0${Math.floor((ms / 60000) % 60)}`.slice(-2);
  const getS = (ms: number) => `0${Math.floor((ms / 1000) % 60)}`.slice(-2);
  const getH = (ms: number) => `0${(ms / 10) % 100}`.slice(-2);

  const formatTime = (time: number) => {
    return `${getM(time)} : ${getS(time)} : ${getH(time)}`;
  };
  return (
    <div className={style.timerContainer}>
      <h3 className={!running && time > 0 ? style.pulse : ""}>
        {formatTime(time)}
      </h3>
      <div className={style.buttons}>
        {!running && !time && (
          <button onClick={() => setRunning(true)}>Start</button>
        )}
        {running && time && (
          <button onClick={() => setRunning(false)}>Stop</button>
        )}
        {!running && time > 0 && (
          <button onClick={() => setRunning(true)}>Resume</button>
        )}
        {!running && time > 0 && (
          <button onClick={() => setTime(0)}>Reset</button>
        )}
      </div>
    </div>
  );
};

export default StopWatch;
