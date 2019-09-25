
import React from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'
import {demo2Type} from './ItemTypes'


const style: React.CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  marginBottom: '1.5rem',
  cursor: 'move',
  width:'500px',
  height:'30px',
  lineHeight: '30px',
}

interface IProps {
  name: string
}

const RightItem: React.FC<IProps> = ({ name }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: demo2Type },
    end: (item: { name: string } | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0.4 : 1

  return (
    <div ref={drag} style={{ ...style,opacity }}>
      {name}
    </div>
  )
}

export default RightItem;
