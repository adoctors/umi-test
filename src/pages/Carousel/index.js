import React, { PureComponent } from 'react';
import CarouselDemo from './Demo/Demo';
import SwiperDemo from './SwiperDemo/SwiperDemo';



class Carousel extends PureComponent {

  componentDidMount(){
    console.log('console')
  }

  render() {
    return (
      <div>
        <p>跑马灯demo演示</p>
        <CarouselDemo />
        <SwiperDemo />
      </div>
    )
  }
}

export default Carousel;


