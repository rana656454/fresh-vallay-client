import React from 'react';
import { useHistory } from 'react-router-dom';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import'./productinfo.css'

const Product = (props) => {
    const history = useHistory()
  const product= props.product;
  const deleteProduct=(id)=>{    
      console.log(id)
        fetch(`https://sheltered-shore-39932.herokuapp.com/deleteproduct/${id}`,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            
          })
        .then(resp=>resp.json())
        .then(data=>console.log(data))
        history.push('/manageproducts');
    }

    return (
        
        <tr className="pd-tr">
      <td>{product.name}</td>
      <td>{product.weight}</td>
      <td>{product.price}</td>
      <td> <button onClick = {()=>deleteProduct(product._id)}><RiDeleteBin5Fill></RiDeleteBin5Fill></button></td>
    </tr>
       

        
   
    );
};

export default Product;