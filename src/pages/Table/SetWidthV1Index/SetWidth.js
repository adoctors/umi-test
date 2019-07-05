import React, { Component } from 'react';
import { Icon,Dropdown,Menu } from 'antd';
import { connect } from 'dva';

import MyTable from '../../../components/Table/MyTableV1/MyTable';

import styles from './SetWidth.less';


@connect(({ table }) => ({ 
  name:table.name,
}))
class SetWidth extends Component {

    state = {
      dataSource:[],
      total:0,
    }

    componentDidMount(){
      const { dispatch } = this.props;
      dispatch({
        type: 'table/getTableData',
        payload:{
          apiName: 'getTableData',
          reqType: 'get',
        },
        callback: ({data:{dataSource}}) => {
          this.setState({dataSource});
          // this.pageChange(1);
        },
      }); 
      
    }

    onRowClick = (item) => {
      console.log(item)
    }


    pageChange = (page,size) => {
      // console.log(page,size)
      const {dispatch}=this.props;
      dispatch({
        type: 'table/getTableDataPage',
        payload: {
          page,
        },
        callback: ({data:{Data,total}}) => {
          // console.log(Data,total)
          this.setState({dataSource:Data,total});
        },
      }); 
    }

    render() {
      const {dataSource,total}=this.state;
      const columns = [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width:200,
      }, {
        title: '标签',
        dataIndex: 'tags',
        key: 'tags',
        width:200,
        render:(text)=>(
          <div title={text.join('、')}>
            {
              text.map(item=> <span key={item} className={styles.tags}>{item}</span> )
            }
          </div>
        )
      }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width:200,
        render:(text)=>(
          <div>{text} - age</div>
        )
      }, {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
        width:200,
      },];


      const isAdmin=true;

      const menu = (
        <Menu onClick={this.setMenuClic}>
          <Menu.Item key={0}>
            我的列表显示字段设置
          </Menu.Item>
          <Menu.Item key={1}>
            公司默认显示字段设置
          </Menu.Item>
        </Menu>
      );

      const header=isAdmin?(
        <Dropdown overlay={menu} trigger={['click']}>
          <Icon type="setting" />
        </Dropdown>
        ):(
          <Icon type="setting" onClick={this.showColumnsModal} />
        )


      const showTotal = (total, range) => `共${total}条记录，当前展示第${range[0]}至第${range[1]}条`;

      const pagination = {
        total: total||dataSource.length,
        showTotal,
        // showQuickJumper: true,
        pageSize: 10,
      };

      return (
        <div className={styles.myTableWrap}>
          <p>自定义可改变列宽度table展示</p>
          <MyTable
            columns={columns}
            // dataSource={[]}
            onChange={this.pageChange}
            dataSource={dataSource}
            headerBlock={header}
            pagination={pagination}
            onRow={this.onRowClick}
            paginationPlacement="right"
            loading={false}
            ellipsis
          />
        </div>
        
      );
    }
}

export default SetWidth;  


