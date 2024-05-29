import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



interface Props {
    transcript: string;
}

const TarkovApi: React.FC<Props> = ({ transcript }) => {
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
        <div className="container mt-4">
            {error && <div className="alert alert-danger">{error}</div>}
            {itemData && (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Field</th>
                        <th scope="col">Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">Item ID</th>
                        <td>{itemData.id}</td>
                    </tr>
                    <tr>
                        <th scope="row">Name</th>
                        <td>{itemData.name}</td>
                    </tr>
                    <tr>
                        <th scope="row">Short Name</th>
                        <td>{itemData.shortName}</td>
                    </tr>
                    <tr>
                        <th scope="row">Average 24h Price</th>
                        <td>{itemData.avg24hPrice}</td>
                    </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TarkovApi;
