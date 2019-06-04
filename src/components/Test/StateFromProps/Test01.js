import React from 'react';

class Test01 extends React.Component {


  state = {
    name:'initVal - parent',
  }

  fun = () => {
    console.log('parent fun ')
  }




  render() {
    return (
      <div>
        <p>我是父组件</p>
        
      </div>
    );
  }
}

export default Test01;