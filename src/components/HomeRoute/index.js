import {useState, useEffect} from 'react'
import {BsSearch} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import NavBar from '../NavBar'
import Footer from '../Footer'
import './index.css'

const names = [
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

const Home = () => {
  const apiConsts = {
    initial: 'INITIAL',
    inProgress: 'INPROGRESS',
    failure: 'FAILURE',
    success: 'SUCCESS',
  }
  const [statesStats, setStatesStats] = useState([])
  const [globalData, setGlobalData] = useState([])
  const [loader, setLoader] = useState(true)
  const [reverse, setReverse] = useState(false)
  const [stateNames, setStateNames] = useState(names)
  const [apiStatus, setApiStatus] = useState(apiConsts.initial)

  const getData = async () => {
    const response = await fetch(
      'https://data.covid19india.org/v4/min/data.min.json',
    )
    const res = await response.json()
    if (response.ok) {
      setStatesStats(res)
      setApiStatus(apiConsts.success)
    } else {
      setApiStatus(apiConsts.failure)
    }
  }

  useEffect(() => {
    setApiStatus(apiConsts.inProgress)
    getData()
  }, [])
  const renderIndiaStats = () => {
    let confirmed = 0
    let deceased = 0
    let recovered = 0
    const countFunction = item => {
      confirmed += statesStats[item].total.confirmed
      deceased += statesStats[item].total.deceased
      recovered += statesStats[item].total.recovered
    }
    Object.keys(statesStats).forEach(countFunction)
    const active = recovered + deceased
    return (
      <ul className="card-container">
        <li testid="countryWideConfirmedCases" className="card conf">
          <p className="confirmed-class">Confirmed</p>
          <img
            className="stats-logo"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623915745/check-mark_1_tshh2r.png"
            alt="country wide confirmed cases pic"
          />
          <p className="confirmed-stats">{confirmed.toLocaleString()}</p>
        </li>
        <li testid="countryWideActiveCases" className="card acti">
          <p className="active-class">Active</p>
          <img
            className="stats-logo"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623915751/protection_1_vrxrqn.png"
            alt="country wide active cases pic"
          />
          <p className="active-stats">{active.toLocaleString()}</p>
        </li>
        <li testid="countryWideRecoveredCases" className="card reco">
          <p className="recovered-class">Recovered</p>
          <img
            className="stats-logo"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623915741/recovered_1_hespgt.png"
            alt="country wide recovered cases pic"
          />
          <p className="recovered-stats">{recovered.toLocaleString()}</p>
        </li>
        <li testid="countryWideDeceasedCases" className="card dece">
          <p className="deceased-class">Deceased</p>
          <img
            className="stats-logo"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623915737/breathing_1_ddam3m.png"
            alt="country wide deceased cases pic"
          />
          <p className="deceased-stats">{deceased.toLocaleString()}</p>
        </li>
      </ul>
    )
  }

  const makeReverse = () => {
    if (reverse === false) {
      const ans = stateNames.reverse()
      setStateNames(ans)
      setReverse(true)
    }
  }

  const makeNormal = () => {
    if (reverse === true) {
      const ans = stateNames.reverse()
      setStateNames(ans)
      setReverse(false)
    }
  }

  const renderData = () => {
    let count = 0
    return (
      <div className="table-scroll">
        <table testid="stateWiseCovidDataTable" className="states-list">
          <thead className="white">
            <tr>
              <th>
                State,UT
                <button
                  type="button"
                  onClick={() => {
                    makeNormal()
                  }}
                  className="sort"
                  alt="sort"
                >
                  <FcGenericSortingAsc />
                </button>
                <button
                  onClick={() => {
                    makeReverse()
                  }}
                  className="sort"
                  type="button"
                  alt="sort"
                >
                  <FcGenericSortingDesc />
                </button>
              </th>
              <th>Confirmed</th>
              <th className="hide">Active</th>
              <th className="hide">Recovered</th>
              <th className="hide">Deceased</th>
              <th className="hide">Population</th>
            </tr>
          </thead>
          <tbody>
            {stateNames.map(obj => {
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
                    <td className="item blue hide">
                      {active.toLocaleString()}
                    </td>
                    <td className="item green hide">
                      {data.total.recovered.toLocaleString()}
                    </td>
                    <td className="item gray hide">
                      {data.total.deceased.toLocaleString()}
                    </td>
                    <td className="item hide">
                      {data.meta.population.toLocaleString()}
                    </td>
                  </tr>
                )
              }
              return ans
            })}
          </tbody>
        </table>
      </div>
    )
  }

  const getFilteredData = event => {
    const searchValue = event.target.value
    const filteredData = stateNames.filter(item => {
      let ans
      if (item.state_name.toLowerCase().includes(searchValue.toLowerCase())) {
        ans = item
      }
      return ans
    })
    setGlobalData(filteredData)
  }

  const renderSearchList = () => {
    let count = 0
    return (
      <ul testid="searchResultsUnorderedList" className="search-list">
        {globalData.map(item => {
          count += 1
          return (
            <Link
              key={`listItem${count}`}
              className="states-link"
              to={`/state/${item.state_code}`}
            >
              <li className="search-item">
                <p className="state-name">{item.state_name}</p>
                <p className="state-code">
                  {item.state_code}
                  <BiChevronRightSquare className="arrow-color" />
                </p>
              </li>
            </Link>
          )
        })}
      </ul>
    )
  }

  const renderSearch = () => (
    <div className="search">
      <BsSearch className="search-icon" />
      <input
        // onClick={() => {
        //   handleChange()
        // }}
        onChange={e => {
          getFilteredData(e)
        }}
        className="search-box"
        placeholder="Enter the State"
        type="search"
      />
    </div>
  )

  const renderView = () => {
    switch (apiStatus) {
      case apiConsts.inProgress:
        return (
          <div testid="homeRouteLoader" className="loader-bg">
            <Loader
              testid="homeRouteLoader"
              type="TailSpin"
              color="#007BFF"
              height={50}
              width={50}
            />
          </div>
        )
      case apiConsts.success:
        return (
          <div className="bg">
            {renderSearch()}
            <div>{renderSearchList()}</div>
            <div>
              <div>
                {renderIndiaStats()}
                <div className="to-center">{renderData()}</div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div>
      <NavBar />
      {renderView()}
      <Footer />
    </div>
  )
}
export default Home
