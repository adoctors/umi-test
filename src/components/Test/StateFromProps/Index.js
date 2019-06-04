import React from 'react';

import Test01 from './Test01';
import SetState from './SetState';


class StateFromProps extends React.Component {


  state = {
    name:'initVal - parent',
    btnVal:'Primary',
  }

  // changeBtnVal = () => {
  //   const {name}=this.state;
  //   this.setState((state,props)=>{
  //     console.log(state,props)
  //     return {btnVal:'Primary-change'};
  //   })
  //   this.setState({name:'name-change'},()=>{
  //     console.log(this.state.name,name)   // name-change initVal - parent
  //   })
  // }


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