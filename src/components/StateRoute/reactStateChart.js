import {Component} from 'react'
import {Line} from 'react-chartjs-2'

export default class StateChart extends Component {
  state = {totalData: {}, totalData1: {}, totalData2: {}, totalData3: {}}

  componentDidMount() {
    this.renderData()
  }

  renderData = () => {
    const {data} = this.props
    const keys = Object.keys(data)
    const labels = []
    const requiredData = []
    const requiredData1 = []
    const requiredData2 = []
    const requiredData3 = []
    keys.forEach(item => {
      labels.push(item)
      requiredData.push(data[item].total.confirmed)
      requiredData1.push(
        data[item].total.confirmed -
          data[item].total.deceased -
          data[item].total.recovered,
      )
      requiredData2.push(data[item].total.recovered)
      requiredData3.push(data[item].total.deceased)
    })
    const totalData = {
      labels,
      datasets: [
        {
          label: 'Confirmed Cases',
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#FF073A',
          color: '#FF073A',
          borderColor: '#FF073A',
          borderWidth: 2,
          data: requiredData,
        },
      ],
    }
    const totalData1 = {
      labels,
      datasets: [
        {
          label: 'Active Cases',
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#007BFF',
          color: '#007BFF',
          borderColor: '#007BFF',
          borderWidth: 2,
          data: requiredData1,
        },
      ],
    }

    const totalData2 = {
      labels,
      datasets: [
        {
          label: 'Recovered Cases',
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#27A243',
          color: '#27A243',
          borderColor: '#27A243',
          borderWidth: 2,
          data: requiredData2,
        },
      ],
    }

    const totalData3 = {
      labels,
      datasets: [
        {
          label: 'Deceased Cases',
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#6C757D',
          color: '#6C757D',
          borderColor: '#6C757D',
          borderWidth: 2,
          data: requiredData3,
        },
      ],
    }

    this.setState({totalData, totalData1, totalData2, totalData3})
  }

  render() {
    const {totalData, totalData1, totalData2, totalData3} = this.state
    console.log(totalData)
    return (
      <div>
        <div className="chart">
          <Line
            data={totalData}
            options={{
              title: {
                display: true,
                text: 'Average Rainfall per month',
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'right',
              },
            }}
          />
        </div>
        <div className="chart">
          <Line
            data={totalData1}
            options={{
              title: {
                display: true,
                text: 'Average Rainfall per month',
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'right',
              },
            }}
          />
        </div>
        <div className="chart">
          <Line
            data={totalData2}
            options={{
              title: {
                display: true,
                text: 'Average Rainfall per month',
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'right',
              },
            }}
          />
        </div>
        <div className="chart">
          <Line
            data={totalData3}
            options={{
              title: {
                display: true,
                text: 'Average Rainfall per month',
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'right',
              },
            }}
          />
        </div>
      </div>
    )
  }
}
