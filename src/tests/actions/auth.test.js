import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';

import * as fetchModule from '../../helpers/fetch';
import { startLogin, startRegister, startChecking, startLogout } from '../../redux/actions/auth';
import { types } from '../../redux/types/index';


// Setup of redux store
const mockStore = configureStore([thunk]);
const initState = {};
let store = mockStore(initState);

// Mocking of used functions
Storage.prototype.setItem = jest.fn();
Storage.prototype.removeItem = jest.fn();
Swal.fire = jest.fn();


describe('Tests on Auth actions', () => { 

  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test('successful startLogin action', async () => {
    
    await store.dispatch(startLogin('brian@zaragoza.com', '123456'));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      }
    })

    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('tokenCreation', expect.any(Number));

    // Get the arguments the jest.fn() have been called with
    // token = localStorage.setItem.mock.calls[0][1]

  })

  test('failed startLogin action', async () => {
    await store.dispatch(startLogin('db@test.com', '123456'));

    const actions = store.getActions();

    expect(actions.length).toBeFalsy();
    expect(Swal.fire).toHaveBeenCalledWith("Error", "Email or password are incorrect", "error");
  })
  
  test('successful startRegister', async () => {
    
    fetchModule.fetchWithoutToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '',
          name: '',
          token: '',
        }
      }
    }));
    
    await store.dispatch(startRegister('test@test.com', '123456', 'Test'));


    const actions = store.getActions();
   
    expect(actions[0]).toEqual({
      type: 'authLogin', 
      payload: { 
        uid: expect.any(String), 
        name: expect.any(String) 
      }
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('tokenCreation', expect.any(Number));
  })

  test('successful startChecking', async () => {

    fetchModule.fetchWithToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '',
          name: '',
          token: '',
        }
      }
    }));

    await store.dispatch(startChecking())
    
    const actions = store.getActions();
    
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      }
    })
    
    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
  });

  test('successful startLogout', async () => {
    await store.dispatch(startLogout());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogout
    })
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('tokenCreation');
  })
  

});