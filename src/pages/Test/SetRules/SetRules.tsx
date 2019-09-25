import React from 'react';
import { connect } from 'dva';
import { Card, Button, Form, Icon, Col, Row, Input, Popover, message } from 'antd';
import { ConnectProps } from '@/models/connect';
import RuleList from './RuleList';
import styles from './SetRules.less';

interface IProps extends ConnectProps {
  [key: string]: any
}

interface IState {}

const fieldLabels = {
  baseScore: '基准分',
  qualifiedScore: '合格分',
  status: '状态',
};


// @ts-ignore
@Form.create()
@connect(({ tests }) => ({
  RuleGroup: tests.RuleGroup,
  allRules: tests.allRules,
}))


class SetRules extends React.Component<IProps,IState>{
  state = {

  }

  componentDidMount(){
    this.init();
  }

  init = (): void => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tests/getRuleGroup',
      payload: {
        apiName: 'getRuleGroup',
        reqType: 'GET',
        queryData: {
          id: 'ruleId'
        },
      },
      successCallback: (res) => {
        console.log(res)
      },
    });

    dispatch({
      type: 'tests/getAllRules',
      payload: {
        apiName: 'getAllRules',
        reqType: 'GET',
      },
      successCallback: (res) => {
        console.log(res)
      },
    });
  }

  




  render(){
    const { form: { getFieldDecorator, getFieldsValue }, RuleGroup, } = this.props;

    // console.log(getFieldsValue('minusRules'))
    console.log('setRules-minusRules',getFieldsValue(['minusRules']))

    const plusRuleTable =
      (RuleGroup.goodRules &&
        RuleGroup.goodRules.map((rule, index) => ({
          key: index + 1,
          ruleId: rule.ruleId,
          score: rule.score,
          name: rule.ruleName,
        }))) ||
      [];

    const minusRuleTable =
      (RuleGroup.badRules &&
        RuleGroup.badRules.map((rule, index) => ({
          key: index + 1,
          ruleId: rule.ruleId,
          score: rule.score,
          name: rule.ruleName,
        }))) ||
      [];


    return (
      <div className={styles.SetRulesWrap}>
        <div className={styles.header}>
          <span className={styles.name}>{RuleGroup.name}</span>
          <div>
            <Button style={{marginRight: 10}}>取消</Button>
            <Button type="primary">保存</Button>
          </div>
        </div>
        <div className={styles.conWrap}>
          <Form  hideRequiredMark>
            <Row className={styles.ruleRow}>
              <Col>
                <Form.Item label={fieldLabels.baseScore}>
                  {getFieldDecorator('baseScore', {
                    rules: [{ required: true, message: '请输入基准分' }],
                    initialValue: RuleGroup.benchmarkScore || 0,
                  })(<Input placeholder="请输入输入基准分" />)}
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label={fieldLabels.qualifiedScore}>
                  {getFieldDecorator('qualifiedScore', {
                    rules: [{ required: true, message: '请输入合格分' }],
                    initialValue: RuleGroup.qualifiedScore || 0,
                  })(<Input placeholder="请输入输入合格分" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          
          <Card title="加分规则" bordered={false}>
            {getFieldDecorator('plusRules', {
              initialValue: plusRuleTable,
            })(<RuleList type="plus" />)}
          </Card>
          <Card title="扣分规则" bordered={false}>
            {getFieldDecorator('minusRules', {
              initialValue: minusRuleTable,
            })(<RuleList type="minus" />)}
          </Card>


        </div>
      </div>
    )
  }
}

export default SetRules;
