import React from 'react';
import { connect } from 'dva';

import {
  Modal,  
  Button,
} from 'antd';

import Transfers from './Transfers/Transfers';

const type = window.location.pathname.indexOf('customer')>-1?'customers':'calls';

let sendCols='';

@connect(({ login, users }) => ({
  columnsModalShow: users.columnsModalShow,
  profile: login.profile,
}))
class SetColumnsModal extends React.PureComponent {
  state = {
    cols:[],
    hideCols:[],
    hideColsSelect:[],
    colsSelect:[],
  };

  componentDidMount() {
    this.getColumns();
  }

  getColumns = () => {
    const { dispatch, profile, tab,isBusiness } = this.props;
    dispatch({
      type: 'users/getColumns',
      payload: {
        keyListType:type,
        staffId:profile.id,
        page:type,
        tab,
        isBusiness,
      },
      callback:({cols,hideCols,requiredCols})=>{
        const hideColsList=hideCols&&hideCols.length?hideCols.map(item=>({
          name:item.title,
          id:item.key,
          checked:false,
        })):[];

        const colsList=cols&&cols.length?cols.map(item=>({
          name:item.title,
          id:item.key,
          checked:false,
        })):[];
        // console.log(hideColsList,colsList)
        this.setState({
          hideCols:hideColsList,
          cols:colsList
        })
      }
    });
  }

  resetColumns = () => {
    const { dispatch, profile, tab, } = this.props;
    dispatch({
      type: 'users/requestData',
      payload: {
        serviceName:'columnsReset',
        staffId:profile.id,
        page:type,
        tab,
        isBusiness:false,   // 设置公司时不会有这个按钮也不会有相关的逻辑
      },
      callback:()=>{
        // 设为默认后后，重新获取要显示的列名
        this.getColumns();
      }
    });
  }

  // showModal = () => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'users/setColumnsModalShow',
  //     payload: true,
  //   }); 
  // }

  handleOk = () => {
    const {cols}=this.state;
    const { dispatch,profile, tab,getColumns, isBusiness } = this.props;
    // 设置要显示的列名
    dispatch({
      type: 'users/requestData',
      payload: {
        serviceName:'columnsSave',
        staffId:profile.id,
        page:type,
        tab,
        isBusiness,
        cols:sendCols||cols, 
      },
      callback:()=>{
        getColumns();
        // 设置结束后，同步要显示的列名
        dispatch({
          type: 'users/saveShowColumnsList',
          payload: cols,
        });
        // 关闭窗口
        dispatch({
          type: 'users/setColumnsModalShow',
          payload: false,
        }); 
      }
    }); 
  }

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/setColumnsModalShow',
      payload: false,
    }); 
  }

  // handleChange = (cols, direction, moveKeys) => {
  //   // console.log(cols, direction, moveKeys);
  //   this.setState({ cols });
  // }

  getListVal = ({rightList}) => {
    const arr=rightList||[];
    sendCols=arr.map(item=>item.id);
    // console.log(sendCols);
  }

  render() {
    const {columnsModalShow,isBusiness} = this.props;
    const {cols,hideCols,hideColsSelect,colsSelect}=this.state;
    return (
      <div>  
        <Modal
          visible={columnsModalShow}
          title="显示字段"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>取消</Button>,
            !isBusiness&&<Button key="reset" onClick={this.resetColumns}>恢复默认</Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              确定
            </Button>,
          ]}
        >
          <Transfers
            leftList={hideCols}
            leftSelect={hideColsSelect}
            rightList={cols}
            rightSelect={colsSelect}
            onChange={this.getListVal}
          />
        </Modal>
      </div>
    );
  }
}

export default SetColumnsModal;