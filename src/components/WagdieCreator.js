import React, { useState, useEffect } from 'react';

//This defines categories, and default order.
const categories = ["background", "back", "body", "armor", "hair", "mask", "front"];

//Set this to the number of traits in each category (WAGDIE).
const imageCounts = {
    background: 19,
    back: 33,
    body: 37,
    hair: 41,
    armor: 70,
    mask: 101,
    front: 4
};

//Set this to the number of traits in each category (LORN).
const imageCountsForLorn = {
    background: 7,
    back: 19,
    body: 36,
    hair: 29,
    armor: 67,
    mask: 64,
    front: 9
};

//Set this to the number of traits in each category (BOOBA).
const imageCountsForD56k = {
    background: 70,
    back: 4,
    body: 644,
    hair: 130,
    armor: 107,
    mask: 25,
    front: 3
};

//Set this to the number of traits in each category (BOOBA).
const imageCountsForTTFL = {
    background: 34,
    back: 0,
    body: 0,
    hair: 0,
    armor: 0,
    mask: 0,
    front: 0
};

//Set this to the number of traits in each category (Other).
const imageCountsForOther = {
    background: 2,
    back: 0,
    body: 0,
    hair: 5,
    armor: 9,
    mask: 9,
    front: 4
};

//This defines a percent chance to clear category instead.
const clearChances = {
    background: 0,
    back: 0.5,
    body: 0,
    hair: 0.20,
    armor: 0.15,
    mask: 0.3,
    front: 0.8
};


