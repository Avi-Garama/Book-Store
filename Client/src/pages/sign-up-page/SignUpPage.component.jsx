import './sign-up-page.styles.css';
import FormLabel from '../../components/shared/form/form-label/FormLabel.component';
import FormInput from '../../components/shared/form/form-input/FormInput.component';
import { useEffect , useState, useContext} from 'react';
import Loader from '../../components/shared/loader/Loader.component';
import isEmail from 'validator/es/lib/isEmail';
import isStrongPassword from 'validator/es/lib/isStrongPassword';
import FormButton from '../../components/shared/form/form-button/FormButton.component';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider.component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import environments from '../../config/environments.js';


const SignUpPage = () => {
 const API_URL = environments.API_URL;
 const navigate = useNavigate();
 const [isLoad, SetIsLoad] = useState(true);
 const authContextValue = useContext(AuthContext);

 const [firstName, setFirstName ] = useState('');
 const [firstNameMessageError ,setFirstNameMessageError ] = useState('');
 const [isFirstNameValid ,setIsFirstNameValid ] = useState(false);

 const [lastName, setLastName ] = useState(false);
 const [lastNameMessageError ,setLastNameMessageError ] = useState('');
 const [isLastNameValid ,setIsLastNameValid ] = useState(false);

 const [email, setEmail ] = useState('');
 const [emailMessageError ,setEmailMessageError ] = useState('');
 const [isEmailValid, setIsEmailValid] = useState(false);

 const [password, setPassword ] = useState('');
 const [isPasswordValid, setIsPasswordValid] = useState(false);
 const [passwordMessageError ,setPasswordMessageError ] = useState('');

 const [repeatPassword ,setRepeatPassword ] = useState('');
 const [isRepeatPasswordValid, setIsRepeatPasswordValid ] = useState(false); 
 const [repeatPasswordMessageError ,setRepeatPasswordMessageError ] = useState('');


const validateFirstName = (event) => {

    const firstNameInput = event.target.value.trim();
    setFirstName(firstNameInput);


    if (firstNameInput === "") {
        setFirstNameMessageError('enter your first name');
        setIsFirstNameValid(false);
        return
    }

    setIsFirstNameValid(true);
    setFirstNameMessageError('');
}


const validateLastName = (event) => {
    const lastNameInput = event.target.value.trim();
    setLastName(lastNameInput);

    if (lastNameInput === "") {
        setLastNameMessageError('enter your last name');
        setIsLastNameValid(false);
        return
    }

    setIsLastNameValid(true);
    setLastNameMessageError('');
}


const validateEmail = (event) => {
const emailInput = event.target.value.toLowerCase().trim();
setEmail(emailInput);

if(emailInput === ''){
    setIsEmailValid(false);
    setEmailMessageError('please enter a valid email address');
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


const ValidatePassword = (event) => {
    const passwordInput = event.target.value.trim();
    setPassword(passwordInput);
    
    if(passwordInput === ""){
        setPasswordMessageError('enter valid password');
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
 

const validateRepeatPassword = (event) => {
    const repeatPasswordInput = event.target.value.trim();
    setRepeatPassword(repeatPasswordInput);
    
    if(repeatPasswordInput !== password){
        setIsRepeatPasswordValid(false);
        return setRepeatPasswordMessageError('your password not match');
    }

    if(repeatPasswordInput === ""){
        setIsRepeatPasswordValid(false);
        return setRepeatPasswordMessageError('enter password again');
    }

    setPasswordMessageError('');
    setIsRepeatPasswordValid(true);

}


const handleSubmit = async (event) => {
    event.preventDefault();

    if(!isFirstNameValid || !isLastNameValid || !isRepeatPasswordValid || !isEmailValid || !isPasswordValid ){
        toast.error('One of the details is incorrect');
        return
    }else{
        toast.success('You have successfully registered');
    }

const data = {
    firstName,
    lastName,
    email,
    password
}


try {
    const response = await fetch(`${API_URL}/users/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(data)
    })

    if (response.status !== 201) throw new Error();

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
        SetIsLoad(false);
     }, 2000);
 },[])


        return isLoad? (<Loader/>) : (
            <div className = "signup-container">
            <ToastContainer 
            position="top-center"
            autoClose={2000}
            hideProgressBar={true}
            closeOnClick
            />
                        
            <form className = "contact-form signup">

            <h1> Sign Up </h1> 

            <div className='form-label-input'>
            <FormLabel htmlFor = "first-name"text = "First Name:" />
            <FormInput className = "input-form" type = "text" placeholder = "isarel" id = "first-name" required onInput={validateFirstName}/>
            {!isFirstNameValid && <div className="error-message">{firstNameMessageError}</div>}
            </div>

             <div className='form-label-input'>
            <FormLabel htmlFor = "last-name" text = "Last Name:" />
            <FormInput className = "input-form" type = "text" placeholder = "israeli" id = "last-name" required onInput={validateLastName}/> 
            {!isLastNameValid && <div className="error-message">{lastNameMessageError}</div>}

            </div>

            <div className='form-label-input'>
            <FormLabel htmlFor = "email" text = "Email:" />
            <FormInput className = "input-form" type = "text" placeholder = "example@example.com" id = "email" required onInput={validateEmail} />
            {!isEmailValid && <div className="error-message">{emailMessageError}</div>}
            </div> 

            <div className='form-label-input'>
            <FormLabel htmlFor = "password" text = "Password:" />
            <FormInput className = "input-form" type = "password" placeholder = "******" id = "password" required onInput={ValidatePassword}/>
            {!isPasswordValid && <div className="error-message">{passwordMessageError}</div>}

            </div>

            <div className='form-label-input'>
            <FormLabel htmlFor = "Repeat-password" text = "Repeat-password:" />
            <FormInput className = "input-form" type = "password" placeholder = "******" id = "repeat-password" required onInput={validateRepeatPassword}/>
            {!isRepeatPasswordValid && <div className="error-message">{repeatPasswordMessageError}</div>}

            </div>

            <div className='sign'>
            <FormLabel htmlFor = "signup" />
            <FormButton className = "btn-submit" type = "submit" text = 'Sign Up' onClick={handleSubmit}/>
            </div>

            </form>
            </div>)
        }

        export default SignUpPage;