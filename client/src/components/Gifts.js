import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoToServer } from "../fetch";
import GiftDetails from "./GiftDetails";
import ProductsToChoose from "./ProductsToChoose";
import "../css/Gifts.css"; // Import the CSS file

export default function Gift() {
  const { idGift } = useParams();
  const [giftData, setGiftData] = useState({
    Amount: 0,  // ou toute autre valeur par défaut appropriée
    // autres propriétés...
  });
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalSelectedPrice, setTotalSelectedPrice] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [viewProducts, setViewProducts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGiftData = async () => {
      try {
        const query = `/api/gifts/${idGift}`;
        
        
        const response = await GoToServer(query, "GET");
    
    console.log("Réponse du serveur:", response);  // Ajoutez ce log pour déboguer
    
    if (!response || !response.giftDetails) {
      throw new Error("Données du cadeau non disponibles");
    }
        
        
        setGiftData(response.giftDetails);
        setProducts(response.products);

        // Ensure totalPrice is treated as a number
        if (giftData && giftData.Amount) {
            let am = giftData.Amount;
            // le reste du code...
          } else {
            console.error("giftData ou giftData.Amount est indéfini");
          }
        
        const totalPrice = parseFloat(response.giftDetails.Amount);
        setTotalPrice(totalPrice);
        // setTotalPrice(response.giftDetails.Amount);
        // Set the selected products from the server response
        const selectedProducts = response.selectedProducts || [];
        setSelectedProducts(selectedProducts);
        console.log(
          "response.giftDetails.Category",
          response.giftDetails.Category
        );

        // Calculate the total price of the already selected products
        const totalSelectedPrice = selectedProducts.reduce(
          (total, product) => total + parseFloat(product.Price), // Use parseFloat to convert the Price to a number
          0
        );
        setTotalSelectedPrice(totalSelectedPrice);
        console.log("totalSelectedPrice", totalSelectedPrice);

        // Calculate remaining budget
        const remainingBudget = totalPrice - totalSelectedPrice;

        // Filter available products based on the remaining budget
        setAvailableProducts(
          response.products.filter(
            (product) => parseFloat(product.Price) <= remainingBudget
          )
        );
        console.log("remainingBudget", remainingBudget);
        console.log("availableProducts", availableProducts);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchGiftData();
  }, [idGift]);

  useEffect(() => {
    if (products && products.length > 0 && giftData.Amount) {
      const filterProducts = () => {
        const filteredProducts = products.filter(
          //   (product) => parseInt(product.Price, 10) <= giftData.Amount
          (product) =>
            parseInt(product.Price, 10) <= totalPrice - totalSelectedPrice
        );
        setAvailableProducts(filteredProducts);
        console.log("giftData.Amount", giftData.Amount);
        console.log("availableProducts", availableProducts);
      };

      //if (products.length > 0 && giftData.Amount) {
      filterProducts();
    }
  }, [products, giftData.Amount]);

  useEffect(() => {
    console.log("availableProducts", availableProducts);
  }, [availableProducts]);

//   const handleProductSelect = async (product) => {
//     const remainingBudget = totalPrice - totalSelectedPrice;
//     const newBudget = remainingBudget - product.Price;

//     console.log("newBudget", newBudget);
//     console.log("totalSelectedPrice", totalSelectedPrice);

//     // const existingProduct = selectedProducts.find((p) => p.Id === product.Id);
//     // const existingProduct = selectedProducts.find(
//     //   (p) => p.ProductId === product.Id
//     // );

//     if (newBudget >= 0) {
//       try {
//         const query = `/products/${product.Id}`;
//         let response;
//         const existingProduct = selectedProducts.find(
//           (p) => p.ProductId === product.Id
//         );
//         // const existingProduct = selectedProducts.find(
//         //   (p) => p.Id === product.Id
//         // );

//         // console.log('existingProduct', existingProduct);

//         if (existingProduct) {
//           // Update existing product's amount
//           const updatedProduct = {
//             ...existingProduct,
//             Amount: existingProduct.Amount + 1,
//           };
//           console.log("updatedProduct", updatedProduct);
//           await GoToServer(query, "PUT", updatedProduct);

//           //   response = await GoToServer(query, "PUT", updatedProduct);
         
//           // Update the selected products state
//           setSelectedProducts(
//             selectedProducts.map(
//               (p) => (p.ProductId === product.Id ? updatedProduct : p)
//               //   p.Id === product.Id ? updatedProduct : p
//             )
//           );
//         } else {
//           // Insert a new product
//           const orderData = {
//             ProductId: product.Id,
//             ProductName: product.Name,
//             Amount: 1,
//             Price: product.Price,
//             PresentId: parseInt(idGift, 10),
//           };
//           response = await GoToServer(query, "POST", orderData);

//           // Use the returned insertedId for the new product
//           const insertedProduct = {
//             ...orderData,
//             Id: response.insertedId, // Use the server-returned ID

//             // Id: response.insertedId || Date.now(), // Ensure an Id is assigned
//             // CartId: response.insertedId, // Store the CartId from the response
//           };
//           setSelectedProducts([...selectedProducts, insertedProduct]);

//           //   setSelectedProducts([...selectedProducts, orderData]);
//         }

//         // Update the total selected price
//         const updatedSelectedPrice =
//           totalSelectedPrice + parseFloat(product.Price);
//         setTotalSelectedPrice(updatedSelectedPrice);

//         // Update the available products based on the new budget
//         const updatedAvailableProducts = products.filter(
//           (p) => parseFloat(p.Price) <= newBudget
//         );
//         setAvailableProducts(updatedAvailableProducts);

//         alert(response.message);
//         // // // setTotalPrice(newBudget);
//         // // setTotalSelectedPrice(newBudget);

//         // // Update the total selected price
//         // const updatedSelectedPrice =
//         //   totalSelectedPrice + parseFloat(product.Price);
//         // setTotalSelectedPrice(updatedSelectedPrice);
//         // // setAvailableProducts(
//         // //   availableProducts.filter((p) => product.Price <= newBudget)
//         // // );

//         // // Filter available products based on the new budget
//         // const updatedAvailableProducts = products.filter(
//         //   (p) => parseFloat(p.Price) <= newBudget
//         // );
//         // setAvailableProducts(updatedAvailableProducts);
//         console.log("Updated available products:", updatedAvailableProducts);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     } else {
//       alert("Selected product exceeds the maximum price limit.");
//     }
//   };

//   const handleProductDelete = async (product) => {
//     try {

//         const query = `/cart/${giftData.Id}/product/${product.Id}`; // Use CartId instead of ProductId

//         console.log("product.id", product.Id);
//         console.log("giftData.id", giftData.Id);
//         console.log("selectedProducts", selectedProducts);
//         const existingProduct = selectedProducts.find(
//             (p) => p.Id === product.Id
//           );
  
//         console.log("existingProduct", existingProduct);
//           if (existingProduct) {

//             const response = await GoToServer(query, "DELETE", existingProduct);

//       if (response.status === "success") {
           
  
//             const updatedSelectedProducts = selectedProducts.filter(
//                 (p) => p.Id !== product.Id
//               );
//               setSelectedProducts(updatedSelectedProducts);

//               const updatedPrice =
//             totalSelectedPrice - parseFloat(product.Price);
//           setTotalSelectedPrice(updatedPrice);

//           const remainingBudget = totalPrice - updatedPrice;
  
//           // Update the available products based on the new budget
//           const updatedAvailableProducts = products.filter(
//             (p) => parseFloat(p.Price) <= remainingBudget
//           );
//           setAvailableProducts(updatedAvailableProducts);
  
//           alert(response.message);
//         }
//           else {
//                 alert("Failed to delete the product");
//               }
           
//           } else {
//             alert("Error. This product is not in the cart.")
//             };
  
            
      
//     //   const response = await GoToServer(query, "DELETE", []);

//     //   if (response.status === "success") {
//     //     //   if (response.status === 200) {
//     //     // Update the selectedProducts state to remove the deleted product
//     //     const updatedSelectedProducts = selectedProducts.filter(
//     //       (p) => p.Id !== product.Id
//     //     );
//     //     setSelectedProducts(updatedSelectedProducts);

//     //     // Recalculate the total selected price
//     //     const updatedSelectedPrice = updatedSelectedProducts.reduce(
//     //       (total, p) => total + parseFloat(p.Price) * p.Amount,
//     //       0
//     //     );
//     //     setTotalSelectedPrice(updatedSelectedPrice);

//     //     // Update available products based on the new budget
//     //     const remainingBudget = totalPrice - updatedSelectedPrice;
//     //     const updatedAvailableProducts = products.filter(
//     //       (p) => parseFloat(p.Price) <= remainingBudget
//     //     );
//     //     setAvailableProducts(updatedAvailableProducts);

//     //     alert("Product deleted successfully");
//     //   } else {
//     //     alert("Failed to delete the product");
//     //   }
    
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("An error occurred while deleting the product");
//     }
//   };

const handleProductSelect = async (product) => {
    const remainingBudget = totalPrice - totalSelectedPrice;
    const newBudget = remainingBudget - product.Price;

    console.log("newBudget", newBudget);
    console.log("totalSelectedPrice", totalSelectedPrice);

    // const existingProduct = selectedProducts.find((p) => p.Id === product.Id);
    // const existingProduct = selectedProducts.find(
    //   (p) => p.ProductId === product.Id
    // );

    if (newBudget >= 0) {
      try {
        const query = `/products/${product.Id}`;
        let response;
        const existingProduct = selectedProducts.find(
          (p) => p.ProductId === product.Id
        );
        // const existingProduct = selectedProducts.find(
        //   (p) => p.Id === product.Id
        // );

        // console.log('existingProduct', existingProduct);

        if (existingProduct) {
          // Update existing product's amount
          const updatedProduct = {
            ...existingProduct,
            Amount: existingProduct.Amount + 1,
          };
          console.log("updatedProduct", updatedProduct);
          await GoToServer(query, "PUT", updatedProduct);

          //   response = await GoToServer(query, "PUT", updatedProduct);

          // Update the selected products state
          setSelectedProducts(
            selectedProducts.map(
              (p) => (p.ProductId === product.Id ? updatedProduct : p)
              //   p.Id === product.Id ? updatedProduct : p
            )
          );
        } else {
          // Insert a new product
          const orderData = {
            ProductId: product.Id,
            ProductName: product.Name,
            Amount: 1,
            Price: product.Price,
            PresentId: parseInt(idGift, 10),
          };
          // response = await GoToServer(query, "POST", orderData);
          const response = await GoToServer(query, "POST", orderData);

          // Use the returned insertedId for the new product
          const insertedProduct = {
            ...orderData,
            Id: response.insertedId, // Use the server-returned ID

            // Id: response.insertedId || Date.now(), // Ensure an Id is assigned
            // CartId: response.insertedId, // Store the CartId from the response
          };
          setSelectedProducts([...selectedProducts, insertedProduct]);
          alert(response.message);

          //   setSelectedProducts([...selectedProducts, orderData]);
        }

        // Update the total selected price
        const updatedSelectedPrice =
          totalSelectedPrice + parseFloat(product.Price);
        setTotalSelectedPrice(updatedSelectedPrice);

        // Update the available products based on the new budget
        const updatedAvailableProducts = products.filter(
          (p) => parseFloat(p.Price) <= newBudget
        );
        setAvailableProducts(updatedAvailableProducts);

        // // // setTotalPrice(newBudget);
        // // setTotalSelectedPrice(newBudget);

        // // Update the total selected price
        // const updatedSelectedPrice =
        //   totalSelectedPrice + parseFloat(product.Price);
        // setTotalSelectedPrice(updatedSelectedPrice);
        // // setAvailableProducts(
        // //   availableProducts.filter((p) => product.Price <= newBudget)
        // // );

        // // Filter available products based on the new budget
        // const updatedAvailableProducts = products.filter(
        //   (p) => parseFloat(p.Price) <= newBudget
        // );
        // setAvailableProducts(updatedAvailableProducts);
        console.log("Updated available products:", updatedAvailableProducts);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Selected product exceeds the maximum price limit.");
    }
  };

  const handleProductDelete = async (product) => {
    try {
      //   const query = `/cart/${idGift}/product/${product.Id}`; // Adjust this to the correct endpoint if necessary
      //   const query = `/cart/${giftData.Id}/product/${product.Id}`; // Adjust this to the correct endpoint if necessary
      const query = `/cart/${giftData.Id}/product/${product.Id}`; // Use CartId instead of ProductId

      const response = await GoToServer(query, "DELETE");

      if (response.status === "success") {
        //   if (response.status === 200) {
        // Update the selectedProducts state to remove the deleted product
        const updatedSelectedProducts = selectedProducts.filter(
          (p) => p.Id !== product.Id
        );
        setSelectedProducts(updatedSelectedProducts);

        // Recalculate the total selected price
        const updatedSelectedPrice = updatedSelectedProducts.reduce(
          (total, p) => total + parseFloat(p.Price) * p.Amount,
          0
        );
        setTotalSelectedPrice(updatedSelectedPrice);

        // Update available products based on the new budget
        const remainingBudget = totalPrice - updatedSelectedPrice;
        const updatedAvailableProducts = products.filter(
          (p) => parseFloat(p.Price) <= remainingBudget
        );
        setAvailableProducts(updatedAvailableProducts);

        alert("Product deleted successfully");
      } else {
        alert("Failed to delete the product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product");
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
          handleProductDelete={handleProductDelete}
          idGift={idGift}
        />
      ) : (
        <GiftDetails giftData={giftData} goToChooseGift={goToChooseGift} />
      )}
    </div>
  );
}
