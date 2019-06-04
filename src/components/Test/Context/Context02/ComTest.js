import React from 'react';
import createContext from './createContext';


class ComTest extends React.Component {

  static contextType = createContext;

  componentDidMount(){
    console.log(this.context)
  }

  render(){
    return (
      <div>
        <p>此处为获取数据的子组件 : {this.context}</p>
      </div>
    )
  }
}
// ComTest.contextType = createContext;

export default ComTest;