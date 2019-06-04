import React from 'react';
import createContext from '../createContext';

class LastCom extends React.Component {

  static contextType = createContext;

  componentDidMount(){
    console.log(this.context)
  }

  render(){
    return (
      <div>
        <p>我是子组件0000 -- {this.context}</p>
      </div>
    )
  }
}

export default LastCom;