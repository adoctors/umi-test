import React from 'react';
import TSFC from './components/TSFC';

const list:any[] = [
  {
    name:'yellow',
    value:'#ffd033',
    // placement:'abc'
  },
  {
    name:'green',
    value:'#2fe1a8',
  },
  {
    name:'blue',
    value:'#6471fd',
  },
  {
    name:'origin',
    value:'rgba(239,166,29,0.94)',
  }
]

const data = {
  success: true,
  message: 'ok',
  data:{
    id:'xxx',
    list:[
      {
        id: 1,
        name: 'tom',
        score: 100,
      }
    ]
  }
}



export default (): React.ReactNode => (
  <div style={{ textAlign: 'center' }}>
    <TSFC list={list} name='abc' data={data} />
  </div>
);