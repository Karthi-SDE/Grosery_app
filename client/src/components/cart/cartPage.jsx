import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CartPage.css'; // Create this CSS file to style your cart page
import { useAuthContext } from '../../context/AuthContext';
import {message } from 'antd';


const CartPage = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { authUser, setAuthUser } = useAuthContext();

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await axios.get("api/v1/user/cart", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        if(response.data && !response.data.success){
          message.error(response.data.message)
        }
        setCartItems(response.data.cartItems);
        setTotalPrice(response.data.totalPrice);
      } catch (error) {
        message.error(error.message)
        console.error('Error fetching cart items:', error);
      }
    }

    fetchCartItems();
  }, []);

  const handleOrder = async () => {
    try {
        const userId = authUser.id; // You can get this from the authUser or some other context
    const requestBody = {
      userId,
      cartItems: cartItems.map(item => ({
        id: item.itemId,
        price: item.item.price,
        quantity: item.quantity
      }))
    };
      const response = await axios.post("api/v1/user/create", {
        ...requestBody
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      if(response.data && !response.data.success){
        message.error(response.data.message);
        return;
      }

      message.success("Order placed successfully");
      onClose();

    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {/* Conditional rendering for empty cart */}
      {cartItems.length === 0 ? (
        <>
        <p className="empty-cart-message">Empty cart</p>
        <button onClick={onClose}>Close</button>
        </>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.item.name} - {item.quantity}
              </li>
            ))}
          </ul>
          <p>Total Price: ${totalPrice}</p>
          <button onClick={handleOrder}>Order</button>
          <button onClick={onClose}>Close</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
