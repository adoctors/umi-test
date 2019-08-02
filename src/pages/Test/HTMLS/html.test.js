import React from 'react';
import { mount } from 'enzyme';
import HTMLS from './HTMLS';


describe( '<HTMLS />', ()=>{

  // beforeEach(() => {
  //   jest.spyOn(console, 'error')
  //   global.console.error.mockImplementation(() => {})
  // })
  
  // afterEach(() => {
  //   global.console.error.mockRestore()
  // })

  it('renders 4 <p />', ()=>{
    const wrapper = mount(<HTMLS />);
    console.log(wrapper.find('div>div').text())
    expect(wrapper.find('p').length).toBe(4);
  } )
})