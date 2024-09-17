import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoToServer, GoToServer1 } from '../fetch';
import '../css/Product.css'; // Import the CSS file

export default function Product(){
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProductDetails(productId);
    }, [productId]);

    const fetchProductDetails = (productId) => {
        const query = `/product/${productId}`; // Assuming this endpoint fetches details for a single product
        GoToServer(query, "GET")
            .then((response) => {
                console.log('Product details:', response);
                setProduct(response); // Assuming response is the detailed product object
                console.log('image', response.Image); 
            })
            .catch((error) => {
                console.error('Error fetching product details:', error);
                // Handle error
            });
    };

    const backToProducts = () => {
        navigate(-1);
    }

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
       <div>
        <h1>Product</h1>
        <h2>{product.Name}</h2>
        <img src={product.Image} alt={product.Name} />
        <p>Price: {product.Price} $</p>
        <p>Description: {product.Description}</p>
        {/* Add more details as needed */}

        <button onClick={backToProducts}> Back </button>
       </div>
    );
}
