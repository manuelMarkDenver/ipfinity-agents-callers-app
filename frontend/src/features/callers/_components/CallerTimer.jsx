import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { format, parseISO, differenceInSeconds } from "date-fns";

function Timer({ startTimeInQueue }) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const startTime = parseISO(startTimeInQueue);
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const difference = differenceInSeconds(currentTime, startTime);
      setElapsedSeconds(difference);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTimeInQueue]);

  return (
    <div>
      <p>{format(new Date(0, 0, 0, 0, 0, elapsedSeconds), "mm:ss")}</p>
    </div>
  );
}

Timer.propTypes = {
  startTimeInQueue: PropTypes.string.isRequired,
};

export default Timer;
