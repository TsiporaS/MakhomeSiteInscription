
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoToServer, GoToServer1 } from '../fetch';
import GiftDetails from './GiftDetails';
import ProductsToChoose from './ProductsToChoose';
import '../css/Gifts.css'; // Import the CSS file

export default function Gift() {
    const { idGift } = useParams();
    const [giftData, setGiftData] = useState(null);
    const [presentId, setPresentId] = useState(null);
    const [error, setError] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [viewProducts, setViewProducts] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGiftData = async () => {
            try {
                const response = await GoToServer(`/api/gifts/${idGift}`, 'GET', {});
                setGiftData(response);
                setAvailableProducts(response.products.filter(product => product.Price <= response.maxPrice));
                // setPresentId(response.Id);
                setPresentId(response.giftDetails.Id);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchGiftData();
    }, [idGift]);

    const handleProductSelect = (product) => {
        const query = `/products/${product.Id}`;
        GoToServer(query, "POST", product)
            .then((response) => {
                alert('The product added successfully in your cart.')
            })
            .catch((error) => {
                console.error('Error:', error);
            });
   
        const totalSelectedPrice = selectedProducts.reduce((total, p) => total + p.Price, 0) + product.Price;
        const remainingBudget = giftData.maxPrice - totalSelectedPrice;

        if (remainingBudget >= 0) {
            //setSelectedProducts([...selectedProducts, product]);
            const query = `/api/gifts/${presentId}`
            const theSelectedProduct = GoToServer(query, 'GET')
            setSelectedProducts(theSelectedProduct);
            setAvailableProducts(
                availableProducts.filter(p => p.Id !== product.Id && p.Price <= remainingBudget)
            );
        } else {
            alert('Selected product exceeds the maximum price limit.');
        }
    };

    const goToChooseGift = () => {
        setViewProducts(true);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!giftData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>You received a gift !! </h1>
            {viewProducts ? (
                <ProductsToChoose 
                    availableProducts={availableProducts} 
                    selectedProducts={selectedProducts} 
                    handleProductSelect={handleProductSelect} 
                />
            ) : (
                <GiftDetails giftData={giftData} goToChooseGift={goToChooseGift} />
            )}

            <h2>Available Products</h2>
            <ul>
                {availableProducts.map((product, index) => (
                    <li key={index}>
                        {product.Name} - ${product.Price}
                        <button onClick={() => handleProductSelect(product)}>Select</button>
                    </li>
                ))}
            </ul>

            <h2>Selected Products</h2>
            <ul>
                {selectedProducts.map((product, index) => (
                    <li key={index}>
                        {product.Name} - ${product.Price}
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default function OptionToGift(){


    return <h1>History</h1>
}