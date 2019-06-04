import React from 'react';
import {ThemeContext,UserContext} from './CreateContext';
import Content from './Content';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

class ContextTest03 extends React.Component {

  state = {
    name:'value'
  }


  render() {
    // const {signedInUser, theme} = this.props;

    const themes = {
      light: {
        foreground: '#000000',
        background: '#eeeeee',
      },
      dark: {
        foreground: '#ffffff',
        background: '#222222',
      },
    };

    const signedInUser = {
      name:'signedInUser'
    }

    // 提供初始 context 值的 App 组件
    return (
      <ThemeContext.Provider value={themes}>
        <UserContext.Provider value={signedInUser}>
          <p>ContextTest03  --  index</p>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

export default ContextTest03;