const WagdieCreator = () => {

    const [selectedImages, setSelectedImages] = useState({});
    const [activeTab, setActiveTab] = useState(categories[0]);
    const [imageOptions, setImageOptions] = useState({});


    //Each collection needs these, and UI images
    const [isWagdieEnabled, setIsWagdieEnabled] = useState(true);
    const toggleWAGDIEPath = isWagdieEnabled ? "/wagdie_on.png" : "/wagdie_off.png";

    const [isLornEnabled, setIsLornEnabled] = useState(false);
    const toggleLornPath = isLornEnabled ? "/lorn_on.png" : "/lorn_off.png";

    const [isD56kEnabled, setIsD56kEnabled] = useState(false);
    const toggleD56kPath = isD56kEnabled ? "/d56k_on.png" : "/d56k_off.png";
    
    const [isTTFLEnabled, setIsTTFLEnabled] = useState(false);
    const toggleTTFLPath = isTTFLEnabled ? "/ttfl_on.png" : "/ttfl_off.png";

    const [isOtherEnabled, setIsOtherEnabled] = useState(false);
    const toggleOtherPath = isOtherEnabled ? "/other_on.png" : "/other_off.png";

    useEffect(() => {
        const updatedImageOptions = {};

        for (let category in imageCounts) {
            let imagesToInclude = [];

            // Each collection needs its own calls to appear as options
            if (isWagdieEnabled) {
                imagesToInclude = Array.from({ length: imageCounts[category] }).map((_, index) => {
                    const num = String(index + 1).padStart(3, '0');
                    return `${category}_${num}.png`;
                });
            }

            if (isLornEnabled) {
                let lornImages;

                lornImages = Array.from({ length: imageCountsForLorn[category] || 0 }).map((_, index) => {
                    const num = String(index + 1).padStart(3, '0');
                    return `/lorn/lorn_${category}_${num}.png`;
                });
                imagesToInclude = [...imagesToInclude, ...lornImages];
            }

            if (isD56kEnabled) {
                let d56kImages;

                d56kImages = Array.from({ length: imageCountsForD56k[category] || 0 }).map((_, index) => {
                    const num = String(index + 1).padStart(3, '0');
                    return `/d56k/d56k_${category}_${num}.png`;
                });
                imagesToInclude = [...imagesToInclude, ...d56kImages];
            }

            if (isTTFLEnabled) {
                let TTFLImages;

                TTFLImages = Array.from({ length: imageCountsForTTFL[category] || 0 }).map((_, index) => {
                    const num = String(index + 1).padStart(3, '0');
                    return `/ttfl/ttfl_${category}_${num}.png`;
                });
                imagesToInclude = [...imagesToInclude, ...TTFLImages];
            }

            if (isOtherEnabled) {
                let otherImages;

                otherImages = Array.from({ length: imageCountsForOther[category] || 0 }).map((_, index) => {
                    const num = String(index + 1).padStart(3, '0');
                    return `/other/other_${category}_${num}.png`;
                });
                imagesToInclude = [...imagesToInclude, ...otherImages];
            }


            updatedImageOptions[category] = imagesToInclude;
        }

        setImageOptions(updatedImageOptions);
    }, [isWagdieEnabled, isLornEnabled, isD56kEnabled, isTTFLEnabled, isOtherEnabled]);



    const handleImageChange = (category, imageName) => {
        const imageUrl = imageName ? `/images/${category}/${imageName}` : null;
        setSelectedImages(prevState => ({
            ...prevState,
            [category]: imageUrl
        }));
    };


    const clearAllImages = () => {
        setSelectedImages({});
    };

    const collectionLinks = {
        WAGDIE: 'https://fateofwagdie.com/characters',
        LORN: 'https://lorn.world',
        D56k: 'https://d56k.com/',
        TTFL: 'https://opensea.io/collection/through-the-forsaken-lands',
        Other: 'https://twitter.com/kingoffling'
    };
    
    const handleCollectionLinkClick = () => {
        let url = '';
        if (isWagdieEnabled) url = collectionLinks['WAGDIE'];
        else if (isLornEnabled) url = collectionLinks['LORN'];
        else if (isD56kEnabled) url = collectionLinks['D56k'];
        else if (isTTFLEnabled) url = collectionLinks['TTFL'];
        else if (isOtherEnabled) url = collectionLinks['Other'];
    
        if (url) window.open(url, '_blank');
    };

    const randomizeCategory = (category) => {
        // Custom percentage chance to clear the layer (as defined)
        if (Math.random() < clearChances[category]) {
            handleImageChange(category, null);
            return;
        }

        const randomIndex = Math.floor(Math.random() * imageOptions[category].length);
        handleImageChange(category, imageOptions[category][randomIndex]);
    };

    // ignore this:
    // eslint-disable-next-line no-unused-vars
    const CategoryIcon = ({ category, isActive }) => {
        const imageUrl = `/public/${category}${isActive ? '_active' : ''}.png`;

        return (
            <img
                src={imageUrl}
                alt={category}
                style={{
                    width: '70px',
                    height: '70px',
                    marginBottom: '5px',
                    cursor: 'pointer'
                }}
            />
        );
    };

// Button functions
    const randomizeAllCategories = () => {
        categories.forEach(cat => randomizeCategory(cat));
    };

    const copyToClipboard = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');

        categoryOrder.forEach(category => {
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


    const [categoryOrder, setCategoryOrder] = useState(categories);
    const handleCategoryShift = (direction) => {
        const index = categoryOrder.indexOf(activeTab);
        if ((direction === "up" && index > 0) || (direction === "down" && index < categoryOrder.length - 1)) {
            const newOrder = [...categoryOrder];
            const temp = newOrder[index];
            newOrder[index] = newOrder[index + (direction === "up" ? -1 : 1)];
            newOrder[index + (direction === "up" ? -1 : 1)] = temp;
            setCategoryOrder(newOrder);
        }
    };


    const downloadImage = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');

        // Ensure the canvas starts with a transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        categoryOrder.forEach(category => {
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
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{
                width: '250px',
                height: '100%',
                flexShrink: 0,
                flexGrow: 0,
                borderRight: '1px solid #000000',
                overflowX: 'hidden',
                backgroundColor: '#b5b5b5',
                display: 'flex',
                flexDirection: 'column'
            }}>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', paddingBottom: '5px', paddingTop: '5px' }}>
                    <img
                        src={toggleWAGDIEPath}
                        alt="Include WAGDIE"
                        style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                        onClick={() => setIsWagdieEnabled(!isWagdieEnabled)}
                    />

                    <img
                        src={toggleLornPath}
                        alt="Include Lorn"
                        style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                        onClick={() => setIsLornEnabled(!isLornEnabled)}
                    />

                    <img
                        src={toggleD56kPath}
                        alt="Include D56K"
                        style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                        onClick={() => setIsD56kEnabled(!isD56kEnabled)}
                    />

                    <img
                        src={toggleTTFLPath}
                        alt="Include TTFL"
                        style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                        onClick={() => setIsTTFLEnabled(!isTTFLEnabled)}
                    />

                    <img
                        src={toggleOtherPath}
                        alt="Include Other"
                        style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                        onClick={() => setIsOtherEnabled(!isOtherEnabled)}
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

                <div style={{ flexGrow: 1, overflowY: 'auto' }}>
                    {
                        imageOptions[activeTab] && imageOptions[activeTab].length > 0 ? (
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
                            !isWagdieEnabled && !isLornEnabled && !isD56kEnabled && !isTTFLEnabled && !isOtherEnabled ? (
                                <div style={{ marginTop: 'calc((100% - 20px) / 2)', fontSize: '20px', color: '#888' }}>ALL TOGGLES OFF</div>
                            ) : (
                                <div style={{ marginTop: 'calc((100% - 20px) / 2)', fontSize: '20px', color: '#888' }}>NO TRAITS AVAILABLE</div>
                            )
                        )
                    }
                </div>

                <button onClick={() => handleImageChange(activeTab, null)} style={{ display: 'block', width: '100%', marginTop: '10px', fontSize: '20px' }}>🚫 CLEAR LAYER</button>
                <button onClick={clearAllImages} style={{ display: 'block', width: '100%', marginTop: '10px', fontSize: '20px' }}>⛔ CLEAR ALL</button>
                <button onClick={() => randomizeCategory(activeTab)} style={{ display: 'block', width: '100%', marginTop: '10px', fontSize: '20px' }}>🎲 RANDOMIZE</button>
                <button onClick={randomizeAllCategories} style={{ display: 'block', width: '100%', marginTop: '10px', fontSize: '20px' }}>🔀 RANDOM ALL</button>
            </div>





            <div style={{
    display: 'flex',
    flexDirection: 'row'
}}>
    <div style={{
        width: '70px',
        height: `${60 + (50 * categoryOrder.length)}px`,
        flexShrink: 0,
        flexGrow: 0,
        borderRight: '1px solid #000000',
        backgroundColor: '#999999',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '70px 0 0 0'
    }}>
        {categoryOrder.map(category => (
            <div key={category} style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <img
                    src={`/${category}${category === activeTab ? '_active' : ''}.png`}
                    alt={category}
                    style={{
                        width: '50px',
                        height: '50px',
                        cursor: 'pointer'
                    }}
                    onClick={() => setActiveTab(category)}
                />
            </div>
        ))}
    </div>
    
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '70px 0 0 0',
        height: `${140 + (50 * categoryOrder.length)}px`,
        marginLeft: '5px'
    }}>
        {categoryOrder.map((category, index) => (
            <div key={category} style={{ display: 'flex', flexDirection: 'column', marginBottom: '5px', height: '50px', justifyContent: 'center' }}>
                {category === activeTab && (
                    <>
                        <button
                            onClick={() => handleCategoryShift("up")}
                            disabled={index === 0}
                            style={{ marginBottom: '2px', cursor: index === 0 ? 'default' : 'pointer' }}
                        >🔼</button>
                        <button
                            onClick={() => handleCategoryShift("down")}
                            disabled={index === categoryOrder.length - 1}
                            style={{ cursor: index === categoryOrder.length - 1 ? 'default' : 'pointer' }}
                        >🔽</button>
                    </>
                )}
            </div>
        ))}
    </div>
