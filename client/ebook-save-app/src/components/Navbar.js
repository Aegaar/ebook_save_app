import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const clickHandler = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-light bg-dark-subtle justify-content-between px-5 py-4">
      <Link to="/">
        <p className="navbar-brand">Kolekcja książek</p>
      </Link>
      <div className="d-flex flex-row ">
        {user && (
          <div>
            <span>{user.email}</span>
            <button onClick={clickHandler} className="btn btn-primary">
              Wyloguj się
            </button>
          </div>
        )}
        {!user && (
          <div className="d-flex flex-row ">
            <Link to="/logowanie">
              <p className="navbar-brand">Logowanie</p>
            </Link>
            <Link to="/rejestracja">
              <p className="navbar-brand">Rejestracja</p>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
