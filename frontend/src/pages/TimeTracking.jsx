import { useState, useEffect, useRef } from "react";
import timeService from "../services/timeService";

const TimeTracking = ({ taskId, onStop }) => {
  const [runningEntry, setRunningEntry] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchRunning = async () => {
      const entry = await timeService.getRunningEntry();
      if (entry && entry.task_id === taskId) {
        setRunningEntry(entry);
        setElapsed(entry.elapsed_seconds);
      }
    };
    fetchRunning();
  }, [taskId]);

  useEffect(() => {
    if (!runningEntry) return;
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [runningEntry]);

  const handleStart = async () => {
    const entry = await timeService.startTimer(taskId);
    setRunningEntry(entry);
    setElapsed(0);
  };

  const handleStop = async () => {
    if (!runningEntry) return;
    await timeService.stopTimer(runningEntry.id);
    setRunningEntry(null);
    setElapsed(0);
    if (onStop) onStop();
  };

    return (
      <div className="time-tracking">
      <p>Elapsed: {Math.floor(elapsed / 3600)}:{Math.floor((elapsed % 3600)/60)}:{elapsed % 60}</p>
      {!runningEntry ? (
        <button onClick={handleStart}>Start</button>
      ) : (
        <button onClick={handleStop}>Stop</button>
      )}
      </div>
    );
};
