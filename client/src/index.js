import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing the reactToastify CSS
import "react-toastify/dist/ReactToastify.css";

//Importing react bootstrap table 2 CSS
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);