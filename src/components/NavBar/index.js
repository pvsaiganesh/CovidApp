import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <img
          className="logo"
          src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623916145/COVID19INDIA_nxaqfk.png"
          alt="logo"
        />
        <div className="links">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/about">
            About
          </Link>
        </div>
      </div>
    )
  }
}
export default NavBar
