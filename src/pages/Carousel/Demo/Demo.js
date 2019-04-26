import React, { PureComponent } from 'react';
import { Icon, Carousel  } from 'antd';

import styles from './Demo.less';

class CarouselDemo extends PureComponent {

  constructor(props){
    super(props);
    this.carouselDOM=React.createRef();
  }

  pre = () => {
    this.carouselDOM.current.slick.slickPrev();
  }

  next = () => {
    this.carouselDOM.current.slick.slickNext();
  }

  render() {

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2
    };


    return (
      <div className={styles.wrap}>
        <Icon type="double-left" className={styles.cp} onClick={this.pre} />
        <div className={styles.carouselWrap}>
          <Carousel {...settings} ref={this.carouselDOM}>
            <div><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
          </Carousel>
        </div>
        <Icon type="double-right" className={styles.cp} onClick={this.next} />
      </div>
      
    )
  }
}

export default CarouselDemo;


