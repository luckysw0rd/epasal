import React, { useState } from 'react';

const GetUserLocation = () => {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);

    const handleSuccess = (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
    };

    const handleError = (error) => {
        setError(error.message);
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div>
            <h1>Get User Location</h1>
            <button onClick={getLocation}>Get Location</button>
            {error && <p>Error: {error}</p>}
            {location.latitude && location.longitude && (
                <div>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            )}
        </div>
    );
};

export default GetUserLocation;