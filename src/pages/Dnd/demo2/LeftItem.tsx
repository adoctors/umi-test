import React from 'react';
import { useDrop } from 'react-dnd';
import { demo2Type } from './ItemTypes';

const style: React.CSSProperties = {
  height: '60px',
  width: '100%',
  marginBottom: '2px',
  color: '#000',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: '60px',
};

interface IProps {
  name: string;
  id: number;
}

const LeftItem: React.FC<IProps> = props => {
  const { name, id } = props;

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: demo2Type,
    drop: () => ({ name, }),
    hover:(item,monitor)=>{
      console.log(item,monitor)
    },
    collect: (monitor) => {
      console.log(monitor);
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  });

  const isActive = canDrop && isOver;
  let backgroundColor = '#f1f1f1';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } 

  // if (canDrop) {
  //   backgroundColor = 'darkkhaki';
  // }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {/* {isActive ? 'Release to drop' : 'Drag a box here'} */}
      {name}
    </div>
  );
};

export default LeftItem;
