"use client"

import { useUser } from "@supabase/auth-helpers-react"
import { useState, useEffect } from "react"
import {
  Card,
  Container,
  Flex,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import Chart from "./chart"
import Ratings from "./ratings"

import LoadingSpinner from "@/components/LoadingSpinner"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function Reports() {
  const supabase = createClientComponentClient<any>()
  const user = useUser()

  const [tracks, setTracks] = useState<any[]>([])

  useEffect(() => {
    if (user) {
      getTracks()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  async function getTracks() {
    const tracks = await supabase
      .from("tracks")
      .select("*")
      .eq("user_id", user?.id)
    console.log("Tracks: ", tracks.data)

    setTracks(tracks.data || [])
  }

  if (!user) {
    return <LoadingSpinner />
  }

  if (user && !tracks) {
    return <div>No tracks found for user</div>
  }

  return (
    <Container>
      <Stack align="center">
        <Title order={1}>Dashboard</Title>

        <Chart data={tracks} />
        {tracks.map((track, index) => (
          <Card w="60%" key={index}>
            <Flex justify="flex-end">
              <Ratings value={track.rating} />
            </Flex>

            <Title order={5}>Comment</Title>
            <Text pl={16} py={2}>
              {track.comment}
            </Text>
            <Title order={5}>Learned Thing</Title>
            <Text pl={16} py={2}>
              {track.learned_thing}
            </Text>
          </Card>
        ))}
      </Stack>
    </Container>
  )
}
