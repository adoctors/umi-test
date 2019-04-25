import React, { Component } from 'react';
import classNames from 'classnames';
// import { Icon } from 'antd';

import styles from './MyTable.less';
/**
 *
 *
 * @class MyTable
 * @extends {Component}
 * dataSource       列表数据源
 * columns          表头
 * ellipsis         单元格是否溢出隐藏,默认false
 */
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
      // 记录鼠标点下时的宽度的鼠标位置
      let x=e.clientX;
      const currentDomWidth=this.refs[refName].scrollWidth;
      document.onmousemove = moveEvt => {
        // 鼠标左侧的距离
        const offsetLeft = moveEvt.clientX;
        // 宽度加上鼠标变化的偏移量
        const width=currentDomWidth+(offsetLeft-x);
        let {columns}=this.state;
        columns[index].width=width;
        let totalWidth=0;
        for(let i=0;i<columns.length;i++){
          totalWidth+=columns[i].width;
        }
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
      const {dataSource,ellipsis,headerBlock}=this.props;
      return (
        <div className={styles.rcrTableWrap} ref={this.tableWrapDOM}>
          {/* 表头 */}
          <div className={styles.rcrTableTitWrap} style={{width:tableWidth}}>
            {headerBlock&&headerBlock}
            {
              columns&&columns.map((item,index)=>
                <div 
                  key={item.key} 
                  className={classNames(styles.rcrCol,styles.rcrTableTit,{[styles.rcrBorderRight]:index!==columns.length-1})} 
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
              dataSource&&dataSource.length?dataSource.map((item,index)=>(
                <div 
                  className={classNames(styles.rcrTableRow,{[styles.rcrBorderBottom]:index!==dataSource.length-1})}
                  key={item.key}
                >
                  {columns.map((column,i)=>
                    <div 
                      key={column.dataIndex} 
                      style={{width:column.width||150}}
                      className={classNames(styles.rcrCol,{[styles.rcrBorderRight]:i!==columns.length-1,[styles.rcrEllipsis]:ellipsis})} 
                    >
                      {column.render&&column.render(item[column.dataIndex],item)||item[column.dataIndex]}
                    </div>)}
                </div>
              )):(
                <div className="ant-empty ant-empty-normal">
                  <div className="ant-empty-image">
                    <img alt="暂无数据" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K" />
                  </div>
                  <p className="ant-empty-description">暂无数据</p>
                </div>
              )
            }


            
          </div>
        </div>

      );
    }
}

export default MyTable;  


