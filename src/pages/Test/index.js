import React from 'react';

import CounterButton from './Componment/CounterButton';
import PureComponent from './Componment/PureComponent';


class Test extends React.Component {

  state = {
    words: ['adoctors','shanks']
  }

  handleClick = () => {
    const {words} = this.state;
    // const words = this.state.words.slice(0);     //解决方案
    words.push('tom');
    this.setState({words});
    console.log(words)
  }

  render() {
    const {words}=this.state;
    return (
      <div>
        <p>tests</p>
        <CounterButton color="#2fe1a8" />
        <p />
        <p />
        <p />
        <button onClick={this.handleClick}>click</button>
        <PureComponent words={words} />
      </div>
    );
  }
}

export default Test;
