import React,{createContext,useState} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Header from './components/header/Header';
import Login from './components/login/Login';
import Home from './components/Home/Home';
import Admin from './components/admin/Admin';
import Notfound from './components/nofound/Notfound';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PrivateRoute from './components/privateroute/PrivateRoute';
import Checkout from './components/checkout/Checkout';
import Orders from './components/orders/Orders';
import Manageproducts from './components/manageproducts/Manageproducts';
export const UserContext = createContext()
function App() {
  const [loggedInUser,setloggedInUser] = useState({})
  return (
    <div className="">
    <UserContext.Provider value={[loggedInUser,setloggedInUser]}>
    <Router>
       <Switch>
       <Route path="/home">
         <Home></Home>
         </Route>
         <Route path="/login">
         <Login></Login>
         </Route>
        
         <PrivateRoute path={`/admin`}>
        <Admin></Admin>
         </PrivateRoute>
         <PrivateRoute path={`/checkout`}>
        <Checkout></Checkout>
         </PrivateRoute>
         <PrivateRoute path={`/orders`}>
        <Orders></Orders>
         </PrivateRoute>
         <PrivateRoute path={`/manageproducts`}>
        <Manageproducts></Manageproducts>
         </PrivateRoute>
         <Route exact path="/">
         <Home></Home>
         </Route>
         <Route path="*">
         <Notfound></Notfound>
         </Route>

       </Switch>
     </Router>
     </UserContext.Provider>
    </div>
  );
}

export default App;


{/*
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Admin from "./components/admin/Admin";
import Deals from "./components/deals/Deals";
import Home from "./components/Home/Home";
import Orders from "./components/orders/Orders";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/deals">Deals</Link>
          </li>
        </ul>

        <hr />

    
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/deals">
            <Deals />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

*/}