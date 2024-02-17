import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Error } from './pages/Error';
import { ToastContainer } from 'react-toastify';
import { About } from './pages/About';
import { Faq } from './pages/Faq';
import Landing from './pages/Landing';
import { GlobalStateProvider } from './reducer/GlobalState';

export default function App() {

    return (
        <>
            <GlobalStateProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/'         element={<Landing />} />
                        <Route path='/about'    element={<About />} />
                        <Route path='/login'    element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/faq'      element={<Faq />} />
                        <Route path='/home'     element={<Home />} />
                        <Route path='*'         element={<Error />} />
                    </Routes>
                </BrowserRouter>
                <ToastContainer />
            </GlobalStateProvider>
        </>
    );
};