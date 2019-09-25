import React from 'React';
import { connect } from 'dva';
import { Tooltip, Tag, Progress } from 'antd';

import { ConnectProps, ConnectState, Route, MyModelState } from '@/models/connect';

import styles from './APITest.less';

class APITest extends React.Component<any> {

  componentDidMount(){
    console.log(this.props)
    const { dispatch } = this.props;
    if(dispatch){   // 一定要加，dispatch初始可能是undefined
      dispatch({
        type: 'tests/fecth',
        payload: {
          apiName: 'userMsg'
        },
        callback: res => {
          console.log(res)
        },
      }); 
    }
  }

  
  render(){

    const progressNum = {
      current: 25,
      total: 100,
    }


    return (
      <div className={styles.APITestWrap}>
        <p>APITest</p>
        <div className={styles.progressWrap}>
          <Progress 
            percent={progressNum.current / progressNum.total * 100}
            strokeColor="red"
            format= {() => `${progressNum.current}/${progressNum.total}`}
          />
        </div>
        
      </div>
    )
  }
}

// export default connect(({ my, mypage }: ConnectState|any ) => ({
export default connect(({ tests }: any ) => ({
  name: tests.name,
}))(APITest);