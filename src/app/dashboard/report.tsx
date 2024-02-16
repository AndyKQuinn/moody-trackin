import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

type Props = {
  reports: any
}

export default function Chart(props: Props) {
  const { reports } = props

  // return (
  //   <div>
  //     <div>Charts</div>
  //   </div>
  // )

  return (
    <ResponsiveContainer height={250}>
      <LineChart
        data={reports}
        margin={{
          top: 5,
          right: 40,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="date" />
        <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
        <Tooltip />
        <Line type="monotone" dataKey="rating" stroke="#FFF" />
      </LineChart>
    </ResponsiveContainer>
  )
}
