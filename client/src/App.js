import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation  } from "react-router-dom";
import { Answer } from './AnswerView/Answer';
import './App.css';
import { Choice } from './ChoiceView/Choice';
import { Home } from './HomeView/Home';
import { WriteBody } from './WriteView/WriteBody';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choice" element={<Choice />} />
        <Route path="/ans" element={<Answer />} />
        <Route path="/write" element={<WriteBody />} />
      </Routes>
    </Router>
  );
}

export default App;