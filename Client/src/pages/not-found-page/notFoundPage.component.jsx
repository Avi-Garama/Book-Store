import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/shared/loader/Loader.component';
import './not-found-page.styles.css';
import TrexRunner from '../trexRunner/TrexRunner.component';

const NotFoundPage = () => {

        const [isLoad, setIsLoad] = useState(true);

        useEffect(() => {
            setTimeout(() => {
                setIsLoad(false);
            }, 2000);
        },[]);
        
        return isLoad ? ( <Loader /> ) :
        (<div className = "not-found-container" > 404

        <button type= "button" className='btn-not-found'>
        <Link className='link-not-found' to="/">Go Back Home</Link>
        </button>
        <TrexRunner/>
        
        </div>)
        }

        export default NotFoundPage;
