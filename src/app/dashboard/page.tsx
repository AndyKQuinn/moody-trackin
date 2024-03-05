"use client"

import { useUser } from "@supabase/auth-helpers-react"
import { useState, useEffect } from "react"
import { Card, Flex, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import Chart from "./chart"
import Ratings from "./ratings"

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

  if (user && !tracks) {
    return <div>No tracks found for user</div>
  }

  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2 }}
      spacing={{ base: 10, sm: "xl" }}
      verticalSpacing={{ base: "md", sm: "xl" }}
      pt={10}
    >
      <Stack align="center">
        <Title order={1}>Dashboard</Title>
        <Chart data={tracks} />
      </Stack>

      <Stack gap={4}>
        {tracks.map((track, index) => {
          const date = new Date(track.created_at).toLocaleDateString()
          return (
            <Card mx={4} key={index}>
              <Flex justify="space-between">
                <Title order={6}>{date}</Title>
                <Ratings value={track.rating} />
              </Flex>
              <Stack>
                <Title order={6}>Comment</Title>
                <Text pl={16}>{track.comment}</Text>
                <Title order={6}>Learned Thing</Title>
                <Text pl={16}>{track.learned_thing}</Text>
              </Stack>
            </Card>
          )
        })}
      </Stack>
    </SimpleGrid>
  )
}
