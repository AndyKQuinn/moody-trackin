"use client"

import { useEffect, useState } from "react"
import { useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { Box, Button, Container, Stack, Text, Title } from "@mantine/core"
import Input from "./Input"
import LoadingSpinner from "@/components/LoadingSpinner"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function HomeView() {
  const supabase = createClientComponentClient<any>()
  const user = useUser()
  const router = useRouter()

  const [extryExistsForToday, setEntryExistsForToday] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  async function getTracksForToday() {
    const today = new Date()
    const todayWithoutTime = new Date(today.setHours(0, 0, 0, 0))

    const inputDoneForToday = await supabase
      .from("tracks")
      .select("*")
      .eq("user_id", user?.id)
      .eq("created_at", todayWithoutTime.toISOString())

    if (inputDoneForToday?.data && inputDoneForToday?.data?.length > 0) {
      setEntryExistsForToday(true)
    }

    setIsLoading(false)
    return
  }

  useEffect(() => {
    if (!user) {
      return router.push("/")
    }

    getTracksForToday()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (extryExistsForToday) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Stack align="center">
          <Text>It appears you already entered a value today</Text>
          <Button mt={8}>View Entries</Button>
        </Stack>
      </Box>
    )
  }

  if (user) {
    return (
      <Container>
        <Input user={user} />
      </Container>
    )
  }

  return router.push("/")
}
