import {Component} from 'react'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import Footer from '../Footer'
import StateChart from './reactStateChart'
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

class State extends Component {
  state = {stats: {}, stateCode: '', value: 'confirmed', data: {}, loader: true}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {code} = params
    const response = await fetch(
      'https://data.covid19india.org/v4/min/data.min.json',
    )
    const totalData = await response.json()
    const data = totalData[code]
    const response1 = await fetch(
      `https://data.covid19india.org/v4/min/timeseries-${code}.min.json`,
    )
    const data1 = await response1.json()
    this.setState({
      stats: data.total,
      data,
      timelineData: data1[code].dates,
      stateCode: code,
      loader: false,
    })
  }

  renderStatsBar = () => {
    const {stats} = this.state
    const keys = Object.keys(stats)
    if (keys.length === 0) {
      return ''
    }
    const getId = event => {
      this.setState({value: event.target.id}, this.renderTopDistricts)
    }
    const active = stats.confirmed - stats.recovered - stats.deceased

    return (
      <div className="card-container">
        <button
          type="button"
          onClick={getId}
          id="confirmed"
          className="card conf"
        >
          <p className="confirmed-class">Confirmed</p>
          <img
            className="stats-logo"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623915745/check-mark_1_tshh2r.png"
            alt="logo"
          />
          <p className="confirmed-stats">{stats.confirmed.toLocaleString()}</p>
        </button>
        <button type="button" onClick={getId} id="active" className="card acti">
          <p className="active-class">Active</p>
          <img
            className="stats-logo"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623915751/protection_1_vrxrqn.png"
            alt="logo"
          />
          <p className="active-stats">{active.toLocaleString()}</p>
        </button>
        <button
          type="button"
          onClick={getId}
          id="recovered"
          className="card reco"
        >
          <p className="recovered-class">Recovered</p>
          <img
            className="stats-logo"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623915741/recovered_1_hespgt.png"
            alt="logo"
          />
          <p className="recovered-stats">{stats.recovered.toLocaleString()}</p>
        </button>
        <button
          type="button"
          onClick={getId}
          id="deceased"
          className="card dece"
        >
          <p className="deceased-class">Deceased</p>
          <img
            className="stats-logo"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623915737/breathing_1_ddam3m.png"
            alt="logo"
          />
          <p className="deceased-stats">{stats.deceased.toLocaleString()}</p>
        </button>
      </div>
    )
  }

  renderTopBar = () => {
    const {data, stateCode} = this.state
    const keys = Object.keys(data)
    if (keys.length === 0) {
      return ''
    }
    const name = statesNames.filter(item => item.state_code === stateCode)
    const date = new Date(data.meta.date).toDateString()
    return (
      <div className="top-bar">
        <div className="state-main-heading">
          <h1 className="top-bar-heading">{name[0].state_name}</h1>
          <p className="date">{`Last update on ${date}.`}</p>
        </div>
        <div className="tested">
          <p className="tested-name">Tested</p>
          <p className="tested-count">{data.total.tested.toLocaleString()}</p>
        </div>
      </div>
    )
  }

  renderTopDistricts = () => {
    const {data, value} = this.state
    let allCSS = 'red'
    if (value === 'confirmed') {
      allCSS = 'red'
    } else if (value === 'active') {
      allCSS = 'blue'
    } else if (value === 'recovered') {
      allCSS = 'green'
    } else if (value === 'deceased') {
      allCSS = 'gray'
    }
    const keys = Object.keys(data)
    if (data.length === {} || keys.length === 0 || data === undefined) {
      return ''
    }
    const districtKeys = Object.keys(data.districts)
    let id = 0
    const countArray = districtKeys.map(item => {
      let num
      if (value === 'confirmed') {
        num = data.districts[item].total.confirmed
      } else if (value === 'active') {
        num = data.districts[item].total.active
      } else if (value === 'recovered') {
        num = data.districts[item].total.recovered
      } else if (value === 'deceased') {
        num = data.districts[item].total.deceased
      }
      if (Number.isNaN(num) || num === undefined) {
        num = 0
      }
      return {item, count: num}
    })
    countArray.sort((a, b) => b.count - a.count)
    id = 0
    return (
      <div>
        <h1 className={`district-main-heading ${allCSS}`}>Top Districts</h1>

        <div className="district-list">
          {countArray.map(obj => {
            id += 1
            let c = obj.count
            if (c === 0) {
              c = 'No Data'
            }
            return (
              <div key={id} className={`district-container ${allCSS}`}>
                <p className="district-count conf">{c.toLocaleString()}</p>
                <p className="district-heading">{obj.item}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  render() {
    const {loader, timelineData} = this.state
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
          <div className="bg-state">
            <NavBar />
            <div>{this.renderTopBar()}</div>
            <div>{this.renderStatsBar()}</div>
            <div>{this.renderTopDistricts()}</div>
            <div>
              <StateChart data={timelineData} />
            </div>
            <Footer />
          </div>
        )}
      </div>
    )
  }
}
export default State
