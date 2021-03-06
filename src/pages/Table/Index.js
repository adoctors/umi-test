
import React from 'react';
import { Table,Divider  } from 'antd';
import { Resizable } from 'react-resizable';
import {Log,Logs} from '../../utils/utils';

import SetWidth from './SetWidthV1Index/SetWidth';

import './Index.less';

const ResizeableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};

class ColumnsWidth extends React.Component {
  state = {
    columns: [{
      title: 'Date',
      dataIndex: 'date',
      width: 200,
    }, {
      title: 'Amount',
      dataIndex: 'amount',
      width: 100,
    }, {
      title: 'Type',
      dataIndex: 'type',
      width: 100,
    }, {
      title: 'Note',
      dataIndex: 'note',
      width: 100,
    }, {
      title: 'Action',
      key: 'action',
      render: () => (
        <a>Delete</a>
      ),
    }],
  };

  

  components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  data = [{
    key: 0,
    date: '2018-02-11',
    amount: 120,
    type: 'income',
    note: 'transfer',
  }, {
    key: 1,
    date: '2018-03-11',
    amount: 243,
    type: 'income',
    note: 'transfer',
  }, {
    key: 2,
    date: '2018-04-11',
    amount: 98,
    type: 'income',
    note: 'transfer',
  }];

  componentDidMount(){
    // Log.info('abc',123,[1,2,3],{name:'adc'})
    // console.log(Logs('123'))
    
  }

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));

    return (
      <div>
        <Table
          bordered
          components={this.components}
          columns={columns}
          dataSource={this.data}
        />

        {/* <Divider orientation="left" style={{marginBottom:30}}>自定义</Divider> */}
        <SetWidth /> 
      </div>
      
    );
  }
}


export default ColumnsWidth;