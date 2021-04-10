import React,{useEffect,useState} from 'react';
import './product.css'

const Product = (props) => {
  const product= props.product;
    return (
        <div className="col-md-4 col-sm-12">
        <div className="product-item">
      <img src={product.image} alt="" srcset=""/>
      <h3>{product.name} - {product.weight}</h3>
      <div>${product.price} <button onClick={() => props.handleAddProduct(product)} className="btn btn-info">Buy Now</button> </div>
   </div>
   </div>
    );
};

export default Product;