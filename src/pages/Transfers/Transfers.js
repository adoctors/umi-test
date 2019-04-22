import React from 'react';
import { Checkbox,Button,Icon  } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper';
import DragableBody from './BodyRows';

import styles from './Transfers.less';

const  deepCopy= (obj)=>JSON.parse(JSON.stringify(obj));
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
    leftAllChecked:false,
    rightAllChecked:false,
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
    const allCheckedName=`${prefix}AllChecked`;   // 全选按钮名
    const list=this.state[listName];
    let selectList=deepCopy(this.state[selectName]);
    // 选中的节点
    if(e.target.checked){
      selectList.push(list[index]);
    }else{
      // 取消选择
      for(let i=0;i<selectList.length;i++){
        if(selectList[i].name===checkedName){
          selectList.splice(i,1);
        }
      }
    }

    // 当选择的数量等于全部数量时全选为选中状态,否则无全选状态
    if(selectList.length===list.length){
      this.setState({[allCheckedName]:true});
    }else{
      this.setState({[allCheckedName]:false});
    }

    // 改变点击项的选中状态
    list[index].checked=e.target.checked;
    this.setState({[listName]:list,[selectName]:selectList});
  }

  checkAll = (e,prefix) => {
    const allCheckedName=`${prefix}AllChecked`; 
    const listName=`${prefix}List`; 
    const selectListName=`${prefix}Select`;
    const list=this.state[listName].map(item=>({
      ...item,
      checked:e.target.checked,
    }));
    this.setState({[listName]:list,[selectListName]:list,[allCheckedName]:e.target.checked});
  }


  toChange = (from) => {
      // 如: from==='left->toRight
      const to=from==='left'?'right':'left';
      const fromListName=`${from}List`;
      const toListName=`${to}List`;
      const selectListName=`${from}Select`;
      // 相关数据源
      const fromLlist=deepCopy(this.state[fromListName]);         // 需要变少的一项
      const toList=this.state[toListName];         // 会增加的一项
      const selectList=this.state[selectListName];     // 需要变少列表里选中的项

      const toListVal=[...selectList,...toList].map(item=>({
        ...item,
        checked:false,
      }));

      for(let i=0;i<fromLlist.length;i++){
        for(let j=0;j<selectList.length;j++){
          if(fromLlist[i].name===selectList[j].name){
            fromLlist.splice(i,1);
          }
        }
      }
      this.setState({
        [fromListName]:fromLlist,
        [toListName]:toListVal,
        leftAllChecked:false,
        rightAllChecked:false,
        leftSelect:[],
        rightSelect:[],
      });

  }


  moveFN =(dragIndex, hoverIndex)=> {
    const { rightList } = this.state;
    const dragRow = rightList[dragIndex];
    this.setState(
      update(this.state, {
        rightList: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
        },
      }),
    );
  }


  render() {
    const { leftList, rightList,
      leftAllChecked, rightAllChecked} = this.state;

    const RightList=(
      // <DragDropContextProvider backend={HTML5Backend}>
      <div className="App">
        {rightList.map((item, index) => 
          <DragableBody
            id={item.id}
            index={index}
            moveFN={this.moveFN}
            key={item.id} 
            item={item}
            // onChange={e=>this.checkboxOnchange(e,index,item.name,'right')}
            checkboxOnchange={this.checkboxOnchange}
          />
        )}
      </div>
      // </DragDropContextProvider>
    );  
    return (
      <div className={styles.wrap}>
        <div className={styles.conWrap}>
          <div style={{borderBottom:'1px solid #e1e1e1'}}>
            <Checkbox 
              checked={leftAllChecked}
              onChange={(e)=>this.checkAll(e,'left')}
            >隐藏字段
            </Checkbox>
            {/* <span>{`${leftSelect.length} / ${leftList.length}`}</span> */}
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
          <Button size="small" style={{marginBottom:15}} onClick={()=>this.toChange('left')}>
            显示<Icon type="right" />
          </Button>
          <Button size="small" onClick={()=>this.toChange('right')}>
            <Icon type="left" />隐藏
          </Button>
        </div>
        <div className={styles.conWrap}>
          <div style={{borderBottom:'1px solid #e1e1e1'}}>
            <Checkbox 
              checked={rightAllChecked}
              onChange={(e)=>this.checkAll(e,'right')}
            >显示字段
            </Checkbox>
            {/* <span>{`${rightSelect.length} / ${rightList.length}`}</span> */}
          </div>
          {RightList}
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Transfer);
