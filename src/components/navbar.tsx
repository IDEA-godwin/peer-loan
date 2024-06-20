import {NavLink} from "react-router-dom";

const Navbar = () => (
  <>
    <nav
      className="flex-none navbar navbar-vertical navbar-expand-lg navbar-light bg-transparent show vh-lg-100 px-0 py-2"
      id="sidebar"
    >
      <div className="container-fluid px-3 px-md-4 px-lg-6">
        <button
          className="navbar-toggler ms-n2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarCollapse"
          aria-controls="sidebarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand d-inline-block py-lg-1 mb-lg-5" href="/">
          <img
            src="src/assets/img/peerloans-dark-mode.svg"
            className="logo-dark h-rem-8 h-rem-md-10" alt="..."/>
          <img
            src="src/assets/img/peerloans-light-mode.svg"
            className="logo-light h-rem-8 h-rem-md-10"
            alt="..."/>
        </a>
        <div className="navbar-user d-lg-none">
          <div className="dropdown">
            <a
              className="d-flex align-items-center"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <div>
                <div
                  className="avatar avatar-sm text-bg-secondary rounded-circle"
                >
                  AE
                </div>
              </div>
              <div className="d-none d-sm-block ms-3">
                <span className="h6">Alexis</span>
              </div>
              <div className="d-none d-md-block ms-md-2">
                <i className="bi bi-chevron-down text-muted text-xs"></i></div
              >
            </a>
            <div className="dropdown-menu dropdown-menu-end">
              <div className="dropdown-header">
                  <span className="d-block text-sm text-muted mb-1"
                  >Signed in as</span
                  >
                <span className="d-block text-heading fw-semibold"
                >Alexis Enache</span
                >
              </div>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#"
              ><i className="bi bi-house me-3"></i>Home </a
              ><a className="dropdown-item" href="#"
            ><i className="bi bi-pencil me-3"></i>Edit profile</a
            >
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#"
              ><i className="bi bi-gear me-3"></i>Settings </a
              ><a className="dropdown-item" href="#"
            ><i className="bi bi-image me-3"></i>Media </a
            ><a className="dropdown-item" href="#"
            ><i className="bi bi-box-arrow-up me-3"></i>Share</a
            >
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#"
              ><i className="bi bi-person me-3"></i>Login</a
              >
            </div>
          </div>
        </div>
        <div
          className="collapse navbar-collapse overflow-x-hidden"
          id="sidebarCollapse"
        >
          <ul className="navbar-nav">
            <li className="nav-item my-1">
              <NavLink
                to={`/`}
                className={({isActive}) => [
                  isActive ? "active " : "", "nav-link d-flex align-items-center rounded-pill"
                ].join("")}
              >
                <i className="bi bi-house-fill"></i> <span>Dashboards</span>
              </NavLink>
            </li>
            <li className="nav-item my-1">
              <NavLink
                to={`/profile`}
                className={({isActive}) => [
                  isActive ? "active " : "", "nav-link d-flex align-items-center rounded-pill"
                ].join("")}
              >
                <i className="bi bi-gear-fill"></i> <span>Account</span>
              </NavLink>
            </li>
          </ul>
          <hr className="navbar-divider my-5 opacity-70"/>
          <div className="mt-auto"></div>
        </div>
      </div>
    </nav>
  </>
)

export default Navbar;