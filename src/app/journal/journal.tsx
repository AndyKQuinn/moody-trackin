"use client"

import { checkSession, submitReport } from "@/app/userLogic"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import {
  Button,
  Center,
  Container,
  Group,
  Stack,
  Title,
  Textarea,
} from "@mantine/core"
import Rating from "./rating"
import toast from "react-hot-toast"

export default function JournalPage() {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [rating, setRating] = useState(3)

  const [comment, setComment] = useState("")
  const [whatILearned, setWhatILearned] = useState("")

  const router = useRouter()

  // useMemo(async () => {
  //   const user = await checkSession()
  //   if (!user) router.push("/login")
  //   else {
  //     setUsername(user)
  //     setIsLoading(false)
  //   }
  // }, [])

  if (isLoading) return <div>Loading...</div>

  // function handleListReports() {
  //   return router.push("/reports")
  // }

  // const handleSubmit = async () => {
  //   const session = JSON.parse(localStorage.getItem("session") as string)
  //   const today = new Date()
  //   console.log("Today: ", today.toISOString())

  //   const submit = await submitReport(
  //     session.token,
  //     rating,
  //     today.toISOString(),
  //     comment,
  //     whatILearned
  //   )
  //   if (submit !== null) {
  //     toast.success("Report submitted successfully")
  //     router.push("/reports")
  //   } else {
  //     toast.error("Failed to submit report. Please try again")
  //   }
  // }

  return (
    <Container>
      <Title order={1}>How do you feel today, {username}?</Title>
      <Stack>
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
          onChange={(e) => setWhatILearned(e.target.value)}
        />
        <Center>
          <Group>
            {/* <Button onClick={handleSubmit}>Submit</Button>
              <Button onClick={handleListReports}>List my reports</Button> */}
          </Group>
        </Center>
      </Stack>
    </Container>
  )
}
