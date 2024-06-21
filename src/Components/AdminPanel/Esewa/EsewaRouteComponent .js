import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const EsewaRouteComponent = () => {
    const [parsedData, setParsedData] = useState({});
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const data = queryParams.get('data');

        if (data) {
            // Decode the base64 encoded string
            const decodedData = atob(data);
            // Parse the decoded JSON string
            const parsedJson = JSON.parse(decodedData);
            setParsedData(parsedJson);
        }
    }, [location.search]);

    return (
        <div>
            <h2>Displaying Data from Query:</h2>
            <pre>{JSON.stringify(parsedData, null, 2)}</pre>
        </div>
    );
};

export default EsewaRouteComponent;
