import React from 'react';

if(process.env.VERSION){
  console.log(process.env.VERSION)
  console.log(`version: ${VERSION}`);
}

export default () => (
  <p style={{ textAlign: 'center' }}>
    demo/自定义组件/测试
  </p>
);
