import React from "react";
import './form-button.styles.css';

const FormButton = (props) => {

return (
    <div>
    <button className={ props.className } onClick={props.onClick} onInput = {props.onInput} type = {props.type} id = {props.id} >{props.text}</button>
    </div>
)
}

export default FormButton;