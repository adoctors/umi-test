import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from "redux-mock-store";
import Mock from './Mock';

// 给定store里模块初始值，
const initProps = {
  mocks:{
    name:'test-props-name'
  }
}
const mockStore = configureMockStore();
const store = mockStore(initProps);


describe( '<Mock />', ()=>{

  // beforeEach(() => {
  //   jest.spyOn(console, 'error')
  //   global.console.error.mockImplementation(() => {})
  // })
  
  // afterEach(() => {
  //   global.console.error.mockRestore()
  // })

  it('renders 1 <p />', ()=>{
    const wrapper = mount(<Mock store={store} />);
    console.log(wrapper.find('.p1').html())
    expect(wrapper.find('.p1').length).toBe(1);
  } )
})