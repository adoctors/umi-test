import React, { PureComponent, Component } from 'react';
import { Divider } from 'antd';
import { connect } from 'dva';
import { getLocalItem, setLocalItem } from '../../utils/utils';
import MyTable from '../../components/MyList/MyTable/MyTable';

import styles from './List.less';

@connect(({ list }) => ({

}))
class List extends Component {

  state = {
    columns:[],
    data:[],
  }

  componentDidMount() {
    this.customerList(0);
    this.customerList(1);
  }

  setHistoryWidth = (key, width) => {
    // 暂时没用
    const current = { [key]: width };
    if (!getLocalItem(this.tab)) {
      // 没有缓存宽度时存一下
      setLocalItem(this.tab, current);
    } else {
      // 有缓存时先获取
      setLocalItem(this.tab, { ...getLocalItem(this.tab), ...current });
    }
  };

  customerList = (type) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/customerList',
      payload: {
        apiName: 'customerList',
        reqType: 'get',
        data:{
          type,
        },
      },
      
      successCallback: ({data}) => {
        console.log(data)
        if(!type){
          
          this.setState({ columns:data.headers });
        }
        if(type){
          this.setState({data});
          // console.log(data.rows)
        }
      },
    }); 
  }

  render() {

    const {columns,data}=this.state;

    const pagination={
      total:data.count,
      pageSize:data.perPageNum,
      current:data.currentPage,
      showTotalRight: true,
    }


    return (
      <div className={styles.MyListWrap}>
        <p>我是MyList展示页面</p>
        <Divider />
        <div className={styles.MyListConWrap}>
          {columns && columns.length ? (
            <MyTable
              dataSource={data.rows || []}
              columns={columns}
              // loading={!!loading}
              // headerBlock={header}
              pagination={pagination}
              onChange={this.handleTableChange}
              onRow={this.onRowClick}
              setHistoryWidth={this.setHistoryWidth}
              rowKey="id"
              // rowSelection={rowSelection}
              // getSorter={this.getSorter}
              // paginationPlacement="right"
              columnsWidth
              // ellipsis
              // showTitle
              fixedHeight
            />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default List;