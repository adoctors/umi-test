import React from 'react';

import Transfers from './Transfers/Transfers';

class Transfer extends React.Component {

  state = {
    leftList:[
      {
        name:'明确时间提醒',
        id:'L1',
        checked:false,
      },
      {
        name:'晚点提醒',
        id:'L2',
        checked:false,
      },
      {
        name:'拖延',
        id:'L3',
        checked:false,
      },
    ],
    leftSelect:[],
    rightList:[
      {
        name:'价格异议',
        id:'R1',
        checked:false,
      },
      {
        name:'讽刺',
        id:'R2',
        checked:false,
      },
      {
        name:'辱骂',
        id:'R3',
        checked:false,
      },
      {
        name:'站外推广',
        id:'R4',
        checked:false,
      },
      {
        name:'小程序',
        id:'R5',
        checked:false,
      },
      {
        name:'VIP',
        id:'R6',
        checked:false,
      },
      {
        name:'已邀约',
        id:'R7',
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
