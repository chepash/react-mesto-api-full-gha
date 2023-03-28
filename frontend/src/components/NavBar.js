import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function NavBar({ loggedIn, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <nav className={`navbar ${loggedIn ? 'navbar_hidden' : ''}`}>
      {!loggedIn && (
        <>
          <NavLink
            className={({ isActive }) => `navbar__link${isActive ? ' navbar__link_hidden' : ''}`}
            to="/sign-in"
          >
            Войти
          </NavLink>
          <NavLink
            className={({ isActive }) => `navbar__link${isActive ? ' navbar__link_hidden' : ''}`}
            to="/sign-up"
          >
            Регистрация
          </NavLink>
        </>
      )}

      {loggedIn && (
        <>
          <p className="navbar__text">{currentUser.email ? currentUser.email : ''}</p>
          <button
            type="button"
            onClick={onSignOut}
            className="navbar__link button navbar__button"
          >
            Выйти
          </button>
        </>
      )}
    </nav>
  );
}

export default NavBar;
