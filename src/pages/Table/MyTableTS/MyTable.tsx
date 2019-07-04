import React, { Component } from 'React';
import { connect } from 'dva';
import { ConnectProps } from '@/models/connect';
import classNames from 'classnames';

// 将js过渡到ts
interface IProps extends ConnectProps {
  dataSource: any[];
  columns: IColumns[];
  columnsWidth?: boolean;
  ellipsis?: boolean;
  onRow?: ()=> void;
  headerBlock?: React.ReactNode;
  pagination: {
    total: number;
    showTotal?: string;
    pageSize: number;
    [key: string]: any;
  };
  paginationPlacement?: 'left' | 'right' | 'center';
  loading?: boolean;
  showTitle?: boolean;
  fixedHeight?: boolean;
  rowSelection?: {
    returnKeyName: string;
    selectedRowKeys: string[];
    onChange: ()=> void;
  };
  getSorter?: ()=> void;
  modelName: string;
}

interface IColumns {
  title: string;
  dataIndex: string;
  sort?: 'descend' | 'ascend' | '';
  width?: number;
  render?: (text)=> void;
}


interface PromiseRenderState {
  component: React.ComponentClass | React.FunctionComponent;
}



@connect(({ my }) => ({
  selfMsg: my.selfMsg,
}))

class MyTable extends Component<IProps,PromiseRenderState> {
// class MyTable<P> extends React.Component<IProps> {

  componentDidMount(){
    console.log(this.props)
    const { dispatch } = this.props;
    // if(dispatch){   // 一定要加，dispatch初始可能是undefined

    // }
  }

  
  render(){
    const {modelName} = this.props;
    console.log(modelName)
    return (
      <div>
        <p>123-Component-T123424</p>
      </div>
    )
  }
}

// export default connect(({ my, mypage }: ConnectState|any ) => ({
export default MyTable;