import {Component} from 'react'
import NavBar from '../NavBar'
import Footer from '../Footer'
import './index.css'

class State extends Component {
  renderData = () => {
    const {searchValue, statesStats} = this.props
    return (
      <div className="value">
        <p>{searchValue}</p>
      </div>
    )
  }

  render() {
    return (
      <div className="bg">
        <NavBar />
        <div>{this.renderData()}</div>
        <Footer />
      </div>
    )
  }
}
export default State
