import React, { Component } from 'react';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import { Empty, Pagination, Spin  } from 'antd';

import styles from './MyTable.less';
/**
 *
 *
 * @class MyTable
 * @extends {Component}
 * dataSource       列表数据源
 * columns          表头
 * ellipsis         单元格是否溢出隐藏,默认false
 * onRow            点击行的操作
 * headerBlock      可插入头部信息
 * pagination       分页相关
 * paginationPlacement  分页所处方向,可选值：left、right、center。默认left
 * loading
 * showTitle        是否显示每个单元格的title(只适用于数据自己渲染的，自定义结构自行处理)，默认false
 *
 */
class MyTable extends Component {

    constructor(props){
      super(props);
      this.tableWrapDOM=React.createRef();
    }

    state = {
      columns : [],
      dataSource:[],
      tableWidth:'100%',
    }

    static getDerivedStateFromProps(props, state) {

      let data={};
      if(!isEqual(props.columns, state.columns)){
        data.columns=props.columns;
      }

      if(!isEqual(props.dataSource, state.dataSource)){
        if(props.pagination.pageSize){
          const pageDataSource = (currentPage,size) => {
            const propsDataSource=props.dataSource;
            const start=(currentPage-1)*size;
            const end=start+size;
            return propsDataSource.slice(start,end);
          }
          data.dataSource=pageDataSource(1,props.pagination.pageSize)
     
        }else{
          data.dataSource=props.dataSource;
        }
        
      }
      return data;
    }

    componentDidMount(){
      const {columns}=this.state;
      if(columns&&columns.length){
        this.setLastColWidth();
      }
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

    rowClick = (item) => {
      const {onRow}=this.props;
      if(item) onRow(item);
    }

    pageChange = (page,pageSize) => {
      const {onChange,pagination:{total},dataSource}=this.props;
      if(onChange) onChange(page,pageSize);

      if(dataSource.length>pageSize){
        const pageDataSource = (currentPage,size) => {
          const start=(currentPage-1)*size;
          const end=start+size;
          return dataSource.slice(start,end);
        }
        this.setState({
          dataSource:pageDataSource(page,pageSize)
        })
      }else{
        this.setState({
          dataSource,
        })
      }


    }

    render() {
      const {columns,tableWidth,dataSource}=this.state;
      const {ellipsis,headerBlock,pagination,paginationPlacement,loading,showTitle}=this.props;
      const placement=styles[paginationPlacement]||'';
      const showPagination=(()=>{
        if(pagination===undefined) return false;
        const {total,pageSize}=pagination;
        return total>pageSize;
      })();
      const shotTit=showTitle===undefined?false:showTitle;
      return (
        <div className={styles.rcrTableWrapRelative}>
          <Spin size="large" spinning={loading===undefined?false:loading}>
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
                      onClick={()=>this.rowClick(item)}
                    >
                      {columns.map((column,i)=>
                        <div 
                          key={column.dataIndex} 
                          style={{width:column.width||150}}
                          className={classNames(styles.rcrCol,{[styles.rcrBorderRight]:i!==columns.length-1,[styles.rcrEllipsis]:ellipsis})} 
                        >
                          {column.render&&column.render(item[column.dataIndex],item)||
                          (shotTit?<span title={item[column.dataIndex]}>{item[column.dataIndex]}</span>:item[column.dataIndex])
                          }
                          
                        </div>)}
                    </div>
                  )):(
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )
                }
              </div>
            </div>
            
            {pagination&&dataSource&&dataSource.length&&showPagination?(
              <div className={classNames(styles.paginationWrap,placement)}>
                <Pagination onChange={this.pageChange} {...pagination} />
              </div>):''
            }
          </Spin>
        </div>
      );
    }
}

export default MyTable;  


