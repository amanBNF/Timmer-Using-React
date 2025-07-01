import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { saveDailySession } from '../utils/storage';

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const Clock = () => {
  const [inputTime, setInputTime] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning && !isPaused && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setShowPopup(true);
      confetti(); 

      const currentSession = parseInt(inputTime);
      const prevStats = JSON.parse(localStorage.getItem('timerStats')) || {
        totalSessions: 0,
        totalMinutes: 0,
        longestSession: 0,
      };

      const updatedStats = {
        totalSessions: prevStats.totalSessions + 1,
        totalMinutes: prevStats.totalMinutes + Math.floor(currentSession / 60),
        longestSession: Math.max(prevStats.longestSession, currentSession),
      };

      localStorage.setItem('timerStats', JSON.stringify(updatedStats));

      saveDailySession(currentSession);
      console.log("✅ Saved session to focusData:", currentSession);

    }

    return () => clearTimeout(timerRef.current);
  }, [timeLeft, isRunning, isPaused]);

  const startTimer = () => {
    const parsedTime = parseInt(inputTime);
    if (!isNaN(parsedTime) && parsedTime > 0) {
      setTimeLeft(parsedTime);
      setIsRunning(true);
      setIsPaused(false);
      setShowPopup(false);
    }
  };

  const pauseTimer = () => setIsPaused(true);
  const resumeTimer = () => {
    if (timeLeft > 0) {
      setIsPaused(false);
      setIsRunning(true);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {/* Glowing Title */}
      <motion.h1
        className="text-5xl font-extrabold mb-10 bg-gradient-to-r from-purple-400 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        CLOCK TIMER
      </motion.h1>

      {/* Input */}
      <div className="mb-8 flex flex-col items-center space-y-4">
        <input
          type="number"
          placeholder="Enter time in seconds"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          className="px-4 py-2 rounded bg-transparent border border-gray-500 text-white text-center w-64"
        />

        {/* Control Buttons */}
        <div className="flex space-x-4">
          {!isRunning && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={startTimer}
              className="relative bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white text-lg px-6 py-2 rounded-xl shadow-lg transition duration-300"
            >
              <span className="relative z-10">Start</span>
              <span className="absolute -inset-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 blur-lg opacity-20 animate-pulse" />
            </motion.button>
          )}

          {isRunning && !isPaused && (
            <button
              onClick={pauseTimer}
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg px-6 py-2 rounded-xl shadow-md transition duration-300"
            >
              Pause
            </button>
          )}

          {isRunning && isPaused && (
            <button
              onClick={resumeTimer}
              className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-2 rounded-xl shadow-md transition duration-300"
            >
              Resume
            </button>
          )}
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-6xl font-mono text-white mt-4 drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]">
        {formatTime(timeLeft)}
      </div>

      {/* Pop-up when time ends */}
      {showPopup && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-10">
          <div className="bg-white rounded-xl p-6 shadow-xl text-center animate-bounce">
            <h2 className="text-3xl font-bold text-purple-600 mb-2">⏰ Time’s Up!</h2>
            <p className="text-gray-700">Great job staying focused!</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Clock;
