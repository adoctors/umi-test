import React from 'React';
import { connect } from 'dva';
// 简洁模板


import { ConnectProps, ConnectState, Route, MyModelState } from '@/models/connect';

// interface AuthComponentProps extends ConnectProps {
//   selfMsg: MyModelState;
// }

// class My extends React.Component<AuthComponentProps> {
class My extends React.Component<any> {

  componentDidMount(){
    console.log(this.props)
    const { dispatch } = this.props;
    if(dispatch){   // 一定要加，dispatch初始可能是undefined
      // dispatch({
      //   type: 'my/fetch',
      //   payload: {
      //     apiName: 'selfMsg'
      //   },
      //   callback: res => {
      //     console.log(res)
      //   },
      // }); 
    }
  }

  
  render(){
    const {selfMsg} = this.props;
    console.log(selfMsg)
    return (
      <div>
        <p>TypeScript - props - simple - Component</p>
      </div>
    )
  }
}

// export default connect(({ my, mypage }: ConnectState|any ) => ({
export default connect(({ my, mypage }: any ) => ({
  selfMsg: my.selfMsg,
  MPName: mypage.name,
}))(My);