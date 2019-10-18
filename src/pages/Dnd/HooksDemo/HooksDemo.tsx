import React, { useState } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import Items from './Items';


const HooksDemo = props => {
  const [cardList, setCardList] = useState(['red', 'green', 'yellow', 'blue']);
  const moveFN = (dragIndex, hoverIndex) => {
    const dragRow = cardList[dragIndex];
    setCardList(
      update(cardList, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
      })
    );
  };

  return (
    <div className="App">
      {cardList.map((item, index) => (
        <Items id={item} index={index} moveFN={moveFN} key={item} />
      ))}
    </div>
  );
};

export default DragDropContext(HTML5Backend)(HooksDemo);
