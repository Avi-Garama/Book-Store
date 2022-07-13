import './sidebar.styles.css'
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../contexts/CartProvider.component';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider.component';


const Sidebar = (props) => {  

const items = useCart();
const navigate = useNavigate();
const authContextValue= useContext(AuthContext)

const handleLogout = async () => {
    try {
        const response = await fetch('http://localhost:2999/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authContextValue.userToken,
            },
        });

        if (!response.ok) {
            throw new Error();
        }

        localStorage.removeItem('user-token');
        authContextValue.setUserToken(null);
        navigate('/');

    } catch (error) {
        alert('Something wrong');
    }

};

return (
        <div className={`overlay ${props.className}`} onClick={props.handleClick}>
        <div className={`open-sidebar ${props.className}`}>
        <div className='close-sidebar' onClick={props.handleClick}>&times;</div>
        <ul className='sidebar-list'>
        <Link className='sidebar-link' to="/" onClick={props.handleClick}><li className='sidebar-item'>Home</li></Link>

        {!authContextValue.userToken &&
        <Link className='sidebar-link' to="/login" onClick={props.handleClick}><li className='sidebar-item' >Login</li></Link>
        }
        
        {!authContextValue.userToken &&
        <Link className='sidebar-link' to="/signup" onClick={props.handleClick}><li className='sidebar-item' >Sign Up</li></Link>
        }

        {authContextValue.userToken &&
        <Link className='sidebar-link' to="/cart" onClick={props.handleClick}><li className='sidebar-item' >Cart ({items.length})</li></Link>
        }

        {authContextValue.userToken &&
        <Link className='sidebar-link' to="/login" onClick={handleLogout}><li className='sidebar-item' >Logout</li></Link>
        }
        

        </ul>
        </div>
    </div>

)
}

export default Sidebar;