"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Box, Button, Stack, Title } from "@mantine/core"
import Link from "next/link"
import { useUser } from "@/hooks/useUser"
import LoadingSpinner from "@/components/LoadingSpinner"

function LandingView() {
  return (
    <div>
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
          <Title order={4}>Track your mood and things that you learn</Title>
          <Button href="/sign-in" component={Link} size="md">
            Sign In
          </Button>
        </Stack>
      </Box>
    </div>
  )
}

export default function SiteIndex() {
  const router = useRouter()
  const user = useUser()
  const [isLoading, setIsLoading] = useState(true)

  console.log("User: ", user)

  useEffect(() => {
    if (user) {
      return router.push("/track")
    } else {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (isLoading) return <LoadingSpinner />

  return <LandingView />
}
