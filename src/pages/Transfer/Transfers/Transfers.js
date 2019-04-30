import React from 'react';
import isEqual from 'lodash/isEqual';
import { Checkbox,Button,Icon  } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper';
import DragableBody from './BodyRows';

import styles from './Transfers.less';

const  deepCopy= (obj)=>JSON.parse(JSON.stringify(obj));
const deWeight=(arr1Name, arr2Name,name)=>{
  const arr1=arr1Name.map(item=>item[name]);
  const arr2=arr2Name.map(item=>item[name]);
  const diff=arr1.concat(arr2).filter((v, i, arr)=> arr.indexOf(v) === arr.lastIndexOf(v));
  const list= arr1.length>=arr2.length?arr1Name:arr2Name;
  let arr=[];
  for(let i=0;i<list.length;i++){
    for(let j=0;j<diff.length;j++){
      if(list[i][name]===diff[j]){
        arr.push(list[i])
      }
    }
  }
  return arr;
}

/**
 *
 *
 * @class Transfer
 * leftList         穿梭框左侧数据        必传
 * leftSelect       穿梭框左侧选中选项        可选
 * rightList        穿梭框左侧数据        必传
 * rightSelect      穿梭框左侧选中选项        可选
 * onChange         获取最终结果          可选
 */
class Transfer extends React.Component {
  state = {
    leftList:[
      // {
      //   name:'leftName1',
      //   id:'L1',
      //   checked:false,
      // },
      // {
      //   name:'leftName2',
      //   id:'L2',
      //   checked:false,
      // },
      // {
      //   name:'leftName3',
      //   id:'L3',
      //   checked:false,
      // },
    ],
    leftSelect:[],
    leftAllChecked:false,
    rightAllChecked:false,
    rightList:[
      // {
      //   name:'rightName1',
      //   id:'R1',
      //   checked:false,
      // },
      // {
      //   name:'rightName2',
      //   id:'R2',
      //   checked:false,
      // },
      // {
      //   name:'rightName3',
      //   id:'R3',
      //   checked:false,
      // },
      // {
      //   name:'rightName4',
      //   id:'R4',
      //   checked:false,
      // },
    ],
    rightSelect:[],
  }

  componentDidMount(){
    // 获取组件外部的数据
    const {leftList,leftSelect,rightList,rightSelect,}=this.props;
    this.setState({leftList,leftSelect,rightList,rightSelect,});
  }

  componentWillReceiveProps(nextProps){
    const {leftList,leftSelect,rightList,rightSelect,}=this.state;
    if(!isEqual(nextProps.leftList,leftList)){
      this.setState({
        leftList:nextProps.leftList
      })
    }

    if(!isEqual(nextProps.leftSelect,leftSelect)){
      this.setState({
        leftSelect:nextProps.leftSelect
      })
    }

    if(!isEqual(nextProps.rightList,rightList)){
      this.setState({
        rightList:nextProps.rightList
      })
    }

    if(!isEqual(nextProps.rightSelect,rightSelect)){
      this.setState({
        rightSelect:nextProps.rightSelect
      })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const {onChange}=this.props;
    // 数据变化时将数据发向外部
    onChange(nextState);
  }

  checkboxOnchange = (e,index,checkedName,prefix) => {
    const checked=typeof e === 'boolean'?e:e.target.checked;
    const listName=`${prefix}List`;         // 展示列表名
    const selectName=`${prefix}Select`;     // 选中列表名
    const allCheckedName=`${prefix}AllChecked`;   // 全选按钮名
    const list=deepCopy(this.state[listName]);
    let selectList=deepCopy(this.state[selectName]);
    if(checked){
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
    list[index].checked=checked;
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
      const fromLlist=this.state[fromListName];         // 需要变少的一项
      const toList=this.state[toListName];         // 会增加的一项
      const selectList=this.state[selectListName];     // 需要变少列表里选中的项

      const toListVal=[...selectList,...toList].map(item=>({
        ...item,
        checked:false,
      }));

      const arr=deWeight(fromLlist,selectList,'name');
      this.setState({
        [fromListName]:arr,
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
      <div className={styles.listCon}>
        {rightList.map((item, index) => 
          <DragableBody
            id={item.id}
            index={index}
            moveFN={this.moveFN}
            key={item.id} 
            item={item}
            className={styles.listOption}
            checkboxOnchange={this.checkboxOnchange}
          />
        )}
      </div>
      // </DragDropContextProvider>
    );  
    return (
      <div className={styles.rcrTransferswrap}>
        <div className={styles.conWrap}>
          <div className={styles.listTitle}>
            <Checkbox 
              checked={leftAllChecked}
              onChange={(e)=>this.checkAll(e,'left')}
            >隐藏字段
            </Checkbox>
            {/* <span>{`${leftSelect.length} / ${leftList.length}`}</span> */}
          </div>
          <div className={styles.listCon}>
            {
              leftList.map((item,index)=>
                <div key={item.id} className={styles.listOption}>
                  <Checkbox 
                    onChange={e=>this.checkboxOnchange(e,index,item.name,'left')}
                    checked={item.checked}
                  >{item.name}
                  </Checkbox>
                </div>)
            }
          </div>
          
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
          <div className={styles.listTitle}>
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