</div>


            <div style={{ marginLeft: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src="/wagdie_logo.png" alt="Wagdie Logo" style={{ maxWidth: '30%', paddingBottom: '20px', paddingTop: '15px' }} />



                <div id="wagdie-container" style={{ position: 'relative', width: '400px', height: '400px', marginTop: '20px', border: '2px solid white' }}>
                    {categoryOrder.map((category, index) => {
                        const imageUrl = selectedImages[category];
                        return imageUrl ? (
                            <img
                                key={category}
                                src={imageUrl}
                                alt={category}
                                style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: index }}
                            />
                        ) : null;
                    })}
                </div>


                <button onClick={downloadImage} style={{ display: 'block', width: '220px', marginTop: '20px', fontSize: '20px', marginLeft: 'auto', marginRight: 'auto' }}>💾 DOWNLOAD</button>
                <button onClick={copyToClipboard} style={{ display: 'block', width: '220px', marginTop: '10px', fontSize: '20px', marginLeft: 'auto', marginRight: 'auto' }}>🔥 COPY</button>
      

                {[isWagdieEnabled, isLornEnabled, isD56kEnabled, isTTFLEnabled, isOtherEnabled].filter(Boolean).length === 1 && (
        <button
            onClick={handleCollectionLinkClick}
            style={{ display: 'block', width: '220px', marginTop: '100px', fontSize: '20px', marginLeft: 'auto', marginRight: 'auto' }}
        >
            🌐
        </button>
    )}
            </div>
        </div>
    );
};

export default WagdieCreator;