import { Rating, rem } from "@mantine/core"
import {
  IconMoodCry,
  IconMoodSad,
  IconMoodSmile,
  IconMoodHappy,
  IconMoodCrazyHappy,
} from "@tabler/icons-react"

type Props = {
  value: number
  onUpdate?: any
}

const getIconStyle = (color?: string) => ({
  // width: rem(48),
  // height: rem(48),
  color: color ? `var(--mantine-color-${color}-7)` : undefined,
})

const getEmptyIcon = (value: number) => {
  const iconStyle = getIconStyle()

  switch (value) {
    case 1:
      return <IconMoodCry style={iconStyle} />
    case 2:
      return <IconMoodSad style={iconStyle} />
    case 3:
      return <IconMoodSmile style={iconStyle} />
    case 4:
      return <IconMoodHappy style={iconStyle} />
    case 5:
      return <IconMoodCrazyHappy style={iconStyle} />
    default:
      return null
  }
}

const getFullIcon = (value: number) => {
  switch (value) {
    case 1:
      return <IconMoodCry style={getIconStyle("red")} />
    case 2:
      return <IconMoodSad style={getIconStyle("orange")} />
    case 3:
      return <IconMoodSmile style={getIconStyle("yellow")} />
    case 4:
      return <IconMoodHappy style={getIconStyle("lime")} />
    case 5:
      return <IconMoodCrazyHappy style={getIconStyle("green")} />
    default:
      return null
  }
}

export default function RatingComponent(props: Props) {
  const { value, onUpdate } = props

  return (
    <div className="p-2">
      <Rating
        emptySymbol={getEmptyIcon}
        fullSymbol={getFullIcon}
        highlightSelectedOnly
        defaultValue={value}
        onChange={(e) => onUpdate(e)}
      />
    </div>
  )
}
