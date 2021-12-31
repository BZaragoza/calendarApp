import Swal from 'sweetalert2';

import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';
import { types } from '../types/index';

export const startLogin = (email, password) => {
  return async dispatch => {
    
    const res = await fetchWithoutToken('auth', {email, password}, 'POST')
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('tokenCreation', +new Date());

      dispatch(login({
        uid: body.uid,
        name: body.name
      }))
    } else {
      Swal.fire('Error', body.msg, 'error')
    }
  }
}

export const login = (user) => ({
  type: types.authLogin,
  payload: user
})


export const startRegister = (email, password, name) => {
  return async dispatch => {

    const res = await fetchWithoutToken('auth/new', {name, email, password}, 'POST');
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('tokenCreation', +new Date());

      dispatch(login({
        uid: body.uid,
        name: body.name
      }))
    } else {
      return Swal.fire('Error', body.msg, 'error')
    }

  }
}

export const startChecking = () => {
  return async dispatch => {

    const res = await fetchWithToken('auth/renew');
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('tokenCreation', +new Date());

      dispatch(login({
        uid: body.uid,
        name: body.name
      }))
    } else {
      dispatch(checkingFinish())
    }

  }
}

const checkingFinish = () => ({
  type: types.authCheckingFinished,
})

export const startLogout = () => {
  return dispatch => {
    localStorage.removeItem('token')
    localStorage.removeItem('tokenCreation')

    dispatch(logout())
  }
}

export const logout = () => ({
  type: types.authLogout
})