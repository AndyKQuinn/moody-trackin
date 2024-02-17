"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { Box, Button, Stack, Text, Title } from "@mantine/core"
import Header from "@/components/layout/Header/Header"
import Link from "next/link"

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
          <Title order={3}>A simple daily mood and learning tracker</Title>
          <Button href="/sign-in" component={Link} size="md">
            Sign In
          </Button>
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
