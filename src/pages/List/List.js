import React, { PureComponent, Component } from 'react';
import { Divider } from 'antd';
import { connect } from 'dva';

class List extends Component {



  componentDidMount() {}



  render() {
    return (
      <div>
        <p>我是MyList展示页面</p>
        <Divider />
        <div>
          我是自定义列表区域
        </div>
      </div>
    );
  }
}

export default List;