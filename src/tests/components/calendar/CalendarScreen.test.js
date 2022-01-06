import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react'

import CalendarScreen from '../../../Components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../redux/types/index';
import { eventSetActive } from '../../../redux/actions/events';

jest.mock('../../../redux/actions/events', () => ({
  eventSetActive: jest.fn(),
  startEventSetEvents: jest.fn()
}))
Storage.prototype.setItem = jest.fn();

const initState = {
  calendar: {
    events: []
  },
  auth: {
    uid: ''
  },
  ui: {
    modalOpen: false
  }
};
const mockStore = configureStore([thunk]);
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
)


describe('Tests on <CalendarScreen />', () => {
  
  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('Should interact with calendar custom events', () => {
    
    const calendar = wrapper.find('Calendar');
    const calendarMessages = calendar.prop('messages')

    expect(calendarMessages).toEqual(messages)

    calendar.prop('onDoubleClickEvent')();
    expect(store.dispatch).toHaveBeenCalledWith({
      type: types.uiOpenModal
    })
    
    calendar.prop('onSelectEvent')({start: 0});
    expect(eventSetActive).toHaveBeenCalledWith({start: 0})

    act(() => {
      calendar.prop('onView')('week')
      expect(localStorage.setItem).toHaveBeenLastCalledWith("lastView", "week")
    })

  })

})