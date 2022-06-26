/*импортируем логотип*/
import logo from '../../src/images/logo.svg'

const Header = () => {
  /* возвращаемый объект */
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
    </header>
  )
}

export default Header;