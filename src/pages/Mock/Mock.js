import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import { Button } from 'antd';

@connect(({ mocks }) => ({ 
  name:mocks.name,
}))

class Mock extends PureComponent {

  componentDidMount(){
    const {dispatch}=this.props;
    console.log(this.props)
    dispatch({
      type: 'mocks/test',
      callback: res => {
        console.log(res)
      },
    }); 
  }

  render() {
    return (
      <div>
        <p>mock</p>
      </div>
    )
  }
}

export default Mock;


