import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/test-stage">
                Markup test stage
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/desktop-test-mock">
                Test Mock Sync Dialogs Use Case
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/desktop-test">
                Desktop
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
