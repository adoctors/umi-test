import React from 'React';
import { connect } from 'dva';


class T1 extends React.Component<any> {

  componentDidMount(){
    // console.log(this.props)
    const { dispatch } = this.props;
    // if(dispatch){   // 一定要加，dispatch初始可能是undefined

    // }
  }

  
  render(){
    const {modelName} = this.props;
    // console.log(modelName)
    return (
      <div>
        <p>123-Component-T1</p>
      </div>
    )
  }
}

// export default connect(({ my, mypage }: ConnectState|any ) => ({
export default connect(({ ts,my }: any ) => ({
  modelName: ts.modelName,
  selfMsg: my.selfMsg,
}))(T1);