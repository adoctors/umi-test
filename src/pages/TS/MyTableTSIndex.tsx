import React from 'React';
import { connect } from 'dva';
import MyTable from '../Table/MyTableTS/MyTable'

// 将js过渡到ts

class MyTableTSIndex extends React.Component<IProps> {

  componentDidMount(){
    console.log(this.props)
    const { dispatch } = this.props;
    // if(dispatch){   // 一定要加，dispatch初始可能是undefined

    // }
  }

  
  render(){
    const {modelName} = this.props;
    console.log(modelName)
    return (
      <div>
        <p>MyTableTSIndex:</p>
        <MyTable />
      </div>
    )
  }
}

// export default connect(({ my, mypage }: ConnectState|any ) => ({
export default connect(({ ts }: any ) => ({
  modelName: ts.modelName,
}))(MyTableTSIndex);
