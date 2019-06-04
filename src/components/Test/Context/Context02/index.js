import React from 'react';
import createContext from './createContext';


import ComTest from './ComTest';
import Tier0 from './Tier/Tier0';

class ContextTest extends React.Component {


  state = {
    name:'adoctors-parentVal',
  }

  fun = () => {
    console.log('parent fun ')
  }




  render() {
    // 在 createContext 内部的 ComTest 组件使用 state 中的 name 值，
    // 而外部的组件使用默认的 theme 值
    return (
      <div style={{border:'1px solid pink'}}>
        <createContext.Provider value={this.state.name}>
          <ComTest fun={this.fun} />
          <Tier0 />
        </createContext.Provider>
        <div>
          <ComTest />
        </div>
        
      </div>
    );
  }
}

export default ContextTest;