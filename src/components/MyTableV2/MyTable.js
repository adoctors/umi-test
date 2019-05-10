import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import { Empty, Pagination, Spin, Checkbox, Icon } from 'antd';

import styles from './MyTable.less';

const ObjectNonEmpty = obj => Object.keys(obj).length>0;

const sortDirections = ['','descend', 'ascend'];

/**
 *
 *
 * @class MyTable
 * @extends {Component}
 * @param { array } dataSource  列表数据源  必填
 * @param { array } columns 表头  必填
 * @param { boolean } columnsWidth  是否可以拖动改变列宽,默认false
 * @param { boolean } ellipsis  单元格是否溢出隐藏,默认false
 * @param { function } onRow  点击行的操作
 * @param { Node } headerBlock  可插入头部信息
 * @param { object } pagination 分页相关  必填
 * @param { string } paginationPlacement  分页所处方向,可选值：left、right、center。默认left
 * @param { boolean } loading 默认false
 * @param { boolean } showTitle 是否显示每个单元格的title(只适用于数据自己渲染的，自定义结构自行处理)，默认false
 * @param { boolean } fixedHeight 内容行是否固定高度,默认false
 * @param { object } rowSelection:{   表格行的选择与操作Checkbox
 *                   returnKeyName,     // 已选项返回那个key对应的值
 *                   selectedRowKeys,   // 已选项的集合
 *                   onChange: this.onSelectChange,     // 选择时的变化函数
 * }
 * @param {function} getSorter        获取当前列的排序及列名
 */


class MyTable extends Component {

    static propTypes = {
      dataSource: PropTypes.array,
      columns: PropTypes.array,
      columnsWidth: PropTypes.bool,
      ellipsis: PropTypes.bool,
      onRow: PropTypes.func,
      headerBlock: PropTypes.element,
      pagination: PropTypes.object,
      paginationPlacement: PropTypes.string,
      loading: PropTypes.bool,
      showTitle: PropTypes.bool,
      fixedHeight: PropTypes.bool,
      rowSelection: PropTypes.object,
      getSorter: PropTypes.func,
    }

    static defaultProps = {
      dataSource: [],
      columns: [],
      columnsWidth: false,
      ellipsis: false,
      onRow: () => {},
      headerBlock: '',
      pagination: {},
      paginationPlacement: 'left',
      loading: false,
      showTitle: false,
      fixedHeight: false,
      rowSelection: {},
      getSorter: () => {},
    }

    constructor(props){
      super(props);
      this.tableWrapDOM=React.createRef();
    }

    state = {
      columns : [],
      dataSource:[],
      tableWidth:'100%',
      titTop:0,
      checkedAll:false,
    }

    componentDidMount(){
      const {columns}=this.state;
      if(columns&&columns.length){
        let totalWidth=0;
        for(let i=0;i<columns.length;i++){
          totalWidth+=columns[i].width;
        }
        const tableWidth=this.tableWrapDOM.current.clientWidth;
        if(totalWidth>=tableWidth){
          this.setState({
            tableWidth:totalWidth
          });
        }else{
          this.setLastColWidth();
        }
      }
      // 拖动竖向滚动条改变表头的位置
      this.tableWrapDOM.current.addEventListener('scroll',this.tableWrapDOMScroll);
    }

    componentWillUnmount(){
      this.tableWrapDOM.current.removeEventListener('scroll', this.tableWrapDOMScroll);
    }

