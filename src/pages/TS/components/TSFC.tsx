import React from 'react';

interface IProps {
  list: IList[];
  name: string;
  txt?: string;
  data?: IDataWrap;
}

interface IName {
  name: string;
}

interface IList {
  name: string;
  value: string;
  placement?: 'top' | 'left' | 'right' | 'bottom';
}



interface IDataWrap {
  data: IData;
  success: boolean;
  message: string;
}

interface IData {
  id: string;
  // list: IDataList[]
  list: Array<IDataList>
}

interface IDataList extends IName {
  id: number;
  score: number;
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