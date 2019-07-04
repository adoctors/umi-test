import React from 'React';
import { connect } from 'dva';
// 标砖模板

import { ConnectProps, ConnectState, Route, MyModelState } from '@/models/connect';

interface AuthComponentProps extends ConnectProps {
  selfMsg: MyModelState;
}

class My extends React.Component<AuthComponentProps> {

  componentDidMount(){
    console.log(this.props)
    const { dispatch } = this.props;
    if(dispatch){   // 一定要加，dispatch初始可能是undefined
      dispatch({
        type: 'my/fetch',
        callback: res => {
          console.log(res)
        },
      }); 
    }
  }

  
  render(){
    const {selfMsg} = this.props;
    console.log(selfMsg)
    return (
      <div>
        <p>TypeScript - props - Common - Component</p>
      </div>
    )
  }
}

export default connect(({ my }: ConnectState ) => ({
  selfMsg: my.selfMsg,
}))(My);