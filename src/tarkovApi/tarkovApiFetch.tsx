import {useEffect, useState} from 'react';

interface Props {
    transcript: string; // Określenie typu elementu transcript jako string
}
const TarkovApiFetch: React.FC<Props> = ({transcript}) => {
    const [itemName, setItemName] = useState('');
    const [itemData, setItemData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchItemData = async () => {
        try {
            console.log('1')
            setItemName(transcript);
            console.log('2')

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
    useEffect(() => {
        // Wywołaj fetchItemData za każdym razem, gdy transcript się zmieni
        fetchItemData();
    }, [transcript]);


    return (
        <div>
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
