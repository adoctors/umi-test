import React, { PureComponent } from 'react';
import { connect } from 'dva';
import MockData from 'mockjs';
// import { Button } from 'antd';

import Func from './Func';



const data=MockData.mock({
  'key':'@id',
  'arr|5':[{              // 数组长度为5
    'name':'@name',
    'home|1':['郑州','洛阳','开封','北京'],   // 选取数组中的某一个
    'home2|1-3':['郑州','洛阳','开封','北京'],   // 选取数组中的某一个
    'key|+1':1,     // 从一开始按顺序
  }],
  'data|1-9':[{
    'date':'@date("yyyy-MM-dd")',
    "score|1-800": 800,               // 随机生成1-800的数字，数字类型
    "nickname": "@cname",             // 随机生成中文名字
    "flag|1":false,               // boolean类型
  }]
})



@connect(({ mocks }) => ({ 
  name:mocks.name,
}))

class Mock extends PureComponent {

  componentDidMount(){
    const {dispatch}=this.props;
    // console.log(this.props)
    dispatch({
      type: 'mocks/test',
      payload:{
        apiName: 'mockUser',
        reqType: 'get',
      },
      callback: res => {
        // console.log(res)
      },
    }); 
    // console.log(data)
  }

  render() {
    return (
      <div>
        <p className="p1">mock</p>
        <Func
          name="我是函数式组件"
          title="没错！"
        />
      </div>
    )
  }
}

export default Mock;


