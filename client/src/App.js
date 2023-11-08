import React, { useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Error } from './pages/Error';
import { ToastContainer } from 'react-toastify';
import { initialState, reducer } from './reducer/useReducer';

export const userContext = React.createContext();

export default function App() {

    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <>
            <BrowserRouter>
                <userContext.Provider value={{state, dispatch}}>
                <Routes>
                    <Route path='/'         element={<Home />} />
                    <Route path='/login'    element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='*'         element={<Error />} />
                </Routes>
                </userContext.Provider>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
};