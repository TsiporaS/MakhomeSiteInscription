import React from "react";
import "../css/ProductsToChoose.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import { DeleteProductProvider } from "./DeleteContext"; // Importez le fournisseur de contexte


export default function ProductsToChoose({
  availableProducts,
  selectedProducts,
  handleProductSelect,
  handleProductDelete,
  idGift
}) {
    const navigate = useNavigate();
  console.log("availableProducts", availableProducts);
  console.log("selectedProducts", selectedProducts);
  console.log("handleProductSelect", handleProductSelect);

//   const goToMyCart = () => {
//     navigate(`/present/${idGift}`, { state: { handleProdDelete: handleProductDelete } });
//   }
  const goToMyCart = () => {
    navigate(`/present/${idGift}`);
  }

  return (
    <DeleteProductProvider handleProductDelete={handleProductDelete}>
    <div>
      <h2>Available Products</h2>
      <ul>
        {availableProducts.map((product, index) => (
          <li key={index}>
            {product.ProductName} - ${product.Price}
            <img src={product.Image} alt={product.Name} />
            <button onClick={() => handleProductSelect(product)}>Select</button>
          </li>
        ))}
      </ul>

      <button onClick={() => goToMyCart()}>View my Cart</button>

      {/* <h2>Selected Products</h2>
      <ul>
        {selectedProducts.map((product, index) => (
          <li key={index}>
            {product.ProductName} - {product.Price}$
            <br />
            Quantity: {product.Amount}
            <img src={product.Image} alt={product.Name} />
            <button onClick={() => handleProductDelete(product)}>Delete</button>
          </li>
        ))}
      </ul> */}
    </div>
     </DeleteProductProvider>
  );
}
