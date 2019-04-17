import React from 'react';
import { Checkbox , } from 'antd';

import styles from './Transfer.less';

const CheckboxGroup = Checkbox.Group;
const leftOptions = ['Apple', 'Pear', 'Orange'];


class Transfer extends React.Component {
  state = {
    leftList:[
      {
        name:'leftName1',
        id:'L1',
      },
      {
        name:'leftName2',
        id:'L2',
      },
      {
        name:'leftName3',
        id:'L3',
      },
    ],
    rightList:[
      {
        name:'rightName1',
        id:'R1',
      },
      {
        name:'rightName2',
        id:'R2',
      },
      {
        name:'rightName3',
        id:'R3',
      },
      {
        name:'rightName4',
        id:'R4',
      },
    ],
    leftCheckedList: [],
    leftIndeterminate: true,
    leftCheckAll: false,
  }

  onChange = (checkedList,prefix) => {
    console.log(checkedList,prefix)
    this.setState({
      [`${prefix}CheckedList`]:checkedList,
      [`${prefix}Indeterminate`]:!!checkedList.length && (checkedList.length < leftOptions.length),
      [`${prefix}CheckAll`]:checkedList.length === leftOptions.length,
    });
  }

  onCheckAllChange = (e,prefix) => {
    this.setState({
      [`${prefix}CheckedList`]:e.target.checked ? leftOptions : [],
      [`${prefix}Indeterminate`]: false,
      [`${prefix}CheckAll`]:e.target.checked,
    });
  }




  render() {
    const { leftList, rightList, } = this.state;
    const {
      leftCheckedList,
      leftIndeterminate,
      leftCheckAll,
    }= this.state;
    return (
      <div className={styles.wrap}>
        {/* <div className={styles.conWrap}>
          {
            leftList.map(item=><div key={item.id}>{item.name}</div>)
          }
        </div>
        <div className={styles.conWrap}>
          {
            rightList.map(item=><div key={item.id}>{item.name}</div>)
          }
        </div> */}


        <div>
          <div style={{ borderBottom: '1px solid #E9E9E9' }}>
            <Checkbox
              indeterminate={leftIndeterminate}
              onChange={e=>this.onCheckAllChange(e,'left')}
              checked={leftCheckAll}
            >
              {
                `${leftCheckedList.length} / ${leftOptions.length}`
              }
            </Checkbox>
          </div>
          <br />
          <CheckboxGroup options={leftOptions} value={leftCheckedList} onChange={checkedList=>this.onChange(checkedList,'left')} />
        </div>
      </div>
    );
  }
}

export default Transfer;
