import './home-page.styles.css'
import { useEffect, useState } from 'react'
import Loader from '../../components/shared/loader/Loader.component';
import ChooseBooks from '../home-page/choose-book/ChooseBooks.component'
import { toast } from 'react-toastify';
import environments from '../../config/environments.js';


const HomePage = () =>  {
        const API_URL = environments.API_URL;
        const [isLoad, setIsLoad] = useState(true);
        const [books, setBooks] = useState([]);

        const getAllBooks = async() => {

        try {
        const response = await fetch(`${API_URL}/books`);
        
        if (!response.ok) throw new Error();
        
        const responseObj = await response.json();
        const books = responseObj.data.books;
        setBooks(books);
        
        }catch (error) {
        toast.error('something wrong');
        }
        };

        useEffect(() => {
        setTimeout(() => {
        setIsLoad(false) 
        }, 2000);
        getAllBooks()
        },[]);
        
        return isLoad ? (<Loader/>) 
        : 
        (<div className='book-container'>

        {books.map((book, index) =>{
        return <ChooseBooks
        key = {index}
        id ={book._id}
        bookCover={book.bookCover}
        title={book.title}
        author={book.author}
        description={book.description}
        price={book.price}  
        />
        })}

        </div>
        )
        }
        
        export default HomePage;