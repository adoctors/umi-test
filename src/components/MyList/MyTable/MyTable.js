import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import { Empty, Pagination, Spin, Checkbox, Icon, Dropdown, Menu } from 'antd';
import SearchSelectModal from '../SearchSelectModal/SearchSelectModal';
import SetColumnsModal from '../SetColumnsModal/SetColumnsModal';

import styles from './MyTable.less';

const ObjectNonEmpty = obj => Object.keys(obj).length>0;

// 排序相关 默认 倒序 升序
const sortDirections = ['','descend', 'ascend'];

const defaultWidth = 150;   // 单元格默认宽度


// 当前实现：纯文本展示、下拉窗口模式（日期）
// 待完善：自定义字段（小齿轮设置）、单元格浮窗、单元格其他格式类型展示、
// 初始宽度有些问题


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
 * @param { object } pagination 分页相关  必填
 * @param { string } paginationPlacement  分页所处方向,可选值：left、right、center。默认left
 * @param { boolean } loading 默认false
 * @param { boolean } showTitle 是否显示每个单元格的title(只适用于数据自己渲染的，自定义结构自行处理)，默认false
 * @param { boolean } fixedHeight 内容行是否固定高度,默认false
 * @param { boolean } download  表格数据是否需要导出,默认false
 * @param { object } rowSelection:{   表格行的选择与操作Checkbox
 *                   returnKeyName,     // 已选项返回那个key对应的值
 *                   selectedRowKeys,   // 已选项的集合
 *                   onChange: this.onSelectChange,     // 选择时的变化函数
 * }
 * @param {function} getSorter        获取当前列的排序及列名
 * @param {string} rowKey           表格行 key 的取值属性名,标识唯一行
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
      rowKey: PropTypes.string,
    }

    static defaultProps = {
      dataSource: [],
      columns: [],
      columnsWidth: false,
      ellipsis: false,
      onRow: () => {},
      pagination: {},
      paginationPlacement: 'left',
      loading: false,
      showTitle: false,
      fixedHeight: false,
      rowSelection: {},
      getSorter: () => {},
      rowKey: '',
    }

    constructor(props){
      super(props);
      this.tableWrapDOM=React.createRef();
    }

    state = {
      columns : [],
      dataSource:[],
      tableWidth:'',
      titTop:0,
      checkedAll:false,
      currentRowKey:''
    }

    componentDidMount(){
      const {columns}=this.state;
      if(columns&&columns.length){
        let totalWidth=0;
        for(let i=0;i<columns.length;i++){
          totalWidth+=(columns[i].width||defaultWidth);
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
        console.log('change')
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

        data.dataSource=ObjectNonEmpty(props.rowSelection)?initChecked(props.dataSource):props.dataSource;
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
        totalWidth+=(columns[i].width||defaultWidth);
      }
      // 当所有列总和小于table的宽度时，将最后一列的宽度变大
      if(totalWidth<tableWidth){
        let lastColWidth=tableWidth;
        for(let i=0;i<columns.length-1;i++){
          lastColWidth-=(columns[i].width||defaultWidth);
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
          totalWidth+=(columns[i].width||defaultWidth);
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
      const {rowKey}=this.props;
      if(rowKey) this.setState({currentRowKey:item[rowKey]});
      const {onRow}=this.props;
      if(item) onRow(item);
    }

    pageChange = (page,pageSize) => {
      const {onChange,pagination:{total},dataSource}=this.props;
      if(onChange) onChange(page,pageSize);

      // if(dataSource.length>pageSize){
      //   const pageDataSource = (currentPage,size) => {
      //     const start=(currentPage-1)*size;
      //     const end=start+size;
      //     return dataSource.slice(start,end);
      //   }
      //   this.setState({
      //     dataSource:pageDataSource(page,pageSize)
      //   })
      // }else{
      //   this.setState({
      //     dataSource,
      //   })
      // }
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

    sortToggle = (key) => {
      const {columns}=this.state;
      const {getSorter}=this.props;
      const sorter = columns.filter((item=>item.key===key))[0].sort;
      let i=sortDirections.indexOf(sorter);
      if(i===sortDirections.length-1) i=-1;
      for(let n=0;n<columns.length;n++){
        if(columns[n].sort!==undefined) columns[n].sort='';
        if(columns[n].key===key) columns[n].sort=sortDirections[i+1];
      }
      this.setState({ columns });
      // 发送当前的类名及排序方式
      getSorter(key,sortDirections[i+1])
    }

    render() {
      const {columns,tableWidth,dataSource,titTop,checkedAll,currentRowKey}=this.state;
      const {ellipsis,
        columnsWidth,
        pagination,
        paginationPlacement,
        loading,
        showTitle,
        fixedHeight,
        rowSelection,
        rowKey,
        }=this.props;
      let showTotal='';
      if(pagination&&pagination.showTotalRight){
        delete pagination.showTotal;
        const {current,pageSize,total}=pagination;
        const startNum=(current-1)*pageSize+1;
        let endNum=current*pageSize;
        if(endNum>total) endNum=total;
        showTotal=`共${total}条记录，当前展示第${startNum}至第${endNum}条`;
      }
      const placement=styles[paginationPlacement]||'';
      const showPagination=(()=>{
        if(pagination===undefined) return false;
        const {total,pageSize}=pagination;
        return total>pageSize;
      })();

      const showPaginationFlag=pagination&&dataSource&&dataSource.length&&showPagination;

      const SortIcon = (currentSort,key) =>(
        <div style={{display:'inline-block',marginLeft:2}}>
          <div className={styles.sortIconWrap} onClick={()=>this.sortToggle(key)}>
            <Icon type="caret-up" style={{color:currentSort==='ascend'?'#1890FF':'#bfbfbf'}} />
            <Icon type="caret-down" style={{color:currentSort==='descend'?'#1890FF':'#bfbfbf',marginTop:-2}} />
          </div>
        </div>
      );

      const setKey = key => `${Math.random()*10000}${key}${Math.random()*50000}`.replace(/\./g,'');

      const renderCol = (dataSourceItem,column) => {

        let data='';

        switch (column.type) {
          case 'plaintext':
            data=dataSourceItem[column.key]
            break;
          case 'highlight':{
            // dataSourceItem[column.key]
            const {name,stcs}=dataSourceItem[column.key];

            let str = '';

            if (stcs && stcs[0] && stcs[0].msg) {
              const reg = new RegExp(stcs[0].briefStr, 'g');
              const targetStr = `<span style='color:red;font-weight:700'> ${
                stcs[0].briefStr
              } </span>`;
              str = stcs && stcs[0] && stcs[0].msg.replace(reg, targetStr);
            }
            data = str ? (
              <div className={styles.tagListTit} key={stcs[0].id}>
                <span className={styles.tagListTitNameWrap}>
                  <span style={{ backgroundColor: 'red' }} className={styles.tagListTitName}>
                    {name}
                  </span>
                </span>
                <div dangerouslySetInnerHTML={{ __html: str }} className={styles.tagListTitTxt} />
              </div>
            ) : (
              ''
            );

            break;
          }
            
          case 'date':
            
            break;
          case 'link':
            
            break;
          case 'label':
            break;
          default:
            break;
        }

        return data;  
  
      }

      const isAdmin = true;

      const menu = (
        <Menu onClick={this.setMenuClic}>
          <Menu.Item key={0}>我的列表显示字段设置</Menu.Item>
          <Menu.Item key={1}>公司默认显示字段设置</Menu.Item>
        </Menu>
      );

      const header = isAdmin ? (
        <Dropdown overlay={menu} trigger={['click']}>
          <Icon type="setting" />
        </Dropdown>
      ) : (
        <Icon type="setting" onClick={this.showColumnsModal} />
      );



      return (
        <div className={styles.rcrTableBgWrap}>
          <Spin size="large" spinning={loading===undefined?false:loading}>
      
            <div className={styles.rcrTableWrapWrap}>
              {header}
              <div 
                className={styles.rcrTableWrap} 
                ref={this.tableWrapDOM}
                style={{bottom:showPaginationFlag?48:0}}
              >
                {/* 表头 */}
                <div className={styles.rcrTableTitWrap} style={{width:tableWidth,top:titTop}}>
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
                        key={item.key} 
                        className={classNames(styles.rcrTableTit,{[styles.titBg]:(index%2 !==0)},)} 
                        style={{width:item.width||defaultWidth}}
                        ref={item.key}
                      >
                        <div className={styles.titAndSortWrap}>
                          {item.name}
                          {item.sort!==undefined&&SortIcon(item.sort,item.key)}
                        </div>


                        {item.props&&item.props.type&&(
                          <SearchSelectModal
                            targetName={item.key}
                            type={item.props.type}
                            handleOk={this.searchModalOk}
                            selectedStaff={[]}
                            selectedStaffDept={[]}
                          />
                        )
                          
                        }

                        {
                          item.filters&&(
                            <div className={styles.titFiltersWrap}>
                              {item.filters&&item.filters}
                            </div>
                          )
                        }
                        
                        {/* 用于拖拽的部分 */}
                        {
                          columnsWidth&&(
                            <div
                              key={setKey(item.key)}
                              className={styles.rcrMoveBtn} 
                              onMouseDown={(e)=>this.columnMouseDown(e,index,item.key)}
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
                        className={classNames(styles.rcrTableRow,
                        {[styles.rcrBorderBottom]:index!==dataSource.length-1},
                        {[styles.activeBg]:item[rowKey]===currentRowKey},
                        )}
                        key={setKey(item.key)}
                        onClick={e=>this.rowClick(e,item)}
                      >
                        {
                          ObjectNonEmpty(rowSelection)&&(
                            <div className={classNames(fixedHeight?styles.rcrColHeight:styles.rcrCol,)}>
                              <Checkbox key={item.key} onClick={e=>this.checkedRow(e,item,index)} checked={item.checked} />
                            </div>
                          )
                        }
                        
                        {columns.map((column,i)=>
                          <div 
                            key={setKey(column.key)} 
                            style={{width:column.width||defaultWidth}}
                            className={classNames(fixedHeight?styles.rcrColHeight:styles.rcrCol,
                            {[styles.colBg]:(i%2 !==0)},
                            {[styles.rcrEllipsis]:ellipsis})} 
                          >
                            {/* {column.render&&column.render(item[column.key],item)||
                            (showTitle?<span title={item[column.key]} key={setKey(item[column.key])}>{item[column.key]}</span>:item[column.key])
                            } */}
                            {
                              renderCol(item,column)
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

            <div className={styles.downloadBtn} onClick={this.isDownload}>
              <Icon type="file-text" />
              <span>导出</span>
            </div>

            {showPaginationFlag?(
              <div className={classNames(styles.paginationWrap,placement)}>
                <Pagination onChange={this.pageChange} {...pagination} />
                {
                  showTotal&&<span className={styles.showTotal}>{showTotal}</span>
                }
              </div>):''
            }
          </Spin>
          

          {/* 设置显示与隐藏字段的弹窗 */}
          {/* <SetColumnsModal 
            tab={this.tab} 
            getColumns={this.getColumns} 
            isBusiness={isBusiness} 

          /> */}
        </div>
      );
    }
}

export default MyTable;  


