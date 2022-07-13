import React ,{useState} from 'react';
import './header.styles.css'
import Sidebar from '../sidebar/Sidebar.component';
import { Link } from 'react-router-dom';


const Header = () => {
    

const [isActive, setIsActive] = useState(false);
let updateClassName = !isActive ? "hidden" : "";

const handleClick = ()=> setIsActive(!isActive)


return (
    <div className="container">
        <h1 className='logo'><Link to="/">Book Store</Link></h1>
        
        <div className='hamburger-container' onClick={handleClick}>
            <div className='hamburger-line'></div>
            <div className='hamburger-line'></div>
            <div className='hamburger-line'></div>
        </div>
        <Sidebar className={updateClassName} handleClick={handleClick}/>
    </div>
)}

export default Header;