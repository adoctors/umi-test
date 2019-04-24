import React from 'react';
import { Button  } from 'antd';

import Transfers from './Transfers/Transfers';

class Transfer extends React.Component {

  state = {
    leftList:[
      {
        name:'leftName1',
        id:'L1',
        checked:false,
      },
      {
        name:'leftName2',
        id:'L2',
        checked:false,
      },
      {
        name:'leftName3',
        id:'L3',
        checked:false,
      },
    ],
    leftSelect:[],
    rightList:[
      {
        name:'rightName1',
        id:'R1',
        checked:false,
      },
      {
        name:'rightName2',
        id:'R2',
        checked:false,
      },
      {
        name:'rightName3',
        id:'R3',
        checked:false,
      },
      {
        name:'rightName4',
        id:'R4',
        checked:false,
      },
    ],
    rightSelect:[],
  }

  getListVal = (val) => {
    console.log(val);
  }

  render() {
    const {leftList,
      leftSelect,
      rightList,
      rightSelect,}=this.state;
    return (
      <div>
        <p>自定义可拖动排序穿梭框演示界面</p>
        <Transfers
          leftList={leftList}
          leftSelect={leftSelect}
          rightList={rightList}
          rightSelect={rightSelect}
          onChange={this.getListVal}
        />
      </div>
    );
  }
}

export default Transfer;
