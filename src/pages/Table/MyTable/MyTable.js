import React, { Component } from 'react';
import classNames from 'classnames';

import styles from './MyTable.less';

class MyTable extends Component {

    constructor(props){
      super(props);
      this.tableWrapDOM=React.createRef();
    }

    state = {
      columns : [],
      tableWidth:'100%',
    }

    static getDerivedStateFromProps(props, state) {
      return state.columns.length<1?{
        columns:props.columns
      }:null;
    }

    componentDidMount(){
      this.setLastColWidth();
    }

    setLastColWidth = () => {
      const {columns}=this.state;
      const tableWidth=this.tableWrapDOM.current.clientWidth;
      // console.log(this.tableWrapDOM.current.clientWidth)
      let totalWidth=0;
      for(let i=0;i<columns.length;i++){
        totalWidth+=columns[i].width;
      }
      // 当所有列总和小于table的宽度时，将最后一列的宽度变大
      if(totalWidth<tableWidth){
        let lastColWidth=tableWidth;
        for(let i=0;i<columns.length-1;i++){
          lastColWidth-=columns[i].width;
        }
        columns[columns.length-1].width=lastColWidth-2;
        this.setState({columns});
      }
    }

    columnMouseDown = (e,index,refName) => {
      document.onmousemove = moveEvt => {
        // 鼠标左侧的距离
        let offsetLeft = moveEvt.clientX;
        // 元素距离屏幕左侧的距离
        const DOMOffsetLeft=this.refs[refName].offsetLeft;
        // 当前单元格的宽度
        const width=offsetLeft-DOMOffsetLeft;
        let {columns}=this.state;
        columns[index].width=width;
        let totalWidth=0;
        for(let i=0;i<columns.length;i++){
          totalWidth+=columns[i].width;
        }
        // tableWidth
        this.setState({columns,tableWidth:totalWidth});
        this.setLastColWidth();
      }
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      }
    }


    render() {

      const {columns,tableWidth}=this.state;
      const {dataSource}=this.props;
      return (
        <div className={styles.rcrTableWrap} ref={this.tableWrapDOM}>
          {/* 表头 */}
          <div className={styles.rcrTableTitWrap} style={{width:tableWidth}}>
            {
              columns.map((item,index)=>
                <div 
                  key={item.key} 
                  className={classNames(styles.rcrTableTit,{[styles.rcrBorderRight]:index!==dataSource.length-1})} 
                  style={{width:item.width||150}}
                  ref={item.dataIndex}
                >{item.title}
                  {/* 用于拖拽的部分 */}
                  <div
                    className={styles.rcrMoveBtn} 
                    onMouseDown={(e)=>this.columnMouseDown(e,index,item.dataIndex)}
                  />
                </div>)
            }
          </div>
          {/* 数据 */}
          <div className={styles.rcrTableBodyWrap} style={{width:tableWidth}}>
            {
              dataSource&&dataSource.map((item,index)=>(
                <div 
                  className={classNames(styles.rcrTableRow,{[styles.rcrBorderBottom]:index!==dataSource.length-1})}
                  key={item.key}
                >
                  {columns.map((column,i)=>
                    <div 
                      key={column.dataIndex} 
                      style={{width:column.width||150}}
                      className={classNames(styles.rcrEllipsis,{[styles.rcrBorderRight]:i!==columns.length-1})} 
                    >
                      {column.render&&column.render(item[column.dataIndex],item)||item[column.dataIndex]}
                    </div>)}
                </div>
              ))
            }
          </div>
        </div>

      );
    }
}

export default MyTable;  


