import './login-page.styles.css';
import FormLabel from '../../components/shared/form/form-label/FormLabel.component';
import FormInput from '../../components/shared/form/form-input/FormInput.component';
import { Link } from 'react-router-dom';
import Loader from '../../components/shared/loader/Loader.component';
import { useEffect, useState, useContext } from 'react';
import isEmail from 'validator/es/lib/isEmail';
import isStrongPassword from 'validator/es/lib/isStrongPassword';
import FormButton from '../../components/shared/form/form-button/FormButton.component';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider.component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import environments from '../../config/environments.js';


const LoginPage = () => {

const API_URL = environments.API_URL;
const navigate = useNavigate();
const authContextValue= useContext(AuthContext);

const [isLoad, setIsLoad] = useState(true);

const [email, setEmail] = useState('') 
const [isEmailValid, setIsEmailValid] = useState(false);
const [emailMessageError ,setEmailMessageError ] = useState('');

const [password, setPassword ] = useState('');
const [passwordMessageError ,setPasswordMessageError ] = useState('');
const [isPasswordValid ,setIsPasswordValid ] = useState(false);

const validateEmailInput = (event) => {
const emailInput = event.target.value.toLowerCase().trim();
setEmail(emailInput);


if(emailInput === ""){
    setIsEmailValid(false);
    setEmailMessageError('please enter email address');
    return
}

if(!isEmail(emailInput)){
    setIsEmailValid(false);
    setEmailMessageError('please enter valid email address');
    return
}

    setIsEmailValid(true);
    setEmailMessageError('');

}


const validatePasswordInput = (event) => {
    const passwordInput = event.target.value.trim();
    setPassword(passwordInput);
    
    if(passwordInput === ""){
        setPasswordMessageError('not valid password');
        setIsPasswordValid(false);
        return
    }

    if(!isStrongPassword(passwordInput)){
        setPasswordMessageError('enter strong password');
        setIsPasswordValid(false);
        return
    }
    setPasswordMessageError('');
    setIsPasswordValid(true);

}


const handleSubmit = async (event) => {
    event.preventDefault();
    
    if(!isEmailValid || !isPasswordValid ){
        toast.warn('wrong email or password');
        return
    }
const data = {
    email: email,
    password: password
}
    try {
        const response = await fetch(`${API_URL}/users/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(!response.ok) throw new Error();

        const responseObj = await response.json();
        const token = responseObj.data.token;

        localStorage.setItem('user-token', token);
        authContextValue.setUserToken(token);
        
        navigate('/');
        
    } catch (error) {
        toast.error('something wrong');

    }
}


useEffect(()=>{
    if(authContextValue.userToken) navigate('/'); 
})


useEffect(() => {
    setTimeout(() => {
        setIsLoad(false);
    }, 2000);
},[])

        return isLoad ? (<Loader/>) :
         (  <div className = "login-container" >
            <ToastContainer 
            position="top-center"
            autoClose={2000}
            hideProgressBar={true}
            closeOnClick/>


            <form className = "contact-form signup" >
            <h1 > Login </h1>

            <div className='form-label-input' >
            <FormLabel htmlFor = "email" text = "Email:" />
            <FormInput className = "input-form" type = "text" placeholder = "example@example.com" id = "email" required onInput={validateEmailInput}/>
            {!isEmailValid && <div className="error-message">{emailMessageError}</div>}

            </div> 

            <div className='form-label-input' >
            <FormLabel htmlFor = "password" text = "Password:" / >
            <FormInput className = "input-form" type = "password" placeholder = "******" id = "password" required onInput={validatePasswordInput}/>
            {!isPasswordValid && <div className="error-message">{passwordMessageError}</div>}
            </div> 

            <div >
            <div className = 'sign-up-message'> 
            <Link to = "/signup" >Don 't have an account? Sign up</Link>
            </div>
            <FormLabel htmlFor = "login" />
            <FormButton className = "btn-submit" type = "submit" text = 'Login'  onClick={handleSubmit}/>
            </div>
            </form > 
            
            </div>)}

        export default LoginPage;
