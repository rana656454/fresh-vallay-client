import React, {useContext,useEffect, useState } from 'react';
import{UserContext} from '../../App'
import Productinfo from '../productinfo/Productinfo';
import Table from 'react-bootstrap/Table';
import'./manageproducts.css'
import Header from '../header/Header';
const Manageproducts = () => {
  const [loggedInUser,setloggedInUser]= useContext(UserContext)
    const [products,setproducts] = useState([])
    
    useEffect(() => {
        fetch('https://sheltered-shore-39932.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=>setproducts(data))
      }, [])
    return (
        <div>
        <Header></Header>
           <h1 className="manage-header-text">Manage Prodcuts</h1>
           <div className="container">
           <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      
      <th>Name</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {
              products.map(pd => <Productinfo product={pd} key={pd._id}></Productinfo>)
          }
    
  </tbody>
</Table>
</div>
            
            
        </div>
    );
};

export default Manageproducts;