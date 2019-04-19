import React from 'react';
import { Checkbox,Button,Icon  } from 'antd';

import styles from './TransferDnd.less';



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

  checkboxOnchange = (e,index,checkedName,prefix) => {
    console.log(e.target.checked,checkedName)
    const listName=`${prefix}List`;         // 展示列表名
    const selectName=`${prefix}Select`;     // 选中列表名
    const list=this.state[listName];
    let selectList=this.state[selectName];
    // const {}=this.state;
    list[index].checked=e.target.checked;
    this.setState({[listName]:list});
  }

  checkAll = (e,name) => {
    const list=this.state[name].map(item=>({
      ...item,
      checked:e.target.checked,
    }));
    this.setState({[name]:list});
  }


  render() {
    const { leftList, rightList, } = this.state;
    return (
      <div className={styles.wrap}>
        <div className={styles.conWrap}>
          <div style={{borderBottom:'1px solid #e1e1e1'}}>
            <Checkbox 
              onChange={(e)=>this.checkAll(e,'leftList')}
            >全选
            </Checkbox>
            <span>{leftList.length}</span>
          </div>
          {
            leftList.map((item,index)=>
              <div key={item.id}>
                <Checkbox 
                  onChange={e=>this.checkboxOnchange(e,index,item.name,'left')}
                  checked={item.checked}
                >{item.name}
                </Checkbox>
              </div>)
          }
        </div>
        <div className={styles.transferBtnCon}>
          <Button size="small" style={{marginBottom:15}}>
            显示<Icon type="right" />
          </Button>
          <Button size="small">
            <Icon type="left" />隐藏
          </Button>
        </div>
        <div className={styles.conWrap}>
          <div style={{borderBottom:'1px solid #e1e1e1'}}>
            <Checkbox 
              onChange={(e)=>this.checkAll(e,'rightList')}
            >全选
            </Checkbox>
            <span>{leftList.length}</span>
          </div>
          {
            rightList.map((item,index)=>
              <div key={item.id}>
                <Checkbox 
                  onChange={e=>this.checkboxOnchange(e,index,item.name,'right')}
                  checked={item.checked}
                >{item.name}
                </Checkbox>
              </div>)
          }
        </div>

      </div>
    );
  }
}

export default Transfer;
