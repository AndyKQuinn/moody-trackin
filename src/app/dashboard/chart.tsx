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
  data: any
}

export default function Chart(props: Props) {
  const { data } = props

  // strips time from date/time
  function formatData(data: any) {
    return data.map((item: any) => {
      return {
        ...item,
        created_at: new Date(item.created_at).toLocaleDateString(),
      }
    })
  }

  return (
    <ResponsiveContainer height={250}>
      <LineChart
        data={formatData(data)}
        margin={{
          top: 5,
          right: 40,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="created_at" />
        <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
        <Tooltip />
        <Line type="monotone" dataKey="rating" stroke="#FFF" />
      </LineChart>
    </ResponsiveContainer>
  )
}
