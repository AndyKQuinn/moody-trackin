import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { convertDateTimeToDate } from "@/lib/helpers"

type Props = {
  data: any
}

export default function Chart(props: Props) {
  const { data } = props

  return (
    <ResponsiveContainer height={250}>
      <LineChart
        data={convertDateTimeToDate(data)}
        margin={{
          top: 5,
          right: 40,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="created_at" stroke="#FFF" reversed />
        <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} stroke="#FFF" />
        <Tooltip />
        <Line type="monotone" dataKey="rating" stroke="#FFF" />
      </LineChart>
    </ResponsiveContainer>
  )
}
