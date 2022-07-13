import React from "react";
import { Link } from "react-router-dom";
import './form-input.styles.css';

const FormInput = (props) => {

return (
    <div>
    <input className={ props.className } text={props.text} onInput = {props.onInput} type = {props.type} placeholder = {props.placeholder} id = {props.id} required={props.required}/>
    </div>
)
}

export default FormInput;