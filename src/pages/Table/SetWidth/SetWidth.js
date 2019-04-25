import React, { Component } from 'react';
import { Icon,Dropdown,Menu } from 'antd';

import MyTable from '../MyTable/MyTable';

import styles from './SetWidth.less';

class SetWidth extends Component {

    state = {}

    render() {

      const dataSource = [{
        key: '1',
        name: '梁朝伟梁朝伟梁朝伟梁朝伟梁朝伟梁朝伟梁朝伟梁朝伟',
        age: 32,
        address: '西湖区湖底公园1号',
        tags:['影帝','明星'],
      }, 
      {
        key: '2',
        name: '张学友',
        age: 42,
        address: '西湖区湖底公园1号',
        tags:['歌神','明星','电影','表情包'],
      }, 
      {
        key: '3',
        name: '刘德华',
        age: 42,
        address: '香港',
        tags:['劳模','明星','勤奋','努力','谦虚','电影','唱歌'],
      }, 
      {
        key: '11',
        name: '张学友',
        age: 42,
        address: '西湖区湖底公园1号',
        tags:['歌神','明星','电影','表情包'],
      }, 
      {
        key: '12',
        name: '这是很长的一条信息，就说了很长了，真的时很长',
        age: 42,
        address: '香港',
        tags:['劳模','明星','勤奋','努力','谦虚','电影','唱歌'],
      }, 
      {
        key: '13',
        name: '张学友',
        age: 42,
        address: '西湖区湖底公园1号',
        tags:['歌神','明星','电影','表情包'],
      }, 
      {
        key: '14',
        name: '刘德华',
        age: 42,
        address: '香港',
        tags:['劳模','明星','勤奋','努力','谦虚','电影','唱歌'],
      }, 
      {
        key: '15',
        name: '张学友',
        age: 42,
        address: '西湖区湖底公园1号',
        tags:['歌神','明星','电影','表情包'],
      }, 
      {
        key: '16',
        name: '刘德华',
        age: 42,
        address: '香港',
        tags:['劳模','明星','勤奋','努力','谦虚','电影','唱歌'],
      }
    ];
      
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

      return (
        <div className={styles.myTableWrap}>
          <p>自定义可改变列宽度table展示</p>
          <MyTable
            columns={columns}
            // dataSource={[]}
            dataSource={dataSource}
            headerBlock={header}
            ellipsis
          />
        </div>
        
      );
    }
}

export default SetWidth;  


