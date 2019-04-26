import React, { PureComponent } from 'react';
import CarouselDemo from './Demo/Demo';



class Carousel extends PureComponent {

  componentDidMount(){
    console.log('console')
  }

  render() {
    return (
      <div>
        <p>跑马灯demo演示</p>
        <CarouselDemo />
      </div>
    )
  }
}

export default Carousel;


