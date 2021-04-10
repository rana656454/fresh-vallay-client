import React,{useContext,useEffect, useState} from 'react';
import{UserContext} from '../../App'
import Header from '../header/Header';
import Card from 'react-bootstrap/Card';
import Orderproducts from '../orderproducts/Orderproducts';


const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {email,name}= loggedInUser
    const [orderproducts,setorderproducts]= useState([])
    const[myorder,setmyorder] = useState([])
    useEffect(()=>{
        fetch(`https://sheltered-shore-39932.herokuapp.com/customerorders/${email}`)
        .then(resp=>resp.json())
        .then(data=>{
            setmyorder(data)
           // setorderproducts(myorder.products)
        })
    }
    ,[])
     return (
        <div className="container">
        <Header></Header>
        
            <Card style={{ width: '28rem' }}>
  <Card.Body>
    <Card.Title>
    {myorder.name}
    {myorder.orderTime}
    </Card.Title>
    <Card.Subtitle className="mb-2 text-muted">You have a new order</Card.Subtitle>
    <Card.Text>
      {
        orderproducts.map(pd=><Orderproducts product={pd}></Orderproducts>)
      }
    
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card>
        
            
        </div>
    );
};

export default Orders;