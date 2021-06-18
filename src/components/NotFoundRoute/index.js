import {Component} from 'react'
import NavBar from '../NavBar'
import './index.css'

class NotFound extends Component {
  goToHome = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="not-found-bg">
          <img
            className="not-found"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623961056/Group_7484_machmv.png"
            alt="not-found"
          />
          <h1 className="not-found-heading">PAGE NOT FOUND</h1>
          <p className="not-found-description">
            we’re sorry, the page you requested could not be found.Please go
            back to the homepage
          </p>
          <button onClick={this.goToHome} type="button" className="home-button">
            Home
          </button>
        </div>
      </div>
    )
  }
}

export default NotFound
