import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';

export default function App() {
  return (
      <BrowserRouter>
          <Routes>
                <Route path='/'         element={<Home />} />
                <Route path='/login'    element={<Login />} />
                <Route path='/register' element={<Register />} />
          </Routes>
      </BrowserRouter>
  );
};
