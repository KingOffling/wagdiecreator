import React from 'react';
import './App.css';
import WagdieCreator from './components/WagdieCreator';

function App() {
    return (
        <div className="App">
            <header className="App-header">
            <img src="/wagdie_logo.png" alt="Wagdie Logo" style={{maxWidth: '30%', paddingBottom: '20px'}} />
                <WagdieCreator />
            </header>
        </div>
    );
}

export default App;
