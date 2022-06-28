import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Login = () => {
 //  const [userLoginData, setUserLoginData] = React.useState({username: '', password: ''})
 
    
  return (
    <div className='login'>
      <form className="login__form">
        <h2 className='login__title'>Вход</h2>
        <input type="email" className="login__input" id="logIn-form__name" name="login" placeholder="Email" required />
        <input  type="password" className="login__input" id="logIn-form__pass"  name="passwrd" placeholder="Пароль" required />
        <button type="submit" className='login__submit'>Войти</button>
      </form>
      <div className="login__signup">
          <p className="login__advice">Ещё не зарегистрированы?</p>
          <Link to="/sign-up" className="login__link">Зарегистрироваться</Link>
      </div>
    </div>
  )
}

export default withRouter(Login);