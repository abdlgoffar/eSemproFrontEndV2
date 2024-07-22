import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material';
import { SessionProvider } from './contexts/SessionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const defaultTheme = createTheme()



// DEVELOPMENT, because with component  <React.StrictMode> state will multiple render
// root.render(
//   <React.StrictMode>
//     <ThemeProvider theme={defaultTheme}>
//       <SessionProvider>
//         <App />
//       </SessionProvider>
//     </ThemeProvider>
//   </React.StrictMode>
// );


// PRODUCTION, without component  <React.StrictMode>
root.render(
  <ThemeProvider theme={defaultTheme}>
    <SessionProvider>
      <App />
    </SessionProvider>
  </ThemeProvider>
);