import React, { useState, useEffect } from 'react'
import './Payment.css'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider';
import { getBasketTotal } from "./reducer";
import CurrencyFormat from 'react-currency-format';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from './axios';
import {db} from './firebase';
function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing]=useState("");
  const [succeeded, setSucceeded]=useState(false);
  const [clientSecret, setClientSecret]=useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const history = useNavigate();
  useEffect(()=>{
          const getClientSecret= async()=>{
            const response=await axios({
              method:"post",
              url: `/payments/create?total=${getBasketTotal(basket)}`
            });
            setClientSecret(response.data.clientSecret);
          } 
          getClientSecret();
  },[basket])
  console.log('The Secret is >>', clientSecret);
  const handleSubmit =async (event) => {
            event.preventDefault();
            setProcessing(true);
            const payload= await stripe.confirmCardPayment(clientSecret,{
              payment_method:{
                card:elements.getElement(CardElement)
              }
            }).then(({paymentIntent})=>{
              //paymentIntent = payment confirmation
              db
              .collection("users")
              .doc(user?.uid)
              .collection("orders")
              .doc(paymentIntent.id)
              .set({
                basket:basket,
                amount:paymentIntent.amount,
                created:paymentIntent.created
              });
              setSucceeded(true);
              setError(null);
              setProcessing(false);
              dispatch({
                type:"EMPTY_BASKET"
              })
              history('/orders', {replace:true});
             })
  }
  const handleChange = event => {
    //listen for changes in the card element
    // display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  }
  return (
    <div className='payment'>
      <div className="payment_container">
        <h1>
          Checkout {<Link to='/checkout'>({basket?.length}) items</Link>}
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>
              {user?.email}
            </p>
            <p>
              123 React Lane
            </p>
            <p>
              Parel Bridge, Chamba
            </p>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map(item => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>

              <CardElement onChange={handleChange} />
              <div className="payment_priceContainer">
                <CurrencyFormat renderText={(value) => (                 
                    <h3>Order total: <strong>{value}</strong></h3>                  
                )}
                  decimalScale={2}
                  value={getBasketTotal(basket)} // Part of the homework
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing? <p>Processing</p>: "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment