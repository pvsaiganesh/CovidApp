import {useTheme} from '@material-ui/core/styles'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'

// Generate Sales Datas
function createData(time, cases) {
  return {time, cases}
}

const data = [
  createData('January', 800),
  createData('February', 900),
  createData('March', 1200),
  createData('April', 1500),
  createData('May', 1700),
  createData('June', 2000),
]

const legendData = [
  {name: 'something', value: 'confirmed'},
  {name: 'something1', value: 'date'},
  {name: 'something2', value: 'cases'},
]

export default function Chart() {
  const theme = useTheme()

  return (
    <>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
          className="styles"
        >
          <YAxis stroke="red" orientation="right">
            <Label
              angle={270}
              position="right"
              style={{textAnchor: 'middle', fill: theme.palette.text.primary}}
            />
          </YAxis>
          <Tooltip />
          <XAxis dataKey="time" stroke="red" className="x-axis-styles" />
          <Legend
            payload={legendData.map(item => ({
              id: item.name,
              type: 'line',
              value: item.value,
            }))}
            wrapperStyle={{margin: '5px', color: 'red'}}
            layout="vertical"
            verticalAlign="top"
            align="left"
          />
          <Line type="monotone" dataKey="cases" stroke="red" dot="true" />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}
