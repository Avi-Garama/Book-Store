import React, { useEffect, useContext} from "react";
import { useCart,  useDispatchCart } from "../../contexts/CartProvider.component"; 
import CartItem from "./cart-item/CartItems.components";
import './cart-page.styles.css';
import cartActionTypes from "../../action/cart-action";
import { AuthContext } from "../../contexts/AuthProvider.component";
import { useNavigate } from "react-router-dom";
import FormButton from "../../components/shared/form/form-button/FormButton.component";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import environments from '../../config/environments.js'


const CartPage = () => {

  const API_URL = environments.API_URL;
  const navigate = useNavigate();
  const books = useCart();
  const dispatch = useDispatchCart();
  const authContextValue= useContext(AuthContext);
  const totalPrice = (booksData)=> booksData.reduce((book, price) => book + price?.bookID?.price, 0);
  

  const getCart = async () => {

    try {

      const response = await fetch(`${API_URL}/cart`, {
        headers:{
          'Authorization': authContextValue.userToken,
        }
      }) 

      if (!response.ok) throw new Error();

      const responseObj = await response.json();
      const cart = responseObj.data.cart;
      dispatch({ type: cartActionTypes.INIT,  payload: { items: cart.books, price:0}});

    } catch (error) {
      toast.error('Something went wrong!');
    }
  }


  const handleRemove  = async (bookID) => {

    try {
      const response = await fetch(`${API_URL}/cart`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': authContextValue.userToken,
          },
          body: JSON.stringify({ bookID}),
      });

      if (response.status !== 201) {
          throw new Error();
      }else{
        toast.success('The book removed from cart', {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          });
        dispatch({ type: cartActionTypes.REMOVE_FROM_SHOP, payload:{ bookID } });
      }

    }catch (error) {
    toast.error('Something went wrong!');
    }
  };


  const handleCheckOut  = async () => {

    try {
      const response = await fetch(`${API_URL}/cart/checkout`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': authContextValue.userToken,
          },
      });

      if (response.status !== 201) {
          throw new Error();
      }else{
        dispatch({ type: cartActionTypes.CHECKOUT, payload:{ items: [], price:0 } });
        toast.success('you check out!');
      }

  } catch (error) {
      toast.error('Something went wrong!');
  }
  }


  useEffect(() => {
  getCart();
  },[])
 
 
  useEffect(()=>{
   if(!authContextValue.userToken) navigate('/');
  })


  return books.length === 0 ? (<div className="cart-container-item">
      <ToastContainer
      style={{fontSize: "16px"}} 
      position="top-center"
      autoClose={2000}
      hideProgressBar={true}
      closeOnClick/>

    <h1>Cart is empty</h1>
    
    </div>)
  : 
  (<div className="cart-container-item">

      <ToastContainer style={{fontSize: "16px"}} 
      position="top-center"
      autoClose={2000}
      hideProgressBar={true}
      closeOnClick/>

      {books.map((book, index) => (
      <CartItem 
      handleRemove={handleRemove}
      key={index}
      book={book.bookID}
      index={index}
      />
      ))}

      <p className="total-price">Total price:{totalPrice(books)}$</p>

      <FormButton
       className = "btn-submit cart-btn"
       type = "submit"
       text = 'Check Out'
       onClick={handleCheckOut}/>

  </div>

  );
}

export default CartPage;