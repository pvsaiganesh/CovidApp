import {Component} from 'react'
import NavBar from '../NavBar'
import Footer from '../Footer'
import './index.css'

const statesNames = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    statesStats: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const options = {method: 'GET'}
    const response = await fetch(
      'https://api.covid19india.org/v4/min/data.min.json',
      options,
    )
    const data = await response.json()
    console.log(data)
    this.setState({statesStats: data})
  }

  renderIndiaStats = () => {
    const {statesStats} = this.state
    let confirmed = 0
    let deceased = 0
    let recovered = 0
    let active = 0

    const countFunction = item => {
      confirmed += statesStats[item].total.confirmed
      deceased += statesStats[item].total.deceased
      recovered += statesStats[item].total.recovered
      active += statesStats[item].total.tested
    }
    const data = Object.keys(statesStats)
    data.forEach(countFunction)
    return (
      <ul className="card-container">
        <li className="card">
          <p className="confirmed">Confirmed</p>
          <img
            className="stats-logo"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623915745/check-mark_1_tshh2r.png"
            alt="logo"
          />
          <p className="confirmed-stats">{confirmed.toLocaleString()}</p>
        </li>
        <li className="card">
          <p className="active">Active</p>
          <img
            className="stats-logo"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623915751/protection_1_vrxrqn.png"
            alt="logo"
          />
          <p className="active-stats">{active.toLocaleString()}</p>
        </li>
        <li className="card">
          <p className="recovered">Recovered</p>
          <img
            className="stats-logo"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623915741/recovered_1_hespgt.png"
            alt="logo"
          />
          <p className="recovered-stats">{recovered.toLocaleString()}</p>
        </li>
        <li className="card">
          <p className="deceased">Deceased</p>
          <img
            className="stats-logo"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623915737/breathing_1_ddam3m.png"
            alt="logo"
          />
          <p className="deceased-stats">{deceased.toLocaleString()}</p>
        </li>
      </ul>
    )
  }

  renderData = () => {
    const {statesStats} = this.state
    let count = 0
    return (
      <ul className="states-list">
        {statesNames.map(obj => {
          const stateCode = obj.state_code
          const stateName = obj.state_name
          const data = statesStats[stateCode]
          const id = `item${count}`
          count += 1

          let ans
          if (data === undefined) {
            ans = ''
          } else {
            ans = (
              <li key={id}>
                <div className="table">
                  <ul className="horizontal-list">
                    <li className="item">{stateName}</li>
                    <li className="item">
                      {data.total.confirmed.toLocaleString()}
                    </li>
                    <li className="item">
                      {data.total.tested.toLocaleString()}
                    </li>
                    <li className="item">
                      {data.total.recovered.toLocaleString()}
                    </li>
                    <li className="item">
                      {data.total.deceased.toLocaleString()}
                    </li>
                    <li className="item">
                      {data.meta.population.toLocaleString()}
                    </li>
                  </ul>
                </div>
              </li>
            )
          }
          return ans
        })}
      </ul>
    )
  }

  renderTableHeading = () => (
    <ul className="headings">
      <li className="heading">State,UT</li>
      <li className="heading">Confirmed</li>
      <li className="heading">Active</li>
      <li className="heading">Recovered</li>
      <li className="heading">Deceased</li>
      <li className="heading">Population</li>
    </ul>
  )

  renderSearch = () => {}

  render() {
    return (
      <div className="bg">
        <NavBar />
        {this.renderSearch()}
        {this.renderIndiaStats()}
        {this.renderTableHeading()}
        {this.renderData()}
        <Footer />
      </div>
    )
  }
}
export default Home
