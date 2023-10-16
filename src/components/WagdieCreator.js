import React, { useState, useEffect } from 'react';

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

const imageCountsForD56k = {
    background: 58,
    back: 4,
    body: 0,
    hair: 14,
    armor: 107,
    mask: 27,
    front: 0
};


const WagdieCreator = () => {
    const [selectedImages, setSelectedImages] = useState({});
    const [activeTab, setActiveTab] = useState(categories[0]);
    const [imageOptions, setImageOptions] = useState({});

    const [isWagdieEnabled, setIsWagdieEnabled] = useState(true);
    const wagdieToggleImagePath = isWagdieEnabled ? "/wagdie_on.png" : "/wagdie_off.png";
    
    const [isD56kEnabled, setIsD56kEnabled] = useState(false);
    const toggleImagePath = isD56kEnabled ? "/d56k_on.png" : "/d56k_off.png";
    
    const [backgroundGif, setBackgroundGif] = useState(null);


    useEffect(() => {
        const updatedImageOptions = {};
    
        for (let category in imageCounts) {
            let imagesToInclude = [];
    
            if (isWagdieEnabled) {
                imagesToInclude = Array.from({ length: imageCounts[category] }).map((_, index) => {
                    const num = String(index + 1).padStart(3, '0');
                    return `${category}_${num}.png`;
                });
            }
    
            if (isD56kEnabled) {
                let d56kImages;
                if (category === 'background') {
                    d56kImages = Array.from({ length: imageCountsForD56k[category] || 0 }).map((_, index) => {
                        const num = String(index + 1).padStart(3, '0');
                        return `/d56k/d56k_${category}_${num}.gif`;
                    });
                } else {
                    d56kImages = Array.from({ length: imageCountsForD56k[category] || 0 }).map((_, index) => {
                        const num = String(index + 1).padStart(3, '0');
                        return `/d56k/d56k_${category}_${num}.png`;
                    });
                }
                imagesToInclude = [...imagesToInclude, ...d56kImages];
            }
    
            updatedImageOptions[category] = imagesToInclude;
        }
    
        setImageOptions(updatedImageOptions);
    }, [isWagdieEnabled, isD56kEnabled]);
    
    

    const handleImageChange = (category, imageName) => {
        const imageUrl = imageName ? `/images/${category}/${imageName}` : null;
        if (category === 'background' && isD56kEnabled) {
            setBackgroundGif(imageUrl);
        } else {
            setSelectedImages(prevState => ({
                ...prevState,
                [category]: imageUrl
            }));
        }
    };
    

    const clearAllImages = () => {
        setSelectedImages({});
    };

    
    const randomizeCategory = (category) => {
        const randomIndex = Math.floor(Math.random() * imageOptions[category].length);
        handleImageChange(category, imageOptions[category][randomIndex]);
    };

    const randomizeAllCategories = () => {
        categories.forEach(cat => randomizeCategory(cat));
    };

    const copyToClipboard = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');
    
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
    
        setTimeout(async () => {
            canvas.toBlob(async blob => {
                try {
                    const item = new ClipboardItem({ 'image/png': blob });
                    await navigator.clipboard.write([item]);
                } catch (error) {
                    alert('Failed to copy the image!');
                }
            });
        }, 100);
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
            <div style={{ width: '430px', borderRight: '1px solid #ccc', padding: '10px', overflowX: 'hidden', backgroundColor: '#b5b5b5' }}>
                
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', gap: '5px' }}>
                    <img 
                        src={wagdieToggleImagePath} 
                        alt="Toggle Wagdie" 
                        style={{ width: '50px', height: '50px', cursor: 'pointer' }} 
                        onClick={() => setIsWagdieEnabled(!isWagdieEnabled)} 
                    />

                    <img 
                        src={toggleImagePath} 
                        alt="Toggle d56k" 
                        style={{ width: '50px', height: '50px', cursor: 'pointer' }} 
                        onClick={() => setIsD56kEnabled(!isD56kEnabled)} 
                    />
                </div>

                <select 
                    value={activeTab} 
                    onChange={e => setActiveTab(e.target.value)} 
                    style={{ marginBottom: '10px', width: '100%', fontSize: '20px', textAlign: 'center', textAlignLast: 'center' }}
                >
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category.toUpperCase()}
                        </option>
                    ))}
                </select>

                <div 
    style={{ 
        overflowY: (imageOptions[activeTab] && imageOptions[activeTab].length > 0) ? 'scroll' : 'hidden', 
        maxHeight: `calc(${panelHeight} - 80px)`, 
        textAlign: 'center' 
    }}
>
    <div style={{ minHeight: `calc(${panelHeight} - 80px)` }}>
        {imageOptions[activeTab] && imageOptions[activeTab].length > 0 ? (
            imageOptions[activeTab].map(imageName => (
                <div key={imageName} style={{ marginBottom: '10px', width: '220px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <img
                        src={`/images/${activeTab}/${imageName}`}
                        alt={imageName}
                        style={{ width: '200px', height: '200px', cursor: 'pointer', border: selectedImages[activeTab] === `/images/${activeTab}/${imageName}` ? '2px solid red' : '2px solid transparent', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                        onClick={() => handleImageChange(activeTab, imageName)}
                    />
                </div>
            ))
        ) : (
            <div style={{ marginTop: 'calc((100% - 20px) / 2)', fontSize: '20px', color: '#888' }}>ALL TOGGLES OFF</div>
        )}
    </div>
</div>


                <button onClick={() => handleImageChange(activeTab, null)} style={{ display: 'block', width: '100%', marginTop: '10px', fontSize: '20px' }}>🚫 CLEAR</button>
                <button onClick={clearAllImages} style={{ display: 'block', width: '100%', marginTop: '10px', fontSize: '20px' }}>⛔ CLEAR ALL</button>
                <button onClick={() => randomizeCategory(activeTab)} style={{ display: 'block', width: '100%', marginTop: '10px', fontSize: '20px' }}>🎲 RANDOMIZE</button>
                <button onClick={randomizeAllCategories} style={{ display: 'block', width: '100%', marginTop: '10px', fontSize: '20px' }}>🔀 RANDOM ALL</button>
            </div>
            
            <div style={{ marginLeft: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/wagdie_logo.png" alt="Wagdie Logo" style={{maxWidth: '30%', paddingBottom: '20px', paddingTop: '15px'}} />

<div id="wagdie-container" style={{ position: 'relative', width: '400px', height: '400px', marginTop: '20px', border: '2px solid white' }}>
    {backgroundGif && <img src={backgroundGif} alt="Background GIF" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: 0 }} />}
    {categories.map(category => {
        const imageUrl = selectedImages[category];
        return imageUrl && category !== 'background' ? (
            <img
                key={category}
                src={imageUrl}
                alt={category}
                style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: 1 }}
            />
        ) : null;
    })}
</div>


            <button onClick={downloadImage} style={{ display: 'block', width: '220px', marginTop: '20px', fontSize: '20px', marginLeft: 'auto', marginRight: 'auto' }}>💾 DOWNLOAD</button>
            <button onClick={copyToClipboard} style={{ display: 'block', width: '220px', marginTop: '10px', fontSize: '20px', marginLeft: 'auto', marginRight: 'auto' }}>🔥 COPY</button>
        </div>
    </div>
    );
};

export default WagdieCreator;    
    