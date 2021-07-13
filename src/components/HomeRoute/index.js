import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import NavBar from '../NavBar'
import Footer from '../Footer'
import './index.css'

class Home extends Component {
  state = {
    statesStats: [],
    data: [],
    loader: true,
    reverse: false,
    statesNames: [
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
    ],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch(
      'https://api.covid19india.org/v4/min/data.min.json',
    )
    const data = await response.json()
    console.log(data)
    this.setState({statesStats: data, loader: false})
  }

  renderIndiaStats = () => {
    const {statesStats} = this.state
    let confirmed = 0
    let deceased = 0
    let recovered = 0
    const countFunction = item => {
      confirmed += statesStats[item].total.confirmed
      deceased += statesStats[item].total.deceased
      recovered += statesStats[item].total.recovered
    }
    const data = Object.keys(statesStats)
    data.forEach(countFunction)
    const active = confirmed - recovered - deceased
    return (
      <ul className="card-container">
        <li className="card conf">
          <p className="confirmed-class">Confirmed</p>
          <img
            className="stats-logo"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623915745/check-mark_1_tshh2r.png"
            alt="logo"
          />
          <p className="confirmed-stats">{confirmed.toLocaleString()}</p>
        </li>
        <li className="card acti">
          <p className="active-class">Active</p>
          <img
            className="stats-logo"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623915751/protection_1_vrxrqn.png"
            alt="logo"
          />
          <p className="active-stats">{active.toLocaleString()}</p>
        </li>
        <li className="card reco">
          <p className="recovered-class">Recovered</p>
          <img
            className="stats-logo"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623915741/recovered_1_hespgt.png"
            alt="logo"
          />
          <p className="recovered-stats">{recovered.toLocaleString()}</p>
        </li>
        <li className="card dece">
          <p className="deceased-class">Deceased</p>
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
    const {statesStats, statesNames} = this.state
    let count = 0
    return (
      <table className="states-list">
        <thead className="white">
          <tr>
            <th>
              State,UT
              <img
                onClick={this.makeNormal}
                className="sort"
                src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1624207432/sort_txpoob.png"
                alt="sort"
              />
              <img
                onClick={this.makeReverse}
                className="sort"
                src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1624207377/sort_ztkfw2.png"
                alt="sort"
              />
            </th>
            <th>Confirmed</th>
            <th>Active</th>
            <th>Recovered</th>
            <th>Deceased</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {statesNames.map(obj => {
            const stateCode = obj.state_code
            const stateName = obj.state_name
            const data = statesStats[stateCode]
            const id = `item${count}`
            count += 1

            let ans
            if (data === undefined) {
              ans = <tr />
            } else {
              const active =
                data.total.confirmed -
                data.total.recovered -
                data.total.deceased
              ans = (
                <tr key={id}>
                  <td className="item left">{stateName}</td>
                  <td className="item red">
                    {data.total.confirmed.toLocaleString()}
                  </td>
                  <td className="item blue">{active.toLocaleString()}</td>
                  <td className="item green">
                    {data.total.recovered.toLocaleString()}
                  </td>
                  <td className="item gray">
                    {data.total.deceased.toLocaleString()}
                  </td>
                  <td className="item">
                    {data.meta.population.toLocaleString()}
                  </td>
                </tr>
              )
            }
            return ans
          })}
        </tbody>
      </table>
    )
  }

  makeReverse = () => {
    const {statesNames, reverse} = this.state
    if (reverse === false) {
      const ans = statesNames.reverse()
      this.setState({statesNames: ans, reverse: true})
    }
  }

  makeNormal = () => {
    const {statesNames, reverse} = this.state
    if (reverse === true) {
      const ans = statesNames.reverse()
      this.setState({statesNames: ans, reverse: false})
    }
  }

  getFilteredData = event => {
    const {statesNames} = this.state
    const searchValue = event.target.value
    const filteredData = statesNames.filter(item => {
      let ans
      if (item.state_name.toLowerCase().includes(searchValue.toLowerCase())) {
        ans = item
      }
      return ans
    })
    this.setState({data: filteredData})
  }

  renderSearchList = () => {
    const {data} = this.state
    let count = 0
    return (
      <ul className="search-list">
        {data.map(item => {
          count += 1
          return (
            <Link
              key={`listItem${count}`}
              className="states-link"
              to={`/state/${item.state_code}`}
            >
              <li className="search-item">
                <p className="state-name">{item.state_name}</p>
                <p className="state-code">{item.state_code}</p>
              </li>
            </Link>
          )
        })}
      </ul>
    )
  }

  renderSearch = () => (
    <div className="search">
      <input
        onClick={this.handleChange}
        onChange={this.getFilteredData}
        className="search-box"
        placeholder="Enter the State"
        type="search"
      />
    </div>
  )

  render() {
    const {loader} = this.state
    return (
      <div>
        {loader ? (
          <div>
            <NavBar />
            <div className="loader-bg">
              <Loader type="TailSpin" color="#007BFF" height={50} width={50} />
            </div>
          </div>
        ) : (
          <div className="bg">
            <NavBar />
            {this.renderSearch()}
            <div>{this.renderSearchList()}</div>
            <div>
              <div>
                {this.renderIndiaStats()}
                <div className="to-center">{this.renderData()}</div>
              </div>
            </div>
            <Footer />
          </div>
        )}
      </div>
    )
  }
}
export default Home
