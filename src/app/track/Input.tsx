"use client"

import { useEffect, useState } from "react"
import { useUser } from "@supabase/auth-helpers-react"
import {
  Button,
  Center,
  Container,
  Group,
  Stack,
  Textarea,
  Title,
} from "@mantine/core"
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/Header/Header"
import Rating from "@/components/Rating/Rating"
import { toast } from "react-hot-toast"

type Props = {
  user: User
}

export default function Input(props: Props) {
  const supabase = createClientComponentClient<any>()

  const { user } = props

  const router = useRouter()

  const [rating, setRating] = useState(3)
  const [comment, setComment] = useState("")
  const [learnedThing, setLearnedThing] = useState("")

  const handleSubmit = async () => {
    const today = new Date()
    const todayWithoutTime = new Date(today.setHours(0, 0, 0, 0))

    const track = {
      user_id: user.id,
      rating: rating,
      comment: comment,
      learned_thing: learnedThing,
      created_at: todayWithoutTime,
    }

    const { error } = await supabase.from("tracks").upsert(track)

    if (error) {
      toast.error("Error submitting track")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <>
      <Stack gap="lg">
        <Title order={1}>How do you feel today?</Title>
        <Center>
          <Rating value={rating} onUpdate={setRating} />
        </Center>
        <Title order={3} className="text-xl font-bold">
          Comments
        </Title>
        <Textarea id="comment" onChange={(e) => setComment(e.target.value)} />
        <Title order={3}>Learn anything new today?</Title>
        <Textarea
          id="anythingNew"
          onChange={(e) => setLearnedThing(e.target.value)}
        />
        <Center>
          <Group>
            <Button onClick={handleSubmit}>Submit</Button>
          </Group>
        </Center>
      </Stack>
    </>
  )
}
