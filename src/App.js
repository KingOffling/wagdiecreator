import React, { useState, useEffect } from 'react';
import './App.css';
import WagdieCreator from './components/WagdieCreator';
import MobileView from './components/MobileView';

function App() {
    // Initial check for mobile display
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768 || window.innerHeight <= 635);

    useEffect(() => {
        // Handler to set isMobile based on window width
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768 || window.innerHeight <= 635);
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);  // Empty dependency array ensures this effect runs only once on mount and cleanup on unmount

    return (
        <div className="App">
            <header className="App-header">
                { isMobile ? <MobileView /> : <WagdieCreator /> }
            </header>
        </div>
    );
}

export default App;
