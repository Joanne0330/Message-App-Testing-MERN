import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//flie
import MessageApp from '../App';

//mocks
import mockAxios from '../__mocks__/axios.js';
import errorMock from '../__mocks__/error.json'
import mockMessages from '../__mocks__/messages.json'

Enzyme.configure({ adapter: new Adapter() })

describe('MessageApp', () => {

  beforeEach(function(){ // setting up axios Promise mock
    //post
    mockAxios.post.mockImplementation(() =>
    Promise.resolve({ data: [] }))
    //getall
    mockAxios.get.mockImplementation(() =>
    Promise.resolve({ data: mockMessages }))
    //delete
    mockAxios.delete.mockImplementation(() =>
    Promise.resolve({ data: [] }));
    //update
    mockAxios.put.mockImplementation(() =>
    Promise.resolve({ data: [] }));
  
  })
  
  afterEach(function(){ // clear the axios Promise mock
    mockAxios.post.mockClear()
    mockAxios.get.mockClear()
    mockAxios.delete.mockClear()
    mockAxios.put.mockClear()
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
  
  // @ This test does not work - Method 'childAt' is meant to be run on 1 node 0 found instead.
  
  it('removes message on delete', async () => {
      const component = await mount(<MessageApp/>);
      await component.update()
      await component.find('ul#message_list').childAt(0).find('#delete').simulate('click');
      await component.update()
      expect(mockAxios.delete).toHaveBeenCalledWith("http://localhost:3001/delete/1", {"id": 1})
    });

    it('updates message on update', async () => {
      const component = await mount(<MessageApp/>);
      await component.update()
      await component.find('ul#message_list').childAt(0).find('#update').simulate('click')
      expect(component.find('ul#message_list').childAt(0).find('#send').text()).toBe('Send Update')
      component.find('ul#message_list').childAt(0).find('#send').simulate('click')
      expect(mockAxios.put).toHaveBeenCalledWith("http://localhost:3001/update/1", {"content": "Hello"});
      expect(component.find('textarea').text()).toEqual('');
    });
    
    // it.only('updates message on update', async () => {
    //   const component = await mount(<MessageApp/>);
    //   await component.update()
    //   await component.find('ul#message_list').childAt(0).find('#update').simulate('click')
    //   expect(component.find('ul#message_list').childAt(0).find('#send').text()).toBe('Send Update')
    //   component.find('textarea#updateBox').simulate('change', { target: { value: 'Hey' } })
    //   expect(component.find('textarea#updateBox').text()).toEqual('Hey');
    //   expect(component.instance().refs.messageListRef.state.editMode.content).toEqual('Hey');
    //   component.find('ul#message_list').childAt(0).find('#send').simulate('click')
    //   expect(mockAxios.put).toHaveBeenCalledWith("http://localhost:3001/update/1", {"content": "Hey"});
    //   expect(component.find('ul#message_list').childAt(0).find('#update').text()).toBe('Update')
    //   expect(component.instance().refs.messageListRef.state.editMode.content).toEqual(null);
    // });
    
    
    
    
    
    // @ testing errors
    describe('MessageApp erroring', () => {
      
      beforeEach(function(){
        //post
        mockAxios.post.mockImplementation(() =>
        Promise.reject(errorMock));
        //get
        mockAxios.get.mockImplementation(() =>
        Promise.reject(errorMock));
      })
      
      afterEach(function(){
        mockAxios.post.mockClear()
        mockAxios.get.mockClear()
      })
      
      it('loads err on GET err', async() => {
        const component = await mount(<MessageApp/>);
        await component.update()
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(component.state().error).toEqual({"response": {"data": "error text from json mock"}});
        expect(component.find('#error').text()).toBe('Error: error text from json mock');
      });
      
      it('loads err on Post err', async () => {
        const component = mount(<MessageApp/>);
        component.find('textarea#message_box').simulate('change', { target: { value: 'bad string' } })
        await component.find('form').simulate('submit')
        await component.update()
        expect(mockAxios.post).toHaveBeenCalledTimes(1)
        expect(component.state().error).toEqual({"response": {"data": "error text from json mock"}});
        expect(component.find('#error').text()).toBe('Error: error text from json mock');
      });
      
    })
})