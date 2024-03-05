"use client"

import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Box, Center, Container, Stack, Title } from "@mantine/core"

const SignIn = () => {
  const supabaseClient = useSupabaseClient()
  const { session } = useSessionContext()

  const router = useRouter()

  useEffect(() => {
    console.log("Session: ", session)
    if (session) {
      router.push("/")
    }
  }, [session, router])

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Center>
        <Stack w={300}>
          <Title order={1}>Sign In</Title>
          <Auth
            supabaseClient={supabaseClient}
            providers={["google"]}
            magicLink={true}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    // brand: "green",
                    // brandAccent: "green",
                  },
                },
              },
            }}
            theme="dark"
          />
        </Stack>
      </Center>
    </div>
  )
}

export default SignIn
