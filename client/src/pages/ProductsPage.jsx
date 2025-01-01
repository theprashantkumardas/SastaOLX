import React from 'react';
import AddProduct from '../components/Products/AddProduct';
import ProductList from '../components/Products/ProductList';

const ProductsPage = () => {
  return (
    <div>
      <h1>Products</h1>
      <AddProduct />
      <ProductList />
    </div>
  );
};

export default ProductsPage;