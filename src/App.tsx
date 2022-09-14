import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Dashboard } from './components/Dashboard/Dashboard';
import './styles/normalize.scss';
import './styles/App.scss';
import './styles/reset.scss';

function App() {
  return (
    <Routes>
      <Route path="/" >
        <Route index element={<Dashboard />} />
        <Route path="add-book" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
