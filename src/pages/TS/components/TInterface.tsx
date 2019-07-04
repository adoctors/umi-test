import React from 'React';
import { connect } from 'dva';
import { ConnectProps,ConnectState } from '@/models/connect';

interface IProps extends ConnectProps {
  name: string;
  count: number;
  txt?: string;
  modelName?: string;
}


@connect(({ my }:ConnectState) => ({
  selfMsg: my.selfMsg,
}))

class TInterface extends React.Component<IProps> {

  componentDidMount(){
    console.log(this.props)
  }

  
  render(){
    const {modelName} = this.props;
    console.log(modelName)
    return (
      <div>
        <p>-------------------TInterface:</p>
      </div>
    )
  }
}

// export default connect(({ my }: ConnectState ) => ({
// // export default connect(({ ts }: any ) => ({
//   // modelName: ts.modelName,
// }))(TInterface);


// 不加入connect时IProps直接生效
export default TInterface;