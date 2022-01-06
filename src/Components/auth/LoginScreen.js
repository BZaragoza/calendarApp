import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

import useForm from '../../hooks/useForm';
import { startLogin, startRegister } from '../../redux/actions/auth';

import "./login.css";


const LoginScreen = () => {

  const dispatch = useDispatch();

  const [ formLoginValues, handleLoginInputChange ] = useForm({
    loginEmail: '',
    loginPassword: '',
  });
  
  const [ formRegisterValues, handleRegiserInputChange ] = useForm({
    registerName: 'Esteban',
    registerEmail: 'esteban@zaragoza.com',
    // registerPassword: '123456',
    // registerPassword1: '123456',
  });
  
  const {loginEmail, loginPassword} = formLoginValues;
  const {registerName, registerEmail, registerPassword, registerPassword1} = formRegisterValues;


  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(startLogin(loginEmail, loginPassword))
  }

  const handleRegister = (e) => {
    e.preventDefault()

    if (registerPassword !== registerPassword1) {
      return Swal.fire('Error', 'Passwords doesn\'t match', 'error')
    }

    dispatch(startRegister(registerEmail, registerPassword, registerName));
  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="loginEmail"
                value={loginEmail}
                onChange={handleLoginInputChange}  
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="loginPassword"
                value={loginPassword}
                onChange={handleLoginInputChange}  
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Register</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="registerName"
                value={registerName}
                onChange={handleRegiserInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="registerEmail"
                value={registerEmail}
                onChange={handleRegiserInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="registerPassword"
                value={registerPassword}
                onChange={handleRegiserInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                name="registerPassword1"
                value={registerPassword1}
                onChange={handleRegiserInputChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Create acount" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;