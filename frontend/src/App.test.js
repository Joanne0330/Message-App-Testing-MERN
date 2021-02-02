import React from 'react';
import MessageApp from './App';



import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('MessageApp', () => {
  it('renders without crashing', () => {
    const component = shallow(<MessageApp />);
    expect(component).toMatchSnapshot();
  })

  it('has a textbox', () => {
    const component = mount(<MessageApp />);
    expect(component.exists('textarea#message_box')).toBe(true)
  })

  it('has a button', () => {
    const component = mount(<MessageApp />);
    expect(component.exists('button#submit')).toBe(true)

  })
  
  it('has message list', () => {
    const component = mount(<MessageApp />);
    expect(component.exists('ul#message_list')).toBe(true)
  })
})
