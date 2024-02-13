"use client"

import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

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
    <div className="grid grid-cols-2 items-center min-h-screen">
      <h1 className="text-3xl font-bold">Sign In </h1>
      <div className="w-[350px]">
        <Auth
          supabaseClient={supabaseClient}
          providers={["google"]}
          magicLink={true}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#0D121F",
                  brandAccent: "#701a75",
                },
              },
            },
          }}
          theme="dark"
        />
      </div>
    </div>
  )
}

export default SignIn
