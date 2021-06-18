import {Component} from 'react'
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
          <img
            className="social-logo"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623916625/Vector_2_ldzbuv.png"
            alt="social-logo"
          />
          <img
            className="social-logo"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623916633/instagram_tzxkem.png"
            alt="social-logo"
          />

          <img
            className="social-logo"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623916638/Twitter_bird_logo_2012_1_g8bpvs.png"
            alt="social-logo"
          />
        </div>
      </div>
    )
  }
}
export default Footer
