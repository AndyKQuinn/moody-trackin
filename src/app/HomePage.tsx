"use client"

import { useUser } from "@supabase/auth-helpers-react"
import { Box, Center, Container, Flex, Stack, Text, Title } from "@mantine/core"
import Link from "next/link"
import Header from "@/components/layout/Header/Header"

export default function HomeView() {
  const user = useUser()

  console.log("User: ", user)

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

  if (!user) {
    return <LandingView />
  }

  return (
    <div>
      <Header />
      <div>Home Page</div>
    </div>
  )
}
