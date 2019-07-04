import React from 'react';
import TSFC from './components/TSFC';
import T1 from './components/T1';
import Simple from './My/Simple';
import Common from './My/Common';
import TInterface from './components/TInterface';
import MyTableTSIndex from './MyTableTSIndex';

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
    <T1 />
    <Simple />
    <Common />
    <TInterface />
    <MyTableTSIndex />
  </div>
);