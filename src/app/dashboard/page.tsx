"use client"

// import { Report } from "@/app/customTypes"
import { checkSession, getAllReportsServer } from "./userLogic"
import { useUser } from "@supabase/auth-helpers-react"
import { useState, useEffect } from "react"
import {
  // Button,
  Card,
  // Center,
  Container,
  // Group,
  Stack,
  // Table,
  Text,
  Title,
} from "@mantine/core"
// import { useRouter } from "next/navigation"
import Chart from "./chart"
import Ratings from "./ratings"

// import { ActionIcon } from "@mantine/core"
// import { IconAdjustments, IconSquareX } from "@tabler/icons-react"
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
            <Ratings value={track.rating} />
            <Text>{track.comment}</Text>
            <Text>{track.learned_thing}</Text>
          </Card>
        ))}
      </Stack>
    </Container>
  )
}
