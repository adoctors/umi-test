import React from 'react';

class Child extends React.Component {

  componentDidMount(){
    console.log(this.props)
  }

  render(){
    return (
      <div>
        <p>我是子组件0000 -- 123</p>
      </div>
    )
  }
}

export default Child;