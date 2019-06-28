import React, { useState } from 'react';        // 引入
import { Divider } from 'antd';
import HookLV0 from './HookLV0';
import Timer from './Timer';

import styles from './index.less';


// hook需要16.8及以上版本支持
function Hooks() {
  const [title] = useState('我是Hook测试的首页,需要react16.8+');
  const msg = {
    name:'adoctors',
    age:18,
  }
  return (
    <div className={styles.wrap}>
      <p>{title}</p>
      <Divider />
      <Timer />
      <Divider />
      <HookLV0 msg={msg} />
    </div>
  );
}

export default Hooks;