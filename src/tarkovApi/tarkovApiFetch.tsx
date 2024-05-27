import React, { useState } from 'react';

const TarkovApiFetch = ({transcript}) => {
    const [itemName, setItemName] = useState('');
    const [itemData, setItemData] = useState(null);
    const [error, setError] = useState(null);

    const fetchItemData = async () => {
        try {
            const response = await fetch('https://api.tarkov.dev', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: `{
                        items(name: "${itemName}") {
                            id
                            name
                            shortName
                            avg24hPrice
                        }
                    }`
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch item data');
            }

            const responseData = await response.json();
            setItemData(responseData.data.items[0]);
            setError(null);
        } catch (error) {
            setError('Error fetching item data');
            setItemData(null);
            console.error(error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Enter item name"
            />
            <button onClick={fetchItemData}>Check Price</button>
            {error && <p>{error}</p>}
            {itemData && (
                <div>
                    <p>Item ID: {itemData.id}</p>
                    <p>Name: {itemData.name}</p>
                    <p>Short Name: {itemData.shortName}</p>
                    <p>Srednia cena na flea market: {itemData.avg24hPrice}</p>
                </div>
            )}
        </div>
    );
};

export default TarkovApiFetch;
