import {Component} from 'react'
import NavBar from '../NavBar'
import Footer from '../Footer'
import './index.css'

class About extends Component {
  state = {aboutData: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch(
      'https://api.covid19india.org/website_data.json',
    )
    const data = await response.json()
    console.log(data.faq)
    this.setState({aboutData: data.faq})
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
    return (
      <div>
        <NavBar />
        {this.renderData()}
        <Footer />
      </div>
    )
  }
}
export default About
