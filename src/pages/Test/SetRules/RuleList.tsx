import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { ConnectProps } from '@/models/connect';
import { Table, Button, Input, Popconfirm, Select, message, Form, } from 'antd';
import { isEqual, cloneDeep } from 'lodash';

import styles from './SetRules.less';

interface IProps extends ConnectProps {
  [key: string]: any
}

const { Option } = Select;
// @ts-ignore
@Form.create()
@connect(({ tests, }) => ({
  RuleGroup: tests.RuleGroup,
  selectRules: tests.selectRules,
  allRules: tests.allRules,
}))

class RuleList extends PureComponent<IProps> {

  state = {
    dataSource: [],
    // selectRules: []
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.value, preState.selectRules)) {
      return null;
    }
    return {
      dataSource: nextProps.value,
      // selectRules: nextProps.value,
    };
  }

  selectableRules() {
    const { allRules, selectRules } = this.props;
    return allRules.filter(rule => {
      for(let i=0; i<selectRules.length; i++){
        if (selectRules[i].ruleId === rule.id) return false;
      }
      return rule;
    });
  }

  handleChange(value, option, key, oldValue) {
    console.log(value, option, key, oldValue)
    // const { data } = this.state;
    // const { onChange, dispatch } = this.props;
    // const newData = data.map(item => ({ ...item }));
    // const target = this.getRowByKey(key, newData);
    // if (target) {
    //   target.ruleId = value;
    //   target.name = option.props.children;
    //   this.setState({ data: newData });
    // }
    // // console.log(value, oldValue);
    // dispatch({ type: 'rules/selectedRules', payload: { value, oldValue } });
    // onChange(newData);
  }

  getRowByKey(key, newData) {
    const { dataSource } = this.state;
    return (newData || dataSource).filter(item => item.key === key)[0];
  }

  handleFieldChange(e, fieldName, key) {

    const { form } = this.props;
    console.log(form)
    const keys = form.getFieldValue('baseScore');
    console.log(keys)

    // form.setFieldsValue('baseScore',e.target.value)

    // console.log(e.target.value,fieldName, key)
    // const { dataSource } = this.state;
    // const { onChange } = this.props;
    // const newData = cloneDeep(dataSource);
    // console.log('target-before',newData)
    // const target = this.getRowByKey(key, newData);
    // console.log(target)
    // if (target) {
    //   target[fieldName] = e.target.value;
    //   this.setState({ dataSource: newData });
    // }
    // console.log('target-after',newData)
    // onChange(newData);
  }

  render() {
    const { type, form:{getFieldsValue} } = this.props;
    const { dataSource } = this.state;
    // console.log('this.props',this.props.form)
    // console.log('ruleList-minusRules',getFieldsValue(['minusRules']))
    const selectableRules = this.selectableRules();

    
    const columns = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        width: '10%',
      },
      {
        title: type === 'plus' ? '加分标签' : '扣分标签',
        dataIndex: 'ruleId',
        key: 'ruleId',
        width: '35%',
        render: (text, record) => (
          <Select
            value={text}
            style={{ width: 200 }}
            // onChange={(value, option) => this.handleChange(value, option, record.key, text)}
          >
            <Option value={record.ruleId} key={record.ruleId}>
              {record.name}
            </Option>
            {selectableRules.map(rule => (
              <Option value={rule.id} key={rule.id}>
                {rule.name}
              </Option>
            ))}
          </Select>
        ),
      },
      {
        title: '分数',
        dataIndex: 'score',
        key: 'score',
        width: '35%',
        render: (text, record) => (
          <div className={styles.tableScore}>
            <div>{type === 'plus' ? '+' : '-'}</div>
            <Input
              value={text}
              onChange={e => this.handleFieldChange(e, 'score', record.key)}
              // onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder="请输入分数"
            />
          </div>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <div id="removeTagButton" className={styles.removeTagButton}>
            <Popconfirm
              title="是否要删除此行？"
              // onConfirm={() => this.remove(record.key)}
              getPopupContainer={() => document.getElementById('removeTagButton')}
            >
              <a>删除</a>
            </Popconfirm>
          </div>
        ),
      },
    ];



    return (
      <Fragment>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          // rowClassName={record => (record.editable ? styles.editable : '')}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          // onClick={this.newMember}
          icon="plus"
        >
          {type === 'plus' ? '新增加分项' : '新增扣分项'}
        </Button>
      </Fragment>
    );
  }


}

export default RuleList;