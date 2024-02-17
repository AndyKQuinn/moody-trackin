"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { Box, Stack, Text, Title } from "@mantine/core"
import Header from "@/components/layout/Header/Header"

function LandingView() {
  return (
    <div>
      <Header />
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Stack align="center">
          <Title order={1}>Moody Trackin</Title>
          <Text size="md">Track things and stuff</Text>
        </Stack>
      </Box>
    </div>
  )
}

export default function SiteIndex() {
  const { session } = useSessionContext()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      return router.push("/track")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  return <LandingView />
}