    static getDerivedStateFromProps(props, state) {
      let data={};

      if(!isEqual(props.columns, state.columns)){
        data.columns=props.columns;
      }

      if(!isEqual(props.dataSource, state.dataSource)){
        const {returnKeyName,selectedRowKeys}=props.rowSelection;
        // 表格行的选择与操作Checkbox，初始化添加对应checked
        const initChecked = (list) => list.length ? list.map(item=>{
          item.checked=false;
          // 处理初始化时已选的项
          if(selectedRowKeys&&selectedRowKeys.length){
            for(let i=0;i<selectedRowKeys.length;i++){
              if(selectedRowKeys[i]===item[returnKeyName]) item.checked=true;
            }
          }
          return item;
        }):[];

        if(props.dataSource.length>props.pagination.pageSize){
          const pageDataSource = (currentPage,size) => {
            const propsDataSource=props.dataSource;
            const start=(currentPage-1)*size;
            const end=start+size;
            return propsDataSource.slice(start,end);
          }
          // 如果有表格行的选择与操作Checkbox
          data.dataSource=ObjectNonEmpty(props.rowSelection)?initChecked(pageDataSource(1,props.pagination.pageSize)):pageDataSource(1,props.pagination.pageSize);
        }else{
          data.dataSource=ObjectNonEmpty(props.rowSelection)?initChecked(props.dataSource):props.dataSource;
        }
      }
      return data;
    }

