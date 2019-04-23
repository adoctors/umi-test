import React, { Component } from 'react';

import MyTable from '../MyTable/MyTable';

class SetWidth extends Component {

    state = {}

    render() {

      const dataSource = [{
        key: '1',
        name: '梁朝伟',
        age: 32,
        address: '西湖区湖底公园1号'
      }, {
        key: '2',
        name: '张学友',
        age: 42,
        address: '西湖区湖底公园1号'
      }, {
        key: '3',
        name: '刘德华',
        age: 42,
        address: '香港'
      }];
      
      const columns = [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width:200,
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
      }];

      return (
        <MyTable
          dataSource={dataSource}
          columns={columns}
        />
      );
    }
}

export default SetWidth;  


