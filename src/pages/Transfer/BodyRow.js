import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { Checkbox  } from 'antd';
const sourceSpec = {
    beginDrag(props) {
        return {
            // id: props.id,
            index: props.index
        }
    },
    // endDrag(props, monitor) {
    //  const { id: droppedId, index } = monitor.getItem()
    //  const didDrop = monitor.didDrop()
    //  debugger

    //  if (!didDrop) {
    //      props.moveCard(droppedId, index)
    //  }
    // },
}

const targetSpec = {
    // 组件下放时响应的事件
    drop(props, monitor) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
    
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }
    
        // Time to actually perform the action
        props.moveFN(dragIndex, hoverIndex);
    
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },

    // hover(props, monitor, component){}       // 组件在DropTarget上方时响应的事件
}



class BodyRow extends Component {

    render() {
        const {
            connectDragSource,
            connectDropTarget,
            id,
            item,
            index,
            checkboxOnchange,
        } = this.props;
        const style = {cursor: 'move' };
        // 实际展示出来的东西
        return connectDragSource(
            connectDropTarget(
              <p style={style}>
                <Checkbox 
                  onChange={e=>checkboxOnchange(e,index,item.name,'right')}
                  checked={item.checked}
                >{item.name}
                </Checkbox>
              </p>
              
            )
        );
    }
}

// DragSource 用于包装你需要拖动的组件，使组件能够被拖拽（make it draggable）
// DropTarget 用于包装接收拖拽元素的组件，使组件能够放置（dropped on it）
// 当 source组件的type 和 target组件的type 一致时，target组件可以接受source组件。

const DragableBody = DropTarget(
    'box',      // 拖拽类型
    targetSpec,     // 拖拽事件的方法对象
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
    }), // 把拖拽过程中需要信息注入组件的 props，接收两个参数 connect and monitor，必填。
  )(
    DragSource(
      'box',
      sourceSpec,
      (connect) => ({
        connectDragSource: connect.dragSource(),
      }),
    )(BodyRow),
  );


export default DragableBody;