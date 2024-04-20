import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { BiLogOut, BiShoppingBag } from "react-icons/bi"; // Add the cart icon
import axios from 'axios';
import CartPage from '../cart/cartPage'; 
import './Headerx.css'


const HeaderRoute = ({ children }) => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuthContext();
  const [cartCount, setCartCount] = useState(0); // State to hold the cart count
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  useEffect(() => {
    async function fetchCartCount() {
      try {
        const response = await axios.get("api/v1/user/cart", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        const totalCount = response.data.cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(totalCount);
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    }

    fetchCartCount();
  }, [authUser]); // Trigger the effect when authUser changes

  return (
    authUser && (
      <div>
        <div className='flex justify-between items-center bg-primary p-5'>
          <h1 className='text-white text-2xl cursor-pointer' onClick={() => { navigate('/') }}>Crud App</h1>
          <div className='bg-white py-2 px-4 rounded flex items-center'>
            
          
          {authUser.role === 'user' && (
              <>
                <span className='mr-4 cursor-pointer' onClick={openCart}>
                  <BiShoppingBag className='w-6 h-6 text-black' />
                  <span className="cart-count">{cartCount}</span>
                </span>
              </>
            )}
            
            <span className='mr-auto ml-4 cursor-pointer' onClick={() => {
                navigate('/');
            }}>{authUser.first_name}</span>
            <BiLogOut className='w-6 h-6 text-black cursor-pointer' onClick={() => {
              localStorage.removeItem('token');
              setAuthUser(null);
              navigate('/login');
            }} />
          </div>
        </div>
        
            {isCartOpen && <CartPage onClose={closeCart} />}


        {
          <div>
            {children}
          </div>
        }
      </div>
    )
  );
};

export default HeaderRoute;
