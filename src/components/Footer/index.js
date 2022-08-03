import {Component} from 'react'
import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <img
          src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623916145/COVID19INDIA_nxaqfk.png"
          alt="footer-logo"
        />
        <p className="footer-para">
          we stand with everyone fighting on the frontlines
        </p>
        <div className="social-links">
          <VscGithubAlt className="social-link" />
          <FiInstagram className="social-link" />
          <FaTwitter className="social-link" />
        </div>
      </div>
    )
  }
}
export default Footer
