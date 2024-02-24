import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {IoBagRemove} from 'react-icons/io5'
import {IoIosLogOut} from 'react-icons/io'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <Link to="/">
        <img
          className="header-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="nav-menu-list-mobile">
        <li>
          <Link to="/">
            <AiFillHome className="style-icon" />
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <IoBagRemove className="style-icon" />
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="logout-mobile-btn"
            onClick={onClickLogout}
          >
            {/* eslint-disable-next-line */}
            <IoIosLogOut className="style-icon" />
          </button>
        </li>
      </ul>

      <ul className="desktop-items-list">
        <Link to="/">
          <h1 className="desktop-link-name">Home</h1>
        </Link>
        <Link to="/jobs">
          <h1 className="desktop-link-name">Jobs</h1>
        </Link>
      </ul>
      <button
        type="button"
        className="logout-desktop-btn"
        onClick={onClickLogout}
      >
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
