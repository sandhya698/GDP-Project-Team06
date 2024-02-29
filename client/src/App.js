import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Error } from './pages/Error';
import { ToastContainer } from 'react-toastify';
import { About } from './pages/About';
import { Faq } from './pages/Faq';
import Landing from './pages/Landing';
import { Donor } from './pages/admin/Donor';
import { Patient } from './pages/admin/Patient';
import { Donations } from './pages/admin/Donations';
import { Requests } from './pages/admin/Requests';
import Inventory from './pages/admin/Inventory';
import Dashboard from './pages/Dashboard';
import SidebarContainer from './components/sidebar/SidebarContainer';
import { DonateBlood } from './pages/bloodDonations/DonateBlood';
import { DonationHistory } from './pages/bloodDonations/DonationHistory';
import { RequestHistory } from './pages/bloodRequests/RequestHistory';
import { RequestBlood } from './pages/bloodRequests/RequestBlood';

export default function App() {

    return (
        <>
            <BrowserRouter>
                <SidebarContainer>
                    <Routes>
                        <Route path='/'          element={<Landing />} />
                        <Route path='/about'     element={<About />} />
                        <Route path='/login'     element={<Login />} />
                        <Route path='/register'  element={<Register />} />
                        <Route path='/faq'       element={<Faq />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/donors'    element={<Donor />} />
                        <Route path='/patients'  element={<Patient />} />
                        <Route path='/donations' element={<Donations />} />
                        <Route path='/requests'  element={<Requests />} />
                        <Route path='/Inventory' element={<Inventory />} />
                        <Route path='/blood-donate'     element={<DonateBlood />} />
                        <Route path='/donation-history' element={<DonationHistory />} />
                        <Route path='/blood-request'    element={<RequestBlood />} />
                        <Route path='/request-history'  element={<RequestHistory />} />
                        <Route path='*'          element={<Error />} />
                    </Routes>
                </SidebarContainer>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
};