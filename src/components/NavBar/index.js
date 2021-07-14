import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {AiOutlineHome} from 'react-icons/ai'
import {FaInfo} from 'react-icons/fa'
import './index.css'

class NavBar extends Component {
  state = {clicked: false}

  goToHome = () => {
    this.setState({clicked: true})
  }

  render() {
    const {clicked} = this.state
    return (
      <div>
        <div className="navbar">
          <img
            onClick={this.goToHome}
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
          {clicked ? <Redirect to="/" /> : ''}
        </div>
        <div className="mobile-links">
          <img
            onClick={this.goToHome}
            className="logo"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623916145/COVID19INDIA_nxaqfk.png"
            alt="logo"
          />
          <Link className="link" to="/">
            <AiOutlineHome className="menu-icon white" />
          </Link>
          <Link className="link" to="/about">
            <FaInfo className="menu-icon white" />
          </Link>
        </div>
      </div>
    )
  }
}
export default NavBar
