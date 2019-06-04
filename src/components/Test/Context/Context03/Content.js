import React from 'react';
import {ThemeContext,UserContext} from './CreateContext';
import Child from './Child';

class Content extends React.Component {


  componentDidMount(){
    console.log(this.context,this.props)
  }

  render(){
    return (
      <div>
        <p> ContextTest03/index/Layout/Content </p>
        
        <ThemeContext.Consumer>
          {
            theme => (
              <UserContext.Consumer>
                {
                  user => (
                    <div>
                      <p>ContextTest03/index/Layout/Content/UserContext.Consumer</p>
                      <Child user={user} theme={theme} />
                    </div>
                  )
                }
              </UserContext.Consumer>
             )
          }
        </ThemeContext.Consumer>
      </div>
    )
  }
}

export default Content;