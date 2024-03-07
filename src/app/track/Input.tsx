"use client"

import { useEffect, useState } from "react"
import { useUser } from "@supabase/auth-helpers-react"
import {
  Button,
  Center,
  Container,
  Flex,
  Group,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core"
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/Header/Header"
import Rating from "@/app/track/Rating"
import { toast } from "react-hot-toast"

type Props = {
  user: User
  entryExists: boolean
}

export default function Input(props: Props) {
  const supabase = createClientComponentClient<any>()

  const { user, entryExists } = props

  const router = useRouter()

  const [rating, setRating] = useState(3)
  const [comment, setComment] = useState("")
  const [learnedThing, setLearnedThing] = useState("")

  const handleSubmit = async () => {
    const today = new Date()
    const todayWithoutTime = new Date(today.setHours(0, 0, 0, 0))

    const track = {
      user_id: user?.id || "",
      rating: rating,
      comment: comment,
      learned_thing: learnedThing,
      created_at: todayWithoutTime,
    }

    const { error } = await supabase.from("tracks").upsert(track)

    if (error) {
      toast.error("Error submitting track")
      console.log("Error submitting track", error)
    } else {
      router.push("/entries")
    }
  }

  if (entryExists) {
    return (
      <Center h="80vh" maw={600} mx="auto">
        <Stack align="center">
          <Text>It appears you already entered a value today</Text>
        </Stack>
      </Center>
    )
  }

  return (
    <Container h="80vh" size="xs" mx="auto" p={8}>
      <Stack gap="lg" p={8}>
        <Group>
          <div>How do you feel?</div>
          <Rating value={rating} onUpdate={setRating} />
        </Group>
        <Textarea
          id="comment"
          label="Comment"
          onChange={(e) => setComment(e.target.value)}
        />
        <Textarea
          id="anythingNew"
          label="Learn anything new?"
          onChange={(e) => setLearnedThing(e.target.value)}
        />
        <Center>
          <Button onClick={handleSubmit}>Submit</Button>
        </Center>
      </Stack>
    </Container>
  )
}
