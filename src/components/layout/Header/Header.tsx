import {
  Anchor,
  Box,
  Button,
  Burger,
  Divider,
  Drawer,
  Group,
  rem,
  ScrollArea,
} from "@mantine/core"
import { useState } from "react"
import { useDisclosure } from "@mantine/hooks"
import { usePathname } from "next/navigation"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import classes from "./Header.module.css"

const links = [
  { link: "/track", label: "Track My Day" },
  { link: "/entries", label: "View Entries" },
]

export default function Header() {
  const user = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const [active, setActive] = useState(pathname)

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false)
  const supabaseClient = useSupabaseClient()

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut()

    if (error) {
      console.log(error)
    }

    router.push("/")
  }

  function LoginOrLogoutButton() {
    return (
      <>
        {!user ? (
          <Button href="/sign-in" component={Link} size="xs">
            Sign In
          </Button>
        ) : (
          <Button onClick={handleLogout} size="xs">
            Logout
          </Button>
        )}
      </>
    )
  }

  return (
    <Box>
      <header className={classes.header}>
        <Group h="100%" justify="space-between">
          <div>
            <Anchor href="/" underline="never">
              Moody Trackin
            </Anchor>
          </div>
          {user && (
            <Group h="100%" gap={0} visibleFrom="sm">
              {links.map((link) => (
                <Link
                  key={link.link}
                  href={link.link}
                  className={classes.link}
                  data-active={active === link.link || undefined}
                  onClick={() => {
                    setActive(link.link)
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Group>
          )}

          <Group visibleFrom="sm">
            <LoginOrLogoutButton />
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="MoodyTrackin"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          {links.map((link) => (
            <Link
              key={link.link}
              href={link.link}
              className={classes.link}
              data-active={active === link.link || undefined}
            >
              {link.label}
            </Link>
          ))}
          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
            <LoginOrLogoutButton />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  )
}
