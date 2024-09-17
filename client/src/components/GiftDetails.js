import React from 'react';
import '../css/GiftDetails.css'; // Import the CSS file

export default function GiftDetails({ giftData, goToChooseGift }) {
    return (
        <div>
            <h2>Gift Details</h2>
            <p>Gift ID: {giftData.Id}</p>
            <p>Date: {new Date(giftData.Date).toLocaleString()}</p>
            <p>Expiration Date: {new Date(giftData.ExpirationDate).toLocaleString()}</p>
            <p>Max Price: {giftData.Amount}$</p>
            <p>Category: {giftData.Category}</p>

            <h5>Go to choose my presents</h5>
            <button onClick={goToChooseGift}>Go</button>
        </div>
    );
}

