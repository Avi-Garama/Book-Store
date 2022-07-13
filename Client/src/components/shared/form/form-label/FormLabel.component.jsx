import React from "react";
import './form-label.styles.css';

const FormLabel = (props) => {
return (
    <label htmlFor = {props.htmlFor}> {props.text? props.text : props.children} </label>
)
}

export default FormLabel;