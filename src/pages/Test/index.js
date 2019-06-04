import React from 'react';

import CounterButton from './Componment/CounterButton';
import PureComponent from './Componment/PureComponent';
import HTMLS from './HTMLS/HTMLS';

import ContextTest from '../../components/Test/Context/Context01/index';
import ContextTest02 from '../../components/Test/Context/Context02/index';


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
        <HTMLS />
        <p>ContextTest</p>
        <ContextTest />
        <p>ContextTest02:</p>
        <ContextTest02 />
      </div>
    );
  }
}

export default Test;
