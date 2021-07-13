import {Component} from 'react'
import {Line, Bar} from 'react-chartjs-2'
import {format} from 'date-fns'

export default class StateChart extends Component {
  state = {daily: true, totalDateCountArray: []}

  componentDidMount() {
    this.renderData()
  }

  renderData = () => {
    const {data} = this.props
    const keys = Object.keys(data)
    const rawLabelsSet = []
    const confirmedArray = []
    let confirmedCount = 0
    const recoveredArray = []
    let recoveredCount = 0
    const activeArray = []
    let activeCount = 0
    const deceasedArray = []
    let deceasedCount = 0
    let testedCount = 0
    const testedArray = []
    let vaccinatedOneCount = 0
    const vaccinatedOneArray = []
    let vaccinatedTwoCount = 0
    const vaccinatedTwoArray = []
    keys.forEach(item =>
      rawLabelsSet.push(format(new Date(item), 'MMM Y').toString()),
    )
    const rawDatesSet = []
    keys.forEach(item =>
      rawDatesSet.push(format(new Date(item), 'd MMM').toString()),
    )
    const datesLabels = rawDatesSet.reverse().splice(0, 10)
    const dateCountConfirmedArray = []
    const dateCountRecoveredArray = []
    const dateCountDeceasedArray = []
    const dateCountActiveArray = []
    datesLabels.reverse().forEach(label => {
      keys.forEach(item => {
        if (format(new Date(item), 'd MMM').toString() === label) {
          if (format(new Date(item), 'y').toString() === '2021') {
            dateCountConfirmedArray.push(data[item].delta.confirmed)
            if (
              Number.isNaN(data[item].delta.deceased) ||
              data[item].delta.deceased === undefined
            ) {
              dateCountDeceasedArray.push(0)
            } else {
              dateCountDeceasedArray.push(data[item].delta.deceased)
            }
            if (
              Number.isNaN(data[item].delta.recovered) ||
              data[item].delta.recovered === undefined
            ) {
              dateCountRecoveredArray.push(0)
            } else {
              dateCountRecoveredArray.push(data[item].delta.recovered)
            }
            if (
              Number.isNaN(data[item].delta.tested) ||
              data[item].delta.tested === undefined
            ) {
              dateCountActiveArray.push(0)
            } else {
              dateCountActiveArray.push(data[item].delta.tested)
            }
          }
        }
      })
    })
    const labels = [...new Set(rawLabelsSet)]
    labels.forEach(label => {
      keys.forEach(item => {
        if (format(new Date(item), 'MMM Y').toString() === label) {
          if (
            Number.isNaN(data[item].total.deceased) ||
            data[item].total.deceased === undefined
          ) {
            deceasedCount += 0
          } else {
            deceasedCount += data[item].total.deceased
          }
          if (
            Number.isNaN(data[item].total.recovered) ||
            data[item].total.recovered === undefined
          ) {
            recoveredCount += 0
          } else {
            recoveredCount += data[item].total.recovered
          }
          if (
            (Number.isNaN(data[item].total.deceased) ||
              data[item].total.deceased === undefined) &&
            (Number.isNaN(data[item].total.recovered) ||
              data[item].total.recovered === undefined)
          ) {
            activeCount += data[item].total.confirmed
          } else if (
            Number.isNaN(data[item].total.deceased) ||
            data[item].total.deceased === undefined
          ) {
            activeCount +=
              data[item].total.confirmed - data[item].total.recovered
          } else if (
            Number.isNaN(data[item].total.recovered) ||
            data[item].total.recovered === undefined
          ) {
            activeCount +=
              data[item].total.confirmed - data[item].total.deceased
          } else {
            activeCount +=
              data[item].total.confirmed -
              data[item].total.deceased -
              data[item].total.recovered
          }
          if (
            Number.isNaN(data[item].total.tested) ||
            data[item].total.tested === undefined
          ) {
            testedCount += 0
          } else {
            testedCount += data[item].total.tested
          }
          if (
            Number.isNaN(data[item].total.vaccinated1) ||
            data[item].total.vaccinated1 === undefined
          ) {
            vaccinatedOneCount += 0
          } else {
            vaccinatedOneCount += data[item].total.vaccinated1
          }
          if (
            Number.isNaN(data[item].total.vaccinated2) ||
            data[item].total.vaccinated2 === undefined
          ) {
            vaccinatedTwoCount += 0
          } else {
            vaccinatedTwoCount += data[item].total.vaccinated2
          }

          confirmedCount += data[item].total.confirmed
        }
      })
      confirmedArray.push(confirmedCount)
      recoveredArray.push(recoveredCount)
      activeArray.push(activeCount)
      deceasedArray.push(deceasedCount)
      testedArray.push(testedCount)
      vaccinatedOneArray.push(vaccinatedOneCount)
      vaccinatedTwoArray.push(vaccinatedTwoCount)
    })
    const UltimateLineGraphArray = [
      confirmedArray,
      recoveredArray,
      activeArray,
      deceasedArray,
      testedArray,
      vaccinatedOneArray,
      vaccinatedTwoArray,
    ]
    const UltimateColorsArray = [
      '#FF073A',
      '#007BFF',
      '#27A243',
      '#6C757D',
      '#9673B9',
      '#F95581',
      '#F95581',
    ]
    const labelTexts = [
      'Confirmed',
      'Active',
      'Recovered',
      'Deceased',
      'Tested',
      'Vaccinated (One Dose)',
      'Vaccinated (Two doses) ',
    ]
    const totalDataArray = UltimateLineGraphArray.map((item, index) => ({
      labels,
      datasets: [
        {
          label: labelTexts[index],
          fill: false,
          lineTension: 0.1,
          backgroundColor: UltimateColorsArray[index],
          color: UltimateColorsArray[index],
          borderColor: UltimateColorsArray[index],
          hoverBackgroundColor: UltimateColorsArray[index],
          borderWidth: 2,
          data: item,
        },
      ],
    }))
    const UltimateBarGraphArray = [
      dateCountConfirmedArray,
      dateCountActiveArray,
      dateCountDeceasedArray,
      dateCountRecoveredArray,
    ]
    const totalDateCountArray = UltimateBarGraphArray.map((item, index) => ({
      labels: datesLabels,
      datasets: [
        {
          label: labelTexts[index],
          fill: false,
          backgroundColor: UltimateColorsArray[index],
          color: UltimateColorsArray[index],
          borderColor: UltimateColorsArray[index],
          borderWidth: 2,
          hoverBackgroundColor: UltimateColorsArray[index],
          data: item,
        },
      ],
    }))
    this.setState({
      totalDataArray,
      totalDateCountArray,
    })
  }

