import React from 'react';

import Test01 from './Test01';
import SetState from './SetState';


class StateFromProps extends React.Component {


  state = {
    name:'initVal - parent',
    btnVal:'Primary',
  }

  render() {
    const {btnVal} = this.state;
    return (
      <div>
        <p>我是父组件</p>
        <SetState />
        {/* <Test01 /> */}
      </div>
    );
  }
}

export default StateFromProps;