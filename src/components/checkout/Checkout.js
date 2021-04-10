import React,{useContext,useEffect, useState} from 'react';
import{UserContext} from '../../App'
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import Header from '../header/Header';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Tr from './tr/Tr';
const Checkout = () => {
    const [cart, setCart] = useState([]);
    const [result,setResult]=useState(0)
    const [orderPlaced, setOrderPlaced] = useState(false);
    const saveCart = getDatabaseCart()
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    //const savedCart = getDatabaseCart();
    //const productKeys = Object.keys(savedCart);
    //console.log(productKeys)
    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

      fetch('https://sheltered-shore-39932.herokuapp.com/productsbyIds',{
          method:"POST",
          headers:{
              "Content-Type": "application/json"
          },
          body: JSON.stringify(productKeys)

      })
      .then(resp=>resp.json())
      .then(data=>{
          setCart(data)
           const result1 = cart.reduce(function(tot, arr) { 
            // return the sum with previous value
            return tot + arr.price;
          },0);
          setResult(parseInt(result)+parseInt(result1))
        })

    }, []);

    const handleCheckout =() =>{
        const orderDetails = {...loggedInUser,products:cart,orderTime:new Date()}
        const saveCart = getDatabaseCart()
          fetch('https://sheltered-shore-39932.herokuapp.com/addorder',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
          })
          .then(resp=>resp.json())
          .then(data=>{
            if(data){
              processOrder()
              alert("order placed successfully")
            }
          })
    
    }

    return (
        <div>

          <Header></Header>
          <Table striped bordered hover>
  <thead>
    <tr>
      <th>Description</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>

{
    cart.map(pd=><Tr product={pd} key = {pd._id}></Tr>)
    
}
<tr>
      <td>Total price</td>
      <td></td>
      <td>{result}</td>
    </tr>
  </tbody>
</Table>

<Button variant="warning" onClick={handleCheckout}>CheckOut</Button>
        </div>
    );
};

export default Checkout;