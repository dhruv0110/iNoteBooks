import React from 'react'

const Alert = (props) => {
    const capitalize = (word) =>{
      if (word === 'danger'){
        word = "error";
      }
        var lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    
  return (
  <div style={{height : '50px'}}>
    {props.alert&&<div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role='alert'>
   {capitalize(props.alert.type)} : {props.alert.message}
   </div>}
  </div>
  )
}

export default Alert
