import React, { useState } from 'react';        // 引入
import { connect } from 'dva';
import styles from './index.less';

// 使用该语法糖则要求为class
// @connect(({ hooks }) => ({
//   modelMsg:hooks.modelMsg,
// }))

// hook需要16.8及以上版本支持
function HookProps( props ) {
  const { modelMsg } = props;
  console.log(modelMsg)
  return (
    <div>
      <p className={styles.green}>我是跨组件props的例子</p>
      <p>在log中查看获取到的值</p>
    </div>
  );
}

// export default HookProps;

// hook时使用该种方法引用props
export default connect(({ hooks }) => ({
  modelMsg:hooks.modelMsg,
}))(HookProps);