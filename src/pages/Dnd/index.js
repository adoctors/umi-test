import React, { PureComponent } from 'react';
// import TableDnd from './Table/TableDnd';
import Transfer from './CheckedAll/Transfer';
import PDnd from './P/PDnd';
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
        <PDnd />
        <PDnd />
      </div>
    )
  }
}

export default Dnd;


