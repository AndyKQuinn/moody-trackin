"use client"
import { useEffect } from "react"
import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation"
import { Box, Button, Stack, Title } from "@mantine/core"
import Link from "next/link"

export default function LandingView() {
  const user = useUser()
  const router = useRouter()
  useEffect(() => {
    if (user) {
      return router.push("/track")
    }
  }, [])
  return (
    <div>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100%",
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
