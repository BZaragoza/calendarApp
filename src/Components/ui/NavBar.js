import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../redux/actions/auth';
import { eventClearLogout } from '../../redux/actions/events';

const NavBar = () => {

  const dispatch = useDispatch();
  const { name } = useSelector(state => state.auth)

  const onLogout = () => {
    dispatch(startLogout())
    dispatch(eventClearLogout())
  }

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">
        {name}
      </span>

      <button onClick={onLogout} className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        <span> Salir</span>
      </button>
    </div>
  )
}

export default NavBar
