import React, { useState, useEffect } from 'react';

interface Props {
    transcript: string;
}

const TarkovApiFetch: React.FC<Props> = ({ transcript }) => {
    const [itemData, setItemData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!transcript) return;

        const fetchItemData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/tarkov/item/${transcript}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch item data');
                }

                const responseData = await response.json();
                setItemData(responseData);
                setError(null);
            } catch (error) {
                setError('Error fetching item data');
                setItemData(null);
                console.error(error);
            }
        };

        fetchItemData();
    }, [transcript]);

    return (
        <div>
            {error && <p>{error}</p>}
            {itemData && (
                <div>
                    <p>Item ID: {itemData.id}</p>
                    <p>Name: {itemData.name}</p>
                    <p>Short Name: {itemData.shortName}</p>
                    <p>Average 24h Price: {itemData.avg24hPrice}</p>
                </div>
            )}
        </div>
    );
};

export default TarkovApiFetch;
