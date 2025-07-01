import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const Timmer = () => {
  const navigate = useNavigate();

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
        className="text-6xl font-extrabold mb-12 text-center bg-gradient-to-r from-purple-400 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        TIMMER
      </motion.h1>

      {/* Buttons Container */}
      <div className="flex flex-col items-center space-y-6">
        {/* Go to Clock Page */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white text-xl px-10 py-4 font-semibold rounded-2xl shadow-xl transition duration-300 overflow-hidden"
          onClick={() => navigate('/clock')}
        >
          <span className="relative z-10">Start Timer</span>
          <span className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 blur-lg opacity-20 animate-pulse" />
        </motion.button>

        {/* Go to Analytics Page */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white text-xl px-10 py-4 font-semibold rounded-2xl shadow-xl transition duration-300 overflow-hidden"
          onClick={() => navigate('/analytics')}
        >
          <span className="relative z-10">View Analytics</span>
          <span className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 blur-lg opacity-20 animate-pulse" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Timmer;
