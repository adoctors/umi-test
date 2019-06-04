import React from 'react';
import { Button } from 'antd';

class SetState extends React.Component {


  state = {
    name:'initName',
    btnVal:'initBtnVal',
  }

  changeBtnVal = () => {
    const {name}=this.state;

    this.setState((state,props)=>{
      console.log(state,props)
      return {btnVal:'btnVal-change'};
    })

    this.setState({name:'name-change'},()=>{
      console.log(this.state.name,name)   // name-change initName
    })
  }


  render() {
    const {btnVal} = this.state;
    return (
      <Button type="primary" onClick={this.changeBtnVal}>{btnVal}</Button>
    );
  }
}

export default SetState;