"use client"

// import { Report } from "@/app/customTypes"
import { checkSession, getAllReportsServer } from "./userLogic"
import { useUser } from "@supabase/auth-helpers-react"
import { useState, useEffect } from "react"
import {
  Button,
  Center,
  Container,
  Group,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core"
import { useRouter } from "next/navigation"
import Chart from "./chart"
import Ratings from "./ratings"

import { ActionIcon } from "@mantine/core"
import { IconAdjustments, IconSquareX } from "@tabler/icons-react"
import LoadingSpinner from "@/components/LoadingSpinner"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// export type Report = {
//   learned_thing: string
//   comment: string
//   date: string
//   id: number
//   rating: number
//   user_id: number
// }

export default function Reports() {
  const supabase = createClientComponentClient<any>()
  const user = useUser()

  const [tracks, setTracks] = useState<any[]>([])

  // const [username, setUsername] = useState("")
  // const [isLoading, setIsLoading] = useState(true)
  // const [reports, setReports] = useState<Report[]>([])
  // const [fetchFailed, setFetchFailed] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (user) {
      getTracks()
    }
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
          <div key={index}>
            <Title order={3}>Report for {track.created_at}</Title>
            <Ratings value={track.rating} />
            <Text>{track.comment}</Text>
            <Text>{track.learned_thing}</Text>
            <ActionIcon
              onClick={() => {
                router.push(`/report/${track.id}`)
              }}
            >
              <IconAdjustments />
            </ActionIcon>
            <ActionIcon
              onClick={async () => {
                const { error } = await supabase
                  .from("tracks")
                  .delete()
                  .eq("id", track.id)
                if (error) {
                  console.error("Error deleting track: ", error)
                } else {
                  await getTracks()
                }
              }}
            >
              <IconSquareX />
            </ActionIcon>
          </div>
        ))}
      </Stack>
    </Container>
  )
}
