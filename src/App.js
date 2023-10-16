import React from 'react';
import './App.css';
import WagdieCreator from './components/WagdieCreator';
import MobileView from './components/MobileView';

function App() {
    const isMobile = window.innerWidth <= 768; // This will return true for screen widths up to and including 768 pixels.

    return (
        <div className="App">
            <header className="App-header">
                { isMobile ? <MobileView /> : <WagdieCreator /> }
            </header>
        </div>
    );
}

export default App;
