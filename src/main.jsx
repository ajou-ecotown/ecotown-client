import { createRoot } from 'react-dom/client';
import './reset.css';
import './index.css';
import App from './app/App.jsx';
import { BrowserRouter } from "react-router";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
);