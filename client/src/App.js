import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { useAuthContext } from './hooks/useAuthContext';
import LoadingSpinner from './components/LoadingSpinner';

export default function App() {

  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <BrowserRouter>
        <SidebarContainer>
          <Routes>
            <Route path='/'          element={!user ? <Landing /> : <Navigate to="/dashboard" />} />
            <Route path='/about'     element={<About />} />
            <Route path='/faq'       element={<Faq />} />
            <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/" />} />
            <Route path='/donors'    element={user ? <Donor /> : <Navigate to="/" />} />
            <Route path='/patients'  element={user ? <Patient /> : <Navigate to="/" />} />
            <Route path='/donations' element={user ? <Donations /> : <Navigate to="/" />} />
            <Route path='/requests'  element={user ? <Requests /> : <Navigate to="/" />} />
            <Route path='/Inventory' element={user ? <Inventory /> : <Navigate to="/" />} />
            <Route path='/blood-donate'     element={user ? <DonateBlood /> : <Navigate to="/" />} />
            <Route path='/donation-history' element={user ? <DonationHistory /> : <Navigate to="/" />} />
            <Route path='/blood-request'    element={user ? <RequestBlood /> : <Navigate to="/" />} />
            <Route path='/request-history'  element={user ? <RequestHistory /> : <Navigate to="/" />} />
            <Route path='*'          element={<Error />} />
          </Routes>
        </SidebarContainer>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};