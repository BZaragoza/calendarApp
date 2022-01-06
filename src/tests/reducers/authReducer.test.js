import { authReducer } from '../../redux/reducers/authReducer';
import { login, logout } from '../../redux/actions/auth';

const initState = {
  checking: true,
  // uid: '',
  // name: '',
}

const user = {
  uid: '',
  name: '',
}

describe('Tests on uiReducer', () => {

  test('Should return initial State', () => {
    const state = authReducer(initState, {});

    expect(state).toEqual(initState);
  })

  test('Should login and logout', () => {
    const stateLogin = authReducer(initState, login(user));
    expect(stateLogin).toEqual({
      checking: false,
      ...user,
    })

    const stateLogout = authReducer(stateLogin, logout());
    expect(stateLogout).toEqual({checking: false});
  })
  

})