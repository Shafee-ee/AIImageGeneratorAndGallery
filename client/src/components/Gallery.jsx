import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Gallery = () => {
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        const fetchSavedImages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/images/saved');
                console.log("Fetched Images:", response.data);
                if (response.data) {
                    setGallery(response.data.map(item => item.imageUrl));
                }
            } catch (error) {
                console.error("Error fetching saved images:", error);
            }
        };
        fetchSavedImages();
    }, []);

    return (
        <div className="gallery">
            {gallery.length > 0 && <h4>Gallery</h4>}
            <div className="gallery-grid">
                {gallery.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Generated ${index}`}
                    />
                )

                )

                }
            </div>
        </div>
    );

}

export default Gallery