import React, { PureComponent, Component } from 'react';
import { Icon  } from 'antd';
import { connect } from 'dva';
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css';

import styles from  './SwiperDemo.css';

let MySwiper = null;

@connect(({ loading, }) => ({
  loading: loading.effects['form/effect'],
}))

class PageName extends PureComponent {

  state = {
    newlist:[0,1,2,3,4,5,6]
  };

  componentDidMount() {
    MySwiper = new Swiper('.swiper-container', {
      setWrapperSize :true, // 会在Wrapper上添加等于slides相加的宽或高
      watchOverflow: true,  // 当没有足够的slide切换时，例如只有1个slide，swiper会失效且隐藏导航等
      // observer:true, // 修改swiper自己或子元素时，自动初始化swiper，   非常重要
      // observeParents:true, // 修改swiper的父元素时，自动初始化swiper 
      // onSlideChangeEnd: function(swiper){ 
      //     swiper.update();   //swiper更新
      // }
      slidesPerView: 'auto',  // 设置slider容器能够同时显示的slides数量(carousel模式)
      // virtual: {
      //     slides:this.state.newlist,
      // }
    });
    console.log(MySwiper.virtualSize);      // 1100
  }

  pre = () => {
    MySwiper.slidePrev();
  }

  next = () => {
    MySwiper.slideNext();
    // 获取总宽度
    console.log(MySwiper.$wrapperEl.css('width'));    // 1100px
    console.log(MySwiper.virtualSize);      // 1100
  }

  render() {
    const { newlist } = this.state;

    const container = {
      width:300,
      height:300
    }

    return (
      <div className={styles.demoWrap}>
        <div>SwiperDemo</div>



        <div className={styles.swiperWrap}>

          <Icon type="double-left" onClick={this.pre} />
          <div className="swiper-container" style={container}>
            <div className="swiper-wrapper" style={container}>
              {
                newlist.map((item,i)=>
                  <div 
                    key={item} 
                    style={{width:i%2===0? 200 : 100,flexShrink:0,backgroundColor:i%2===0? '#2fe1a8' : '#69F',}}
                    className='swiper-slide'
                  >{item}
                  </div>)
              }
            </div>
            
          </div>

          <Icon type="double-right" onClick={this.next} />

        </div>
        
      </div>
    );
  }
}

export default PageName;