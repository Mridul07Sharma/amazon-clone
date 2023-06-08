import React, { useEffect } from 'react'
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Orders from './Orders';
import Payment from './Payment';
import {auth} from './firebase'
import Login from './Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useStateValue } from './StateProvider'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
const promise = loadStripe("pk_test_51NGLTySD0HqlvIuPHcKOVejtZF4f1zXVZjNRNZdBMXk5SgLRMJez4XGfbw7aFbPH5RD0pDjxHKxV7wWQbqSpkKot002j32BL0X");
function App() {
  const [{}, dispatch]=useStateValue();
  useEffect(()=>{
    //will only once when the app component loads.....
    //it is like an if statement in react
      auth.onAuthStateChanged(authUser => {
        console.log('The User is >>>>> ', authUser);
        if(authUser){
          // the user just logged in/ the user was logged in
              dispatch({
                type:"SET_USER",
                user:authUser,
              })
        }else{
          //the user is logged out
          dispatch({
            type:"SET_USER",
            user:null,
          })
        }
      })
  },[])
  return (
    <Router>
      <div className="app">
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<><Header /><Orders /></>} />
          <Route path="/checkout" element={<><Header /><Checkout /></>} />
          <Route path="/payment" element={<><Header /><Elements stripe={promise}><Payment /></Elements></>} />
          <Route path="/" element={<><Header /><Home /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// for deployment first run    
// npm run build
// firebase deploy --only hosting
