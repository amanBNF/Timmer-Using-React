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
      className="flex flex-col items-center justify-center h-screen bg-black overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <h1 className="text-5xl font-bold mb-6">
        <span className="bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">
          TIMMER
        </span>
      </h1>

      {/* Button */}
      <button
        className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white text-xl px-6 py-3 font-semibold rounded-xl shadow-md transition duration-300"
        onClick={() => navigate('/clock')}
      >
        Click Me!
      </button>
    </motion.div>
  );
};

export default Timmer;
