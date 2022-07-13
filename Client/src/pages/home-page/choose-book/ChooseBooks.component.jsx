import './choose-books.styles.css';
import { useNavigate } from 'react-router-dom';


const ChooseBooks = (props) => {

    const navigate = useNavigate();

    const handleClick = () => navigate(`book/${props.id}`);
            
            return(
                <div className='book' id = {props.id} onClick={handleClick} >
                <img className='img-book' src={props.bookCover} alt={props.title} />
                <h2 className='h2-book'>{props.title}</h2>
                <p className='p-book'>{props.author}</p>
                </div>
            )
        
}

export default ChooseBooks;