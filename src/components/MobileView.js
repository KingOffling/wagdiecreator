import React from 'react';

const MobileView = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#282c34' }}>
            <img src="/wagdie_logo.png" alt="Wagdie Logo" style={{ maxWidth: '50%', paddingBottom: '20px' }} />
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>AVAILABLE ONLY ON DESKTOP</p>
        </div>
    );
}

export default MobileView;