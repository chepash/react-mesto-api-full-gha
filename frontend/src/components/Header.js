import logo from '../images/header_logo.svg';
import NavBar from './NavBar';
import MobileMenu from './MobileMenu';

function Header({ loggedIn, onSignOut }) {
  return (
    <>
      {loggedIn && <MobileMenu onSignOut={onSignOut} />}

      <header className="header section">
        <img src={logo} alt="Логотип" className="header__logo" />

        <NavBar loggedIn={loggedIn} onSignOut={onSignOut} />
      </header>
    </>
  );
}

export default Header;
