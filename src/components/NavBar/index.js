import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import './index.css'

class NavBar extends Component {
  state = {clicked: false}

  goToHome = () => {
    this.setState({clicked: true})
  }

  render() {
    const {clicked} = this.state
    return (
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
    )
  }
}
export default NavBar
