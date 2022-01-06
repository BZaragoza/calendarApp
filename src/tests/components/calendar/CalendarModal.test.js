import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

import CalendarModal from '../../../Components/calendar/CalendarModal';
import { startEventUpdate, eventClearActive, startEventAddNew } from '../../../redux/actions/events';


jest.mock('../../../redux/actions/events', () => ({
  startEventUpdate: jest.fn(),
  eventClearActive: jest.fn(),
  startEventAddNew: jest.fn(),
}))
Swal.fire = jest.fn();


const initState = {
  calendar: {
    events: [],
    activeEvent: {
      title: 'Simón',
      notes: "",
      start: 0,
      end: 1,
    }
  },
  auth: {
    uid: '',
    name: ''
  },
  ui: {
    modalOpen: true
  }
};

const mockStore = configureStore([thunk]);
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
)

describe('Tests on <CalendarModal />', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should render correctly', () => {
    // expect(wrapper.find('.modal').exists()).toBe(true);
    expect(wrapper.find('Modal').prop('isOpen')).toBeTruthy()
  })

  test('Should call update action and close modal', () => {

    wrapper.find('form').simulate('submit', {
      preventDefault() {}
    })

    expect(startEventUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent)

    expect(eventClearActive).toHaveBeenCalled()

  })

  test('Should show an error if title is not valid', () => {
    
    wrapper.find('form').simulate('submit', {
      preventDefault() {}
    })

    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true)

  })

  test('Should create a new event', () => {
    const initState = {
      calendar: {
        events: [],
        activeEvent: null
      },
      auth: {
        uid: '',
        name: ''
      },
      ui: {
        modalOpen: true
      }
    };

    const store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    )

    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Test Title'
      }
    }) 
    
    wrapper.find('form').simulate('submit', {
      preventDefault() {}
    })

    expect(startEventAddNew).toHaveBeenCalledWith({
      end: expect.anything(),
      notes: expect.any(String), 
      start: expect.anything(),
      title: 'Test Title'
    })

    expect(eventClearActive).toHaveBeenCalled()

  })


  test('Should validate dates', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Test Title'
      }
    }) 

    const today = new Date();

    act(() => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(today);
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {}
    });

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'End date must be after start date', 'error')

  })
  
  

})
