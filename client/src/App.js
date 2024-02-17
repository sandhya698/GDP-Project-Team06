import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Error } from './pages/Error';
import { ToastContainer } from 'react-toastify';
import { About } from './pages/About';
import { Faq } from './pages/Faq';
import Landing from './pages/Landing';
import { GlobalStateProvider } from './reducer/GlobalState';
import { Donor } from './pages/Donor';
import { Patient } from './pages/Patient';
import { Donations } from './pages/Donations';
import { Requests } from './pages/Requests';
import Inventory from './pages/Inventory';
import Dashboard from './pages/Dashboard';
import SidebarContainer from './components/SidebarContainer';

export default function App() {

    return (
        <>
            <GlobalStateProvider>
                <BrowserRouter>
                    <SidebarContainer>
                        <Routes>
                            <Route path='/'          element={<Landing />} />
                            <Route path='/about'     element={<About />} />
                            <Route path='/login'     element={<Login />} />
                            <Route path='/register'  element={<Register />} />
                            <Route path='/faq'       element={<Faq />} />
                            <Route path='/home'      element={<Dashboard />} />
                            <Route path='/donors'    element={<Donor />} />
                            <Route path='/patients'  element={<Patient />} />
                            <Route path='/donations' element={<Donations />} />
                            <Route path='/requests'  element={<Requests />} />
                            <Route path='/Inventory' element={<Inventory />} />
                            <Route path='*'          element={<Error />} />
                        </Routes>
                    </SidebarContainer>
                </BrowserRouter>
                <ToastContainer />
            </GlobalStateProvider>
        </>
    );
};