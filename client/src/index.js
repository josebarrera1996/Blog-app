import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      {/* El contexto aplicado será aplicado al componente principal, es decir, a toda la aplicación */}
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);