    tableWrapDOMScroll = (e) => {
      this.setState({titTop:e.target.scrollTop});
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
        this.setState({columns,tableWidth:tableWidth-2});
      }
    }

    columnMouseDown = (e,index,refName) => {
      // 记录鼠标点下时的宽度的鼠标位置
      const x=e.clientX;
      const currentDomWidth=this.refs[refName].scrollWidth;
      let width=0;
      document.onmousemove = moveEvt => {
        // 鼠标左侧的距离
        const offsetLeft = moveEvt.clientX;
        // 宽度加上鼠标变化的偏移量
        width=currentDomWidth+(offsetLeft-x);
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
        const {setHistoryWidth}=this.props;
        setHistoryWidth(refName,width)
        document.onmousemove = null;
        document.onmouseup = null;
      }
    }

    rowClick = (e,item) => {
      e.stopPropagation();
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

    checkedAll = (e) => {
      const {rowSelection:{returnKeyName,onChange}}=this.props;
      const flag=e.target.checked;
      const dataSource=this.state.dataSource.map(item=>{
        item.checked=flag;
        return item;
      })
      // 表格行的选择与操作Checkbox，设置返回的格式
      const selectedRowKeys=flag?dataSource.map(item=>item[returnKeyName]):[];
      onChange(selectedRowKeys);
      this.setState({dataSource,checkedAll:flag});
    }

    checkedRow = (e,item,index) => {
      e.stopPropagation();
      const {dataSource}=this.state;
      const {rowSelection:{returnKeyName,onChange}}=this.props;
      dataSource[index].checked=!item.checked;
      // 判断是否已经全选
      const isCheckedAll = () => {
        let n=0;
        for(let i=0;i<dataSource.length;i++){
          if(dataSource[i].checked) n+=1;
        }
        return n===dataSource.length;
      }

      // 表格行的选择与操作Checkbox，设置返回的格式
      const returnKeyNameFN = () =>{
        const keys=[];
        for(let i=0;i<dataSource.length;i++){
          if(dataSource[i].checked) keys.push(dataSource[i][returnKeyName]);
        }
        return keys;
      }
      // 发送已选的数据
      onChange(returnKeyNameFN());

      this.setState({
        dataSource,
        checkedAll:isCheckedAll(),
      })
    }

    sortToggle = (dataIndex) => {
      const {columns}=this.state;
      const {getSorter}=this.props;
      const sorter = columns.filter((item=>item.dataIndex===dataIndex))[0].sort;
      let i=sortDirections.indexOf(sorter);
      if(i===sortDirections.length-1) i=-1;
      for(let n=0;n<columns.length;n++){
        if(columns[n].sort!==undefined) columns[n].sort='';
        if(columns[n].dataIndex===dataIndex) columns[n].sort=sortDirections[i+1];
      }
      this.setState({ columns });
      // 发送当前的类名及排序方式
      getSorter(dataIndex,sortDirections[i+1])
    }

    render() {
      const {columns,tableWidth,dataSource,titTop,checkedAll}=this.state;
      const {ellipsis,
        columnsWidth,
        headerBlock,
        pagination,
        paginationPlacement,
        loading,
        showTitle,
        fixedHeight,
        rowSelection,
        }=this.props;
      // console.log(rowSelection)
      const placement=styles[paginationPlacement]||'';
      const showPagination=(()=>{
        if(pagination===undefined) return false;
        const {total,pageSize}=pagination;
        return total>pageSize;
      })();

      const showPaginationFlag=pagination&&dataSource&&dataSource.length&&showPagination;

      const SortIcon = (currentSort,dataIndex) =>(
        <div style={{display:'inline-block',marginLeft:2}}>
          <div className={styles.sortIconWrap} onClick={()=>this.sortToggle(dataIndex)}>
            <Icon type="caret-up" style={{color:currentSort==='ascend'?'#1890FF':'#bfbfbf'}} />
            <Icon type="caret-down" style={{color:currentSort==='descend'?'#1890FF':'#bfbfbf',marginTop:-2}} />
          </div>
        </div>
      );

      return (
        <div className={styles.rcrTableBgWrap}>
          <Spin size="large" spinning={loading===undefined?false:loading}>
      
            <div className={styles.rcrTableWrapWrap}>
              <div 
                className={styles.rcrTableWrap} 
                ref={this.tableWrapDOM}
                style={{bottom:showPaginationFlag?48:0}}
              >
                {/* 表头 */}
                <div className={styles.rcrTableTitWrap} style={{width:tableWidth,top:titTop}}>
                  {/* 插入头部 */}
                  {headerBlock&&headerBlock}
                  {/* 选择与操作 */}
                  {
                    ObjectNonEmpty(rowSelection)&&(
                      <div className={classNames(styles.rcrCol,styles.rcrTableTit)}>
                        <Checkbox onChange={this.checkedAll} checked={checkedAll} />
                      </div>
                    )
                  }
                  
                  {
                    columns&&columns.map((item,index)=>
                      <div 
                        key={item.dataIndex} 
                        className={classNames(styles.rcrCol,styles.rcrTableTit,{[styles.rcrBorderRight]:index!==columns.length-1})} 
                        style={{width:item.width||150}}
                        ref={item.dataIndex}
                      >
                        {item.title}
                        {item.sort!==undefined&&SortIcon(item.sort,item.dataIndex)}
                        {/* 用于拖拽的部分 */}
                        {
                          columnsWidth&&(
                            <div
                              className={styles.rcrMoveBtn} 
                              onMouseDown={(e)=>this.columnMouseDown(e,index,item.dataIndex)}
                            />
                          )
                        }
                        
                      </div>)
                  }
                </div>
                {/* 数据 */}
                <div className={styles.rcrTableBodyWrap} style={{width:tableWidth}}>
                  {
                    dataSource&&dataSource.length?dataSource.map((item,index)=>(
                      <div 
                        className={classNames(styles.rcrTableRow,{[styles.rcrBorderBottom]:index!==dataSource.length-1})}
                        key={item.dataIndex}
                        onClick={e=>this.rowClick(e,item)}
                      >
                        {
                          ObjectNonEmpty(rowSelection)&&(
                            <div className={classNames(fixedHeight?styles.rcrColHeight:styles.rcrCol,)}>
                              <Checkbox onClick={e=>this.checkedRow(e,item,index)} checked={item.checked} />
                            </div>
                          )
                        }
                        
                        {columns.map((column,i)=>
                          <div 
                            key={column.dataIndex} 
                            style={{width:column.width||120}}
                            className={classNames(fixedHeight?styles.rcrColHeight:styles.rcrCol,{[styles.rcrEllipsis]:ellipsis})} 
                          >
                            {column.render&&column.render(item[column.dataIndex],item)||
                            (showTitle?<span title={item[column.dataIndex]}>{item[column.dataIndex]}</span>:item[column.dataIndex])
                            }
                            
                          </div>)}
                      </div>
                    )):(
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{paddingTop:40}} />
                    )
                  }
                </div>
              </div>
            </div>

            {showPaginationFlag?(
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


