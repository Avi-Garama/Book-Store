import React from "react";
import FormButton from "../../../components/shared/form/form-button/FormButton.component";
import Loader from "../../../components/shared/loader/Loader.component";
import './cart-Item.styles.css';


const CartItem = ({ book, handleRemove }) => {
    
    return ( !book ? <Loader/> :
        <div className="book-information">
        <img className="img-cart-page" src={book.bookCover}/>

        <div className="about-book">

        <div>
        <p >{book.title}</p>
        <p>Price: {book.price}$</p>
        </div>

        <FormButton
         className="btn-submit"
         text="Remove from cart"
         onClick={() => handleRemove(book._id)}/>
        </div>
        </div>
       );
       };

  export default CartItem;