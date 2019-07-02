import React from 'react';

interface IProps {
  list: any[];
  name: string;
  txt?:string;
}

const TSFC: React.FC<IProps> = props =>{
  const {list, name} = props;
  return (
    <div>
      <span>sadfsa</span>
      {
        list.map(item=> <p style={{color:item.value}} key={item.name}>{item.name}</p>)
      }
      <p>{name}</p>
    </div>
  )
}

export default TSFC;