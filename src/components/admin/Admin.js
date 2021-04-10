import React, {useContext } from 'react';
import{UserContext} from '../../App'
import Addproduct from '../addproduct/Addproduct';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
const Admin = () => {
    const history = useHistory()
    const [loggedInUser,setloggedInUser]= useContext(UserContext)
const handleManageProduct =() =>{
     history.push('/manageproducts');
}

    return (
        <div>
          <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Fresh Valley Products Shop</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link to="/manageproducts">Manage Products</Nav.Link>
      <Nav.Link to="/admin">Add Products</Nav.Link>
      
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
           <button onClick={handleManageProduct} className="btn btn-primary">Manage Prodcuts</button>
            <Addproduct></Addproduct>
        </div>
    );
};

export default Admin;
