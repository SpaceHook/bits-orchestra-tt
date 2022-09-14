import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
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
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<p style={{textAlign: 'center', fontWeight: 'bold'}}>Page not found</p>} />
    </Routes>
  );
}

export default App;
