import React,{useContext} from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import './login.css'
import { useHistory,useLocation } from 'react-router-dom';
import{UserContext} from '../../App'
import Header from '../header/Header';

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    }
    
const Login = () => {
 const [loggedInUser,setloggedInUser]= useContext(UserContext)
  const [signinStatus,setsigninStatus] = useState(false)
  const history = useHistory()
  const location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } };
  const handleSigninstatus = () =>{
      setsigninStatus(!signinStatus)
  }
    const [user,setUser] = useState({
        isSignedIn: false,
        name:"",
        photo:"",
        password:"",
        email:"",
        error:"",
        cpassword:"",
        success:false
      })
      const handleSubmit = (e) =>{
       if(!signinStatus && user.email && user.password){
         if(user.password===user.cpassword){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in 
          let newUserInfo = {...user}
    newUserInfo.error=""
    newUserInfo.success=true
    setUser(newUserInfo)
    updateUser(user.name)
    setsigninStatus(true)      
          
        })
        .catch((error) => {
          //const errorCode = error.code;
          //const errorMessage = error.message;
          // ..
        });
      }
      else{
        let newUserInfo = {...user}
        newUserInfo.error="password does not match"
        setUser(newUserInfo)
      }
       }

       else {
        let newUserInfo = {...user}
        newUserInfo.error="Password or email is Invalid . please refresh and check Again"
        setUser(newUserInfo)
       }
       
       if(signinStatus && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          var {displayName,email} = user;
       const signInUser = {name:displayName,email}
       console.log(signInUser)
       setloggedInUser(signInUser)
          history.replace(from)
          // ...
        })
        .catch((error) => {
          let newUserInfo = {...user}
        newUserInfo.error=error.message
        setUser(newUserInfo)
         
        });
       }

       e.preventDefault()
      }

      
  const updateUser = (name) =>{
    const user = firebase.auth().currentUser;

user.updateProfile({
  displayName: name,
}).then(function() {
 //console.log("update successful")
}).catch(function(error) {
  //console.log(error)
});

  }

      const handleBlur = (e) => {
        let isFormValid=true
        if(e.target.name === "email"){
          isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
          
        }
        if(e.target.name === "password"){
              const ispasswordValid = e.target.value.length >6
              const passwordHasNumber = /\d{1}/.test(e.target.value)
             isFormValid=ispasswordValid && passwordHasNumber
        }
          
        if(isFormValid){
              let newUser = {...user}
              newUser[e.target.name] = e.target.value
              setUser(newUser)
        }
      
      }
      const handleGoogleSignin = () =>{
        
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    const {displayName,email} = result.user;
    const signInUser = {name:displayName,email}
    console.log(signInUser)
    setloggedInUser(signInUser)
    const signedInUser = {
      isSignedIn: true,
      name:displayName,
      email:email
     }
     setUser(signedInUser)
    history.replace(from)
    // ...
  }).catch((error) => {
    //const errorCode = error.code;
    //const errorMessage = error.message;
    //const email = error.email;
    //const credential = error.credential;
    
  });
      }


      const provider = new firebase.auth.GoogleAuthProvider();
    
    return (
      <div className="login-main">
      <Header></Header>
        <div className="login-container">
        <div className="form1">
             {
                 !signinStatus ? <h1 className="form-header-text">Create An Account</h1>:
                 <h1 className="form-header-text">Sign Up</h1>
             }
     
      <form action="" onSubmit={handleSubmit}>
      {
          !signinStatus && <input type="text" onBlur={handleBlur} className="inp1" name="name" id="" placeholder="Your Name" required/>
        
      }
     
      <input type="email" onBlur={handleBlur} className="inp1" name="email" id="" placeholder="Your Email Address" required/><br/>
      <input type="password" onBlur={handleBlur} className="inp1" name="password" id="" placeholder="Your Password" required/><br />
      {
          !signinStatus && <input type="password" name="cpassword" onBlur={handleBlur} className="inp1" id="" placeholder="Confirm Password" required/>
          
      }
      
      <br/>
      <p className="error-signup-message">{user.error}</p>
      {
        !signinStatus ?  <input btn type="submit" className="btn-style" value="Create Account"/> :
        <input type="submit" className="btn-style" value="Sign In"/>
      }
      
      
    </form>
    {
       !signinStatus ? <p>Already Have an Account?<button className="btn-style2" onClick={handleSigninstatus}>Sign In</button></p>:
       <p>Don't Have An Account?<button onClick={handleSigninstatus} className="btn-style2">Create Account</button></p>     
    }
   
    </div>

    <button onClick={handleGoogleSignin}  className="btn-icon"><span className="google-icon"><FcGoogle/> </span> Continue With Google Account</button>
            
        </div>
        </div>
    );
};

export default Login;