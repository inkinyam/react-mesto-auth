import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PopupWithForm from './PopupWithForm';

const Login = () => {
  const [userLoginData, setUserLoginData] = React.useState({username: '', password: ''})

    
  return (
    <div className='login'>
      <form className="login__form">
        <h2 className='login__title'></h2>
        <input type="email" className="login__input" id="logIn-form__name" name="login" placeholder="Email" required />
        <input  type="password" className="login__input" id="logIn-form__pass"  name="passwrd" placeholder="Пароль" required />
        <input type="submit" className='login__submit'/>
        <Link className="login__link">Не зарегистрированы? Регистрация</Link>

      </form>

      
    
    </div>
  )
}

export default withRouter(Login);