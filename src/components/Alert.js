import React from 'react'

export default function Alert(props) {
  const capital = (text)=>{
    const word = text.toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    props.customAlert && <div>
        <div className={`alert alert-${props.customAlert.type} alert-dismissible fade show`} role="alert">
        <strong>{capital(props.customAlert.type)}</strong> :  {props.customAlert.message}
        </div>
    </div>
  )
}
