import React, { Component } from 'react';
// import { Input, } from 'antd';
// import { connect } from 'dva';
// import styles from './name.less';

// @connect(({ loading, }) => ({
//   loading: loading.effects['form/effect'],
// }))

class PageName extends Component {

  state = {
    name: '关于html的测试',
  };

  componentDidMount() {}

  fun = name => {
    this.setState({
      name,
    });
  };

  render() {
    const { name } = this.state;

    const num=123;
    const str0='abc'
    const str=`abc<span>${num}</span>ccc`;

    const msg='我是abc一段内abc容其abc中有abc一些字母';

    const reg = new RegExp(str0,"g");

    const str2=msg.replace(reg, '<span style="color:red;font-weight:700">abc</span>')

    return (
      <div>
        <div>{name}</div>
        <p>{str}</p>
        <p dangerouslySetInnerHTML={{ __html: '<h3>我是h3</h3>' }} />
        <p dangerouslySetInnerHTML={{ __html: str }} />
        <p dangerouslySetInnerHTML={{ __html: str2 }} />
      </div>
    );
  }
}

export default PageName;