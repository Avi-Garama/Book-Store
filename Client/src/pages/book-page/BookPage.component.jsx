import './book-page.styles.css';
import { useState, useEffect, useContext } from 'react';
import Loader from '../../components/shared/loader/Loader.component'
import { useParams,useNavigate } from 'react-router-dom';
import { useDispatchCart } from '../../contexts/CartProvider.component'; 
import cartActionTypes from '../../action/cart-action';
import { AuthContext } from '../../contexts/AuthProvider.component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import environments from '../../config/environments.js';


const BookPage = () => {

    const API_URL = environments.API_URL;
    const dispatch = useDispatchCart();
    const navigate = useNavigate();

    const params = useParams();
    const bookID = params.bookID;

    const [book, setBook] = useState(null);
    const [isLoad, setIsLoad] = useState(true);
    const authContextValue= useContext(AuthContext);


    const getBook = async () => {
        try {
            const response = await fetch(`${API_URL}/book/${bookID}`);
            if (!response.ok) {
                throw new Error();
            }

            const responseObj = await response.json();
            const book = responseObj.data;

            setBook(book);

            if(authContextValue?.userToken != null){
            const cartRes = await fetch(`${API_URL}/cart`, {
                headers:{
                  'Authorization': authContextValue.userToken,
                }
              }) 

              if(!book) return navigate('*');
        
              if (!cartRes.ok) throw new Error();
        
              const cartResObj = await cartRes.json();
              const cart = cartResObj.data.cart;

              dispatch({ type: cartActionTypes.INIT,  payload: { items: cart.books, price:0}});
}
            setTimeout(() => {
                setIsLoad(false);
            }, 2000);
        } catch (err) {
            navigate('*');
        }
    };


    const addToCart = async (book) => {

            try {
                const response = await fetch(`${API_URL}/cart/add-to-cart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authContextValue.userToken,
                    },
                    body: JSON.stringify({ bookID}),
                });

                if(!authContextValue.userToken) return toast.warn('You must login before buy');
    
                if (!response.ok) {
                    throw new Error();
                }else{
                    dispatch({ type: cartActionTypes.ADD_TO_SHOP, payload:{ book } });
                    toast.success('The book is added to the cart', {
                        position: "top-center",
                        autoClose: 2000,
                        closeOnClick: true,
                        });
                    }
        
            } catch (error) {
                toast.error('Something went wrong!');
            }

    };


    useEffect(() => {
    getBook();
    }, []);

        
    return isLoad? (<Loader/>) : ( 
    <div className='book-page-tittle' >     
       <ToastContainer style={{fontSize: "16px"}} 
       position="top-center"
       autoClose={2000}
       hideProgressBar={true}
       closeOnClick/>
       <div className='book-page-container'>
       <img className='img-book-page' src={book.bookCover} />

       <div className="book-page-details">
       <h2 className='book-page-tittle'>{book.title}</h2>

       <div className="details">
       <p><strong>by:</strong> {book.author}</p>
       <p><strong>pages:</strong> {book.pages}</p>
       <p><strong>price:</strong> {book.price}</p>
       </div>

       <p>{book.description}</p>
       <button className='submit-form' onClick={() => addToCart(book)}>add to cart</button>
       
       </div>
       
       </div>

    </div>
)}

export default BookPage;