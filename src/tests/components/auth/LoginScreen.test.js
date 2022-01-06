import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { mount } from 'enzyme'
import thunk from 'redux-thunk';

import LoginScreen from '../../../Components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../redux/actions/auth';
import Swal from 'sweetalert2';

Swal.fire = jest.fn();
jest.mock('../../../redux/actions/auth', () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}))

const mockStore = configureStore([thunk]);
const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
)

describe('Tests on <LoginScreen />', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('Should call login\'s dispatch', () => {
    wrapper.find('input[name="loginEmail"]').simulate('change', {
      target: {
        name: 'loginEmail',
        value: 'brian@zaragoza.com'
      }
    })
    wrapper.find('input[name="loginPassword"]').simulate('change', {
      target: {
        name: 'loginPassword',
        value: '123456'
      }
    })

    wrapper.find('form').at(0).prop('onSubmit')({
      preventDefault(){}
    })

    expect(startLogin).toHaveBeenCalledWith('brian@zaragoza.com', '123456');
  })

  test('Shouldn\'t register if passwords don\'t match', () => {
    wrapper.find('input[name="registerPassword"]').simulate('change', {
      target: {
        name: 'registerPassword',
        value: '123456'
      }
    })
    wrapper.find('input[name="registerPassword1"]').simulate('change', {
      target: {
        name: 'registerPassword1',
        value: '654321'
      }
    })

    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault(){}
    });


    expect(startRegister).not.toHaveBeenCalledWith("esteban@gmail.com", "123456", "Esteban")
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Passwords doesn\'t match', 'error')

  })

  test('Should register with matching passwords', () => {
    wrapper.find('input[name="registerPassword"]').simulate('change', {
      target: {
        name: 'registerPassword',
        value: '123456'
      }
    })
    wrapper.find('input[name="registerPassword1"]').simulate('change', {
      target: {
        name: 'registerPassword1',
        value: '123456'
      }
    })

    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault(){}
    });


    expect(Swal.fire).not.toHaveBeenCalledWith('Error', 'Passwords doesn\'t match', 'error')
    expect(startRegister).toHaveBeenCalledWith("esteban@zaragoza.com", "123456", "Esteban")

  })

})