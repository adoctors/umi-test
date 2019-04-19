import React, { PureComponent } from 'react';
// import TableDnd from './Table/TableDnd';
import Transfer from './CheckedAll/Transfer';
import TransferDnd from './TransferDnd/TransferDnd';
// import PDnd from './P/PDnd';
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
        <TransferDnd />
      </div>
    )
  }
}

export default Dnd;


