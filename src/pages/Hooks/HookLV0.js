import React, { useState } from 'react';        // 引入
import { Button } from 'antd';

import styles from './index.less';

// hook需要16.8及以上版本支持
function HookLV0( props ) {

  const [count, setCount] = useState(0);
  const { msg } = props;
  console.log(msg)
  return (
    <div>
      <p className={styles.green}>我是第一层子级</p>  
      <Button onClick={() => setCount(count + 1)}>
        Click me
      </Button>
    </div>
  );
}

export default HookLV0;