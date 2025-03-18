import React, { useEffect, useState } from 'react';
import axiosInstance from '../api';


const Dashboard = () => {
    const [gallery, setGallery] = useState([]);

    //fetch User's gallery

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await axiosInstance.get('/gallery');
                setGallery(response.data);
            } catch (error) {
                console.error('failed to fetch gallery:', error.message);
            }
        };
        fetchGallery();

    }, [])

    return (
        <div>
            <h2>Welcome to your DashBoard!</h2>
            <h3>Your Gallery:</h3>
            <div className='gallery'>
                {gallery.length > 0 ? (
                    gallery.map((image, index) => (
                        <div key={index} className="image-card">
                            <img src={image.url} alt={`image ${index}`} />
                            <p>{image.title}</p>
                        </div>
                    ))

                ) : (
                    <p>No images found</p>
                )

                }

            </div>
        </div>
    );
};

export default Dashboard;