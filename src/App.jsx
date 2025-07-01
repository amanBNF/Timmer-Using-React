import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Timmer from './pages/Timmer'
import Clock from './pages/Clock'


const AnimateRoutes = () => {
  const location = useLocation();

  return(
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Timmer />} />
        <Route path='/clock' element={<Clock />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <AnimateRoutes />
    </Router>
  )
}

export default App;
