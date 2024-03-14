"use client"

import { useEffect, useState } from "react"
import { useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import Input from "./Input"
import LoadingSpinner from "@/components/LoadingSpinner"
import { Box, Button, Center, Stack, Text, Title } from "@mantine/core"
import Link from "next/link"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function HomeView() {
  const supabase = createClientComponentClient<any>()
  const user = useUser()

  const [entryExistsForToday, setEntryExistsForToday] = useState(false)
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
    if (user) {
      getTracksForToday()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (entryExistsForToday) {
    return (
      <Center maw={600} mx="auto">
        <Stack align="center">
          <Text>It appears you already entered a value today</Text>
        </Stack>
      </Center>
    )
  }

  function LandingView() {
    return (
      <div>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // minHeight: "100%",
          }}
        >
          <Stack align="center">
            <Title order={1}>Moody Trackin</Title>
            <Title order={4}>Track your mood and things that you learn</Title>
            <Button href="/sign-in" component={Link} size="md">
              Sign In
            </Button>
          </Stack>
        </Box>
      </div>
    )
  }

  if (isLoading) return <LoadingSpinner />

  if (user?.id) {
    return <Input user={user} entryExists={entryExistsForToday} />
  }

  return <LandingView />
}
