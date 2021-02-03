import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MessageApp from '../App';
import mockAxios from '../__mocks__/axios.js';

Enzyme.configure({ adapter: new Adapter() })

describe('MessageApp', () => {

  beforeEach(function(){ // setting up axios Promise mock
    //post
    mockAxios.post.mockImplementation(() =>
    Promise.resolve({ data: [] }))
    //getall
    mockAxios.get.mockImplementation(() =>
    Promise.resolve({data: [{id:1, content:'hello', date:'2000'}]}))
  
  })
  
  afterEach(function(){ // clear the axios Promise mock
    mockAxios.post.mockClear()
    mockAxios.get.mockClear()
  })

  // @testing the UI interface
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

  // @ testing axios mocks on the form component
  it('posts data and clears message box on submit success', () => {
    const component = mount(<MessageApp/>);
    component.find('textarea#message_box').simulate('change', { target: { value: 'Hello' } })
    component.find('form').simulate('submit')
    expect(mockAxios.post).toHaveBeenCalledWith("http://localhost:3001/message", {"content": "Hello"});
    expect(component.instance().refs.messageFormRef.state.currentMessage).toEqual('');
  
  });

  // @ testing GET mock axios call is made to the server
  it('Loads data from api when page loads', () => {
    mount(<MessageApp />);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });