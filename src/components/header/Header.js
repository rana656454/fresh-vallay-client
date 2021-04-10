import React,{useContext} from 'react';
import{UserContext} from '../../App'
import './header.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { Link } from 'react-router-dom';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
  }
const Header = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const [loggedInUser,setloggedInUser]= useContext(UserContext)
   let isLogIn = false; 
  if(loggedInUser.name){
         isLogIn = true;
  }

  const handleLogout = () =>{
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      processOrder()
      const signInUser = {
        name:"",
        email:""
      }
       setloggedInUser(signInUser)
    }).catch((error) => {
      // An error happened.
    });
  }

    return (
        <div className="container nav-container">
        <div className="row wrapper-full menu-part">
      <div className=" col-md-4 logo-item">
          <h2>Fresh Valley Products Shop</h2>
      </div>
      <div className="menu-item col-md-8">
          <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/orders">Orders</Link></li>
              
              <li><Link to="/admin">Admin</Link></li>
              <li><Link to="/">deals</Link></li>
    
              <li ><Link to="/login">
              {
              isLogIn ? <button className="btn btn-primary" onClick={handleLogout}>Log Out</button>:
              <button className="btn btn-primary">Log In</button>
            }
              </Link></li>
    <li>{loggedInUser.name}</li>
          </ul>
      </div>
  
  <div className="clr"></div>
</div>
        </div>
    );
};

export default Header;