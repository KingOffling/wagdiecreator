import React, { useState } from 'react';

const categories = ["background", "back", "body", "hair", "armor", "mask", "front"];
const panelHeight = '600px';

const imageCounts = {
    background: 19,
    back: 10,
    body: 33,
    hair: 41,
    armor: 45,
    mask: 75,
    front: 4
};

const imageOptions = {};
for (let category in imageCounts) {
    imageOptions[category] = Array.from({ length: imageCounts[category] }).map((_, index) => {
        const num = String(index + 1).padStart(3, '0');
        return `${category}_${num}.png`;
    });
}

const WagdieCreator = () => {
    const [selectedImages, setSelectedImages] = useState({});
    const [activeTab, setActiveTab] = useState(categories[0]);  // Default to the first category

    const handleImageChange = (category, imageName) => {
        const imageUrl = imageName ? `/images/${category}/${imageName}` : null;
        setSelectedImages({
            ...selectedImages,
            [category]: imageUrl
        });
    };

    const downloadImage = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');
    
        // Ensure the canvas starts with a transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        categories.forEach(category => {
            const imageUrl = selectedImages[category];
            if (imageUrl) {
                const img = new Image();
                img.src = imageUrl;
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, 400, 400);
                };
            }
        });
    
        setTimeout(() => {
            const link = document.createElement('a');
            link.download = 'wagdie_character.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }, 100); // Added a small delay to ensure all images are loaded and drawn before the image is exported
    };
    
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '240px', borderRight: '1px solid #ccc', padding: '10px', overflowX: 'hidden', backgroundColor: '#b5b5b5' }}>  {/* Increase width and set overflowX to hidden */}
                
                {/* Dropdown for category selection */}
                <select 
                    value={activeTab} 
                    onChange={e => setActiveTab(e.target.value)} 
                    style={{ 
                        marginBottom: '10px', 
                        width: '100%', 
                        fontSize: '20px',       // Larger text size
                        textAlign: 'center',   // Centered text
                        textAlignLast: 'center' // Ensures the selected value is also centered
                    }}
                >
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category.toUpperCase()}
                        </option>
                    ))}
                </select>

                <div style={{ overflowY: 'auto', maxHeight: `calc(${panelHeight} - 80px)`, textAlign: 'center' }}>
                    {imageOptions[activeTab].map(imageName => (
                        <div key={imageName} style={{ marginBottom: '10px', width: '220px', marginLeft: 'auto', marginRight: 'auto' }}>  {/* Increase wrapper width */}
                            <img
                                src={`/images/${activeTab}/${imageName}`}
                                alt={imageName}
                                style={{ width: '200px', height: '200px', cursor: 'pointer', border: selectedImages[activeTab] === `/images/${activeTab}/${imageName}` ? '2px solid red' : '2px solid transparent', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                                onClick={() => handleImageChange(activeTab, imageName)}
                            />
                        </div>
                    ))}
                </div>
                <button onClick={() => handleImageChange(activeTab, null)} style={{ display: 'block', width: '100%', marginTop: '10px', fontSize: '20px', }}>⛔ CLEAR</button>
            </div>
            
            <div style={{ marginLeft: '20px' }}>
                <div id="wagdie-container" style={{ position: 'relative', width: '400px', height: '400px', marginTop: '20px' }}>
                    {categories.map(category => {
                        const imageUrl = selectedImages[category];
                        return imageUrl ? (
                            <img
                                key={category}
                                src={imageUrl}
                                alt={category}
                                style={{ position: 'absolute', top: 0, left: 0, width: '400px', height: '400px' }}
                            />
                        ) : null;
                    })}
                </div>
                <button onClick={downloadImage} style={{ marginTop: '20px', fontSize: '20px' }}>DOWNLOAD</button>
            </div>
        </div>
    );
};

export default WagdieCreator;
