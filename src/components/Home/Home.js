import React, { useContext,useEffect, useState } from 'react';
import{UserContext} from '../../App'
import Header from '../header/Header';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Product from '../product/Product';
import { processOrder,addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Home = () => {
    const [loggedInUser,setloggedInUser]= useContext(UserContext)
   let isLogIn = false; 
  if(loggedInUser.name){
         isLogIn = true;
  }
    const [cart, setCart] = useState([]);
    const [products,setproducts] = useState([])
    const productLength = products.length
    const history = useHistory()
    const handleAddProduct = (product) =>{
        if(isLogIn){
            const toBeAddedKey = product._id;
            const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
            let count = 1;
            let newCart;
            if(sameProduct){
                count = sameProduct.quantity + 1;
                sameProduct.quantity = count;
                const others = cart.filter(pd => pd.key !== toBeAddedKey);
                newCart = [...others, sameProduct];
            }
            else{
                product.quantity = 1;
                newCart = [...cart, product];
            }
            setCart(newCart);
            addToDatabaseCart(product._id, count,'yy');
            history.push('/checkout');
        }
        else{
            history.push('/checkout');
            const toBeAddedKey = product._id;
            const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
            let count = 1;
            let newCart;
            if(sameProduct){
                count = sameProduct.quantity + 1;
                sameProduct.quantity = count;
                const others = cart.filter(pd => pd.key !== toBeAddedKey);
                newCart = [...others, sameProduct];
            }
            else{
                product.quantity = 1;
                newCart = [...cart, product];
            }
            setCart(newCart);
            addToDatabaseCart(product._id, count,'yy');
        }
        
       //console.log(product)
    }

    useEffect(() => {
      fetch('https://sheltered-shore-39932.herokuapp.com/products')
      .then(res=>res.json())
      .then(data=>setproducts(data))
    }, [])
    return (
        <div>
        <Header></Header>
        <div className="container">
        <div className="row">
           {
            productLength<1?<Spinner animation="border" variant="info" />:''
           }
          {
            
              products.map(pd => <Product product={pd} handleAddProduct = {handleAddProduct} key={pd._id}></Product>)
              
          }
          
        </div>
        </div>
        </div>
    );
};

export default Home;