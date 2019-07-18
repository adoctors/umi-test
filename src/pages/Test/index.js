import React from 'react';
import { Tabs } from 'antd';

import CounterButton from './Componment/CounterButton';
import PureComponent from './Componment/PureComponent';
import HTMLS from './HTMLS/HTMLS';

import ContextTest from '../../components/Test/Context/Context01/index';
import ContextTest02 from '../../components/Test/Context/Context02/index';
import ContextTest03 from '../../components/Test/Context/Context03/index';

import StateFromProps from '../../components/Test/StateFromProps/Index';

import Lodash from './Lodash';

import styles from './Test.less';

const { TabPane } = Tabs;
class Test extends React.Component {

  state = {
    words: ['adoctors','shanks']
  }

  handleClick = () => {
    const {words} = this.state;
    // const words = this.state.words.slice(0);     //解决方案
    words.push('tom');
    this.setState({words});
    console.log(words)
  }

  render() {
    const {words}=this.state;
    const tabList = [
      {
        name:'HTML-render',
        componment:<HTMLS />
      },
      {
        name:'ContextTest',
        componment:(
          <div>
            <p>ContextTest</p>
            <ContextTest />
            <p>ContextTest02:</p>
            <ContextTest02 />
            <p>ContextTest03:</p>
            <ContextTest03 />
          </div>
        )
      },
      {
        name:'PureComponent',
        componment:(
          <div>
            <CounterButton color="#2fe1a8" />
            <button onClick={this.handleClick}>click</button>
            <PureComponent words={words} />
          </div>
        )
      },
      {
        name:'StateFromProps',
        componment:<StateFromProps />
      },
      {
        name:'Lodash',
        componment:<Lodash />
      },
      
    ]

    return (
      <div className={styles.testWrap}>
        <Tabs defaultActiveKey="Lodash" tabPosition='top' style={{ height: 220 }}>
          {tabList.map(item => (
            <TabPane tab={item.name} key={item.name}>
              {item.componment}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default Test;
