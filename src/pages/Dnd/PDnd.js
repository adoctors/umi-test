import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper';
import PBodyRow from './PBodyRow';



class PDnd extends Component {
    state = {
      cardList: ['red', 'green', 'yellow', 'blue']
    }

    moveFN =(dragIndex, hoverIndex)=> {
      const { cardList } = this.state;
      const dragRow = cardList[dragIndex];
      this.setState(
        update(this.state, {
          cardList: {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
          },
        }),
      );
    }


    render() {
        let { cardList } = this.state;
        return (
          <DragDropContextProvider backend={HTML5Backend}>
            <div className="App">
              {cardList.map((item, index) => 
                <PBodyRow
                  id={item}
                  index={index}
                  moveFN={this.moveFN}
                  key={item} 
                />
              )}
            </div>
          </DragDropContextProvider>
        );
    }
}

export default PDnd;
