import React, { PureComponent } from 'react';
import TableDnd from './TableDnd';
// import Transfer from './Transfer';
import PDnd from './PDnd';
// import {Log} from '../../utils/utils';


import styles from './index.less';

class Dnd extends PureComponent {

  componentDidMount(){
  }

  render() {
    return (
      <div className={styles.wrap}>
        <p>拖拽demo</p>
        {/* <TableDnd /> */}
        {/* <Transfer /> */}
        <PDnd />
      </div>
    )
  }
}

export default Dnd;