  getDaily = () => {
    const {daily} = this.state
    if (daily === false) {
      this.setState({daily: true})
    }
  }

  getCummulative = () => {
    const {daily} = this.state
    if (daily === true) {
      this.setState({daily: false})
    }
  }

  render() {
    const {daily, totalDataArray, totalDateCountArray} = this.state
    const UltimateText = [
      'Average Confirmed per month',
      'Average Active per month',
      'Average Recovered per month',
      'Average Deceased per month',
      'Average Tested per month',
      'Average Vaccinated(One Dose) per month',
      'Average Vaccinated (Two Doses) per month',
    ]
    const countArray = [1, 2, 3, 4, 5, 6, 7]
    return (
      <div>
        <h1 className="district-main-heading">Spread Trends</h1>
        <div className="toggles">
          <button className="btn" type="button" onClick={this.getDaily}>
            Daily
          </button>
          <button className="btn" type="button" onClick={this.getCummulative}>
            Cummulative
          </button>
        </div>
        {daily ? (
          <div>
            <p className="district-description">Daily</p>
            <div>
              {totalDateCountArray.map((item, index) => (
                <div key={countArray[index]} className="chart">
                  <Bar
                    data={item}
                    options={{
                      title: {
                        display: true,
                        text: UltimateText[index],
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: 'right',
                      },
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p className="district-description">Cummulative</p>
            {totalDataArray.map((item, index) => (
              <div key={countArray[index]} className="chart">
                <Line
                  className="chart"
                  data={item}
                  options={{
                    title: {
                      display: true,
                      text: UltimateText[index],
                      fontSize: 20,
                    },
                    legend: {
                      display: true,
                      position: 'right',
                    },
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}
