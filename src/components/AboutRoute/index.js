import {Component} from 'react'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import Footer from '../Footer'
import './index.css'

class About extends Component {
  state = {aboutData: [], loader: true}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch(
      'https://api.covid19india.org/website_data.json',
    )
    const data = await response.json()
    this.setState({aboutData: data.faq, loader: false})
  }

  renderData = () => {
    const {aboutData} = this.state
    return (
      <div className="about">
        <h1 className="heading-about">About</h1>
        {aboutData.map(item => (
          <div key={item.qno}>
            <p className="question">{item.question}</p>
            <p className="answer">{item.answer}</p>
          </div>
        ))}
      </div>
    )
  }

  render() {
    const {loader} = this.state
    return (
      <div className="bg">
        {loader ? (
          <div className="loader-bg">
            <Loader type="TailSpin" color="#007BFF" height={80} width={80} />
          </div>
        ) : (
          <div>
            <NavBar />
            {this.renderData()}
            <Footer />
          </div>
        )}
      </div>
    )
  }
}
export default About
