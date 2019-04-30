import React from 'react';

class CounterButton extends React.Component {

  state={
    count: 1
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {color}=this.props;
    const {count}=this.state;
    if (color !== nextProps.color) {
        return true;
    }
    // 重写shouldComponentUpdate若将此处count相关逻辑注释则count变化页面不渲染
    // if (count !== nextState.count) {
    //     return true;
    // }
    return false;
  }

  render() {
    const {color}=this.props;
    const {count}=this.state;
    return (
      <button 
        style={{color}}
        onClick={() => this.setState(state => ({count: state.count + 1}))}
      >
        Count: {count}
      </button>
    );
  }
}

export default CounterButton;