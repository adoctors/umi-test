
import React from 'react';


export default (props)=>{
  const {name,title}=props;
  return (
    <div>
      <p>{name}</p>
      <p>{title}</p>
    </div>
  )
}