import React from 'react';
import { createRoot } from 'react-dom/client';
import LunarLoomApp from './LunarLoomApp';
import './tailwind.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LunarLoomApp />
  </React.StrictMode>
);