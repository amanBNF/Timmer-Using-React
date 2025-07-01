import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const Analytics = () => {
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    longestSession: 0,
  });

  const [focusData, setFocusData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('timerStats'));
    const focus = JSON.parse(localStorage.getItem('focusData'));

    if (saved) setStats(saved);
    if (focus) {
      console.log("📈 Loaded focusData:", focus); // helpful debug
      setFocusData(focus);
    }
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-purple-400 via-white to-purple-400 bg-clip-text text-transparent">
        📊 Your Timer Analytics
      </h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4 w-full max-w-md text-center">
        <div className="text-xl">
          ⏱️ <span className="font-semibold text-purple-400">Total Sessions:</span> {stats.totalSessions}
        </div>
        <div className="text-xl">
          🕒 <span className="font-semibold text-purple-400">Total Focus Time:</span> {stats.totalMinutes} min
        </div>
        <div className="text-xl">
          🚀 <span className="font-semibold text-purple-400">Longest Session:</span> {stats.longestSession} sec
        </div>
      </div>

      {/* Chart Rendering */}
      {focusData.length > 0 ? (
        <div className="mt-10 w-full max-w-2xl bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">📈 Focus Time Per Day</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={focusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: "#333", borderColor: "#666" }} />
              <Line type="monotone" dataKey="minutes" stroke="#a78bfa" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="mt-10 text-gray-400">No focus data available. Complete a session first!</p>
      )}

      <button
        onClick={() => navigate('/')}
        className="mt-10 bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-xl shadow transition"
      >
        ← Back to Home
      </button>
    </motion.div>
  );
};

export default Analytics;
