import React, { useState } from 'react';        // 引入
import { Button } from 'antd';
import Timer2 from './Timer2';

// hook需要16.8及以上版本支持
function Timer() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>计时器组件</p>
      <p>You clicked {count} times</p>  
      <Button onClick={() => setCount(count + 1)}>
        Click me
      </Button>
      <Timer2 count={count} />
    </div>
  );
}

export default Timer;