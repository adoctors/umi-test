import React, { useEffect } from 'react';        // 引入

function Timer2(props) {
  const {count} = props;
  const list = '零一二三四五六七八九十'.split('');
  const FormatLetter = (num) => {
    const numToList = num.toString().split('');
    let numStr='';
    for(let i=0;i<numToList.length;i++){
      numStr+=list[numToList[i]];
    }
    return numStr;
  }

  useEffect(() => {
    console.log('init Timer2!!!')
    console.log(count,FormatLetter(count))
  });

  return (
    <div>
      <p>计时器组件-子</p>
      <p>You clicked {count} / {FormatLetter(count)} times</p>  
    </div>
  );
}

export default Timer2;