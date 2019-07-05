import React from 'React';
import { connect } from 'dva';
// import MyTable from '../MyTableTS/MyTable';

import styles from './Index.less';

// 将js过渡到ts
@connect(( {loading}:any ) => ({
  loading: loading.effects['table/getTableData'],
}))

class MyTableTSIndex extends React.Component<any> {

  state = {
    columns : [],
    dataSource:[],
    total:0,
    selectedRowKeys:[],
  };

  componentDidMount(){
    // console.log(this.props)
    this.pageChange(1);
    // this.setColumns();
  }

  getTableData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'table/getTableData',
      callback: ({data:{dataSource}}) => {
        this.setState({dataSource});
      },
    }); 
  }

  pageChange = (page?:number) => {
    // console.log(page)
    const {dispatch}=this.props;
    if(dispatch){
      dispatch({
        type: 'table/getTableDataPage',
        payload: {
          page,
        },
        callback: ({data:{Data,total}}) => {
          this.setState({dataSource:Data,total});
        },
      }); 
    }
    
  }

  // setColumns = () => {
  //   const columns=[{
  //     title: '姓名',
  //     dataIndex: 'name',
  //     sort:'ascend',
  //     width:200,
  //   }, {
  //     title: '标签',
  //     dataIndex: 'tags',
  //     width:200,
  //     render:(text)=>(
  //       <div title={text.join('、')}>
  //         {
  //           text.map(item=> <span key={item} className={styles.tags}>{item}</span> )
  //         }
  //       </div>
  //     )
  //   }, {
  //     title: '年龄',
  //     dataIndex: 'age',
  //     width:200,
  //     render:(text)=>(
  //       <div>{text} - age</div>
  //     )
  //   }, {
  //     title: (<span>住址</span>),
  //     dataIndex: 'address',
  //     width:200,
  //   },]

  //   if(getLocalItem(tab)){
  //     // 如果之前有设置好的表格宽度
  //     const historyWidth=getLocalItem(tab);
  //     for(let i=0;i<columns.length;i++){
  //       columns[i].width=columns[i].width;
  //       if(historyWidth[columns[i].dataIndex]){
  //         columns[i].width=historyWidth[columns[i].dataIndex];
  //       }
  //     }
  //   }
  //   this.setState({columns});
  // }

  // setMenuClic = ({key}) => {
  //   console.log(key)
  // }

  // setHistoryWidth = (key,width) => {
  //   const current={[key]:width};
  //   if(!getLocalItem(tab)){
  //     // 没有缓存宽度时存一下
  //     setLocalItem(tab,current);
  //   }else{
  //     // 有缓存时先获取
  //     setLocalItem(tab,{...getLocalItem(tab),...current,});
  //   }
  // }

  // onRowClick = (item) => {
  //   console.log(item)
  // }

  // onSelectChange = (selectedRowKeys) => {
  //   // 获取批量操作选的项集合
  //   console.log(selectedRowKeys)
  // }

  // getSorter = (dataIndex,currentSort)=>{
  //   // 获取当前列的列名及排序方式
  //   console.log(dataIndex,currentSort);
  // }

  
  render() {

    // const {dataSource,total,columns}=this.state;
    // const {loading}=this.props;


    // const isAdmin=true;
    // const menu = (
    //   <Menu onClick={this.setMenuClic}>
    //     <Menu.Item key={0}>
    //       我的列表显示字段设置
    //     </Menu.Item>
    //     <Menu.Item key={1}>
    //       公司默认显示字段设置
    //     </Menu.Item>
    //   </Menu>
    // );
    // const header=isAdmin?(
    //   <Dropdown overlay={menu} trigger={['click']}>
    //     <Icon type="setting" />
    //   </Dropdown>
    //   ):(<Icon type="setting" />);


    // const showTotal = (totalNum, range) => `共${totalNum}条记录，当前展示第${range[0]}至第${range[1]}条`;
    // const pagination = {
    //   total: total||dataSource.length,
    //   showTotal,
    //   // showQuickJumper: true,
    //   pageSize: defaultPageSize,
    // };


    // const rowSelection = {
    //   returnKeyName:'name',
    //   selectedRowKeys:["邱超"],
    //   onChange: this.onSelectChange,
    // };

    return (
      <div className={styles.tableV2Wrap}>
        <p>MyTable-TypeScript 展示页面</p>
        {/* <Divider />
        <div className={styles.myTableWrap}>
          {
            columns&&columns.length?
            (<MyTable
              dataSource={dataSource}
              columns={columns}
              loading={!!loading}
              headerBlock={header}
              pagination={pagination}
              onChange={this.pageChange}
              onRow={this.onRowClick}
              setHistoryWidth={this.setHistoryWidth}
              rowSelection={rowSelection}
              getSorter={this.getSorter}
              paginationPlacement="right"
              columnsWidth
              ellipsis
              showTitle
              fixedHeight
            />):''
          }
        </div> */}
      </div>
      
    );
  }
}

export default MyTableTSIndex;
