import React, { PureComponent } from 'react';
// import TableDnd from './Table/TableDnd';
import Transfer from './CheckedAll/Transfer';
import PDnd from './P/PDnd';
import Demo2 from './demo2/index.tsx';
import HooksDemo from './HooksDemo/HooksDemo.tsx';
// import {Log} from '../../utils/utils';


import styles from './index.less';

class Dnd extends PureComponent {

  componentDidMount(){
    console.log('console')
  }

  render() {
    return (
      <div className={styles.wrap}>
        <p>拖拽demo</p>
        {/* <TableDnd /> */}
        {/* <Transfer /> */}
        {/* <PDnd /> */}
        {/* <PDnd /> */}
        {/* <div className={styles.demo1}>
          <Demo2 />
        </div> */}
        <HooksDemo />
      </div>
    )
  }
}

export default Dnd;