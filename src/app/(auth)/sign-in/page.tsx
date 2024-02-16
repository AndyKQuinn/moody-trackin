"use client"

import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Container, Title } from "@mantine/core"

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
    <Container size="sm">
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
                // brand: "#0D121F",
                // brandAccent: "#701a75",
              },
            },
          },
        }}
        theme="dark"
      />
    </Container>
  )
}

export default SignIn
