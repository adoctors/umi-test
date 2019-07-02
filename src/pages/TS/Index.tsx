import React from 'react';
import TSFC from './components/TSFC';

const list= [
  {
    name:'yellow',
    value:'#ffd033',
  },
  {
    name:'green',
    value:'#2fe1a8',
  },
  {
    name:'blue',
    value:'#6471fd',
  },
]


export default (): React.ReactNode => (
  <div style={{ textAlign: 'center' }}>
    123
    <TSFC list={list} name='abc' />
  </div>
);