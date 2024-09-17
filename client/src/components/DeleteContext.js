import React, { createContext, useContext } from 'react';

// Créez un contexte pour la fonction de suppression
const DeleteProductContext = createContext();

// Fournissez ce contexte à votre arbre de composants
export const DeleteProductProvider = ({ children, handleProductDelete }) => (
  <DeleteProductContext.Provider value={handleProductDelete}>
    {children}
  </DeleteProductContext.Provider>
);

// Hook pour utiliser la fonction de suppression dans d'autres composants
export const useDeleteProduct = () => useContext(DeleteProductContext);
