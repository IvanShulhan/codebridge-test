import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ArticlePage } from './pages/Article';
import { HomePage } from './pages/HomePage';


function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<ArticlePage />} />
        <Route path='*' element={<Navigate to="/" replace={true}/>} />
      </Routes>
    </>
  );
}

export default App;
