import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider authType = {'cookie'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure ={false}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

