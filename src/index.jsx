import React from 'react';
import { createRoot } from 'react-dom/client';
import RorstodCalculator from './RorstodCalculator.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RorstodCalculator />);