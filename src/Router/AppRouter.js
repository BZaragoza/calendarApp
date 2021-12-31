import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { 
  BrowserRouter as Router,
  Routes,
  Route, 
  Navigate ,
} from 'react-router-dom';

import LoginScreen from '../Components/auth/LoginScreen'
import CalendarScreen from '../Components/calendar/CalendarScreen'
import PublicRoute from './PublicRoute';

import {startChecking} from '../redux/actions/auth'
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {

  const dispatch = useDispatch();
  const { checking, uid } = useSelector(state => state.auth);


  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch])

  if (checking) return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h3>Loading ...</h3>
    </div>
  )

  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<PrivateRoute isAuthenticated={!!uid}/>}>
              <Route exact path='/' element={<CalendarScreen/>}/>
            </Route>
            <Route exact path='/login' element={<PublicRoute isAuthenticated={!!uid}/>}>
              <Route exact path='/login' element={<LoginScreen/>}/>
            </Route>         
            <Route path="*" element={ <Navigate replace to="/" /> }/>
            
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default AppRouter
