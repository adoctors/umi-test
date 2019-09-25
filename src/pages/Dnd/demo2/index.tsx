import React from 'react';
import LeftItem from './LeftItem';
import RightItem from './RightItem';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import styles from './index.less';

const Demo2 = () => {
  const leftList = [
    {
      name: '心情',
      id: 1,
    },
    {
      name: '日期',
      id: 2,
    },
    {
      name: '爱好',
      id: 3,
    },
  ];
  const rightList = [
    {
      name: '难过',
      id: 1,
    },
    {
      name: '20190915',
      id: 2,
    },
    {
      name: '打篮球',
      id: 3,
    },
  ];

  return (
    <div className={styles.demo2Wrap}>
      <div className={styles.boxsWrap}>
        {
          leftList.map(item=> <LeftItem name={item.name} id={item.id} key={item.id} />)
        }
        
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {
          rightList.map(item=> <RightItem name={item.name} key={item.id} />)
        }
      </div>
    </div>
  );
};

export default DragDropContext(HTML5Backend)(Demo2);
