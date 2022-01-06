import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store';

import AppRouter from '../../Router/AppRouter'


const mockStore = configureStore([thunk]);
const initState = {
  auth: {
    checking: true
  }
};
const store = mockStore(initState);




describe('Tests on <AppRouter />', () => {

  test('Should render loading page', () => {

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    // expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h3').exists()).toBe(true)

  })
  
  test('Should render public route', () => {

    const state = {
      auth: {
        checking: false,
        uid: null,
      }
    }

    const store = mockStore(state)

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.login-container').exists()).toBe(true)

  })

  test('Should render private route', () => {

    const state = {
      calendar: {
        events: [],
      },
      ui: {
        modalOpen: false
      },
      auth: {
        checking: false,
        uid: '123',
      }
    }

    const store = mockStore(state)

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.calendar-screen').exists()).toBe(true)

  })

})