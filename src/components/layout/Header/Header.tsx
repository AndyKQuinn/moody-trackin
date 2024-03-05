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
import Link from "next/link"
import classes from "./Header.module.css"

const links = [
  { link: "/track", label: "Track" },
  { link: "/dashboard", label: "Dashboard" },
  { link: "/account", label: "Account" },
  { link: "/feedback", label: "Feedback" },
]

export default function Header() {
  const user = useUser()
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
  }

  function LoginOrLogoutButton() {
    return (
      <>
        {!user ? (
          <Button href="/sign-in" component={Link} size="md">
            Sign In
          </Button>
        ) : (
          <Button onClick={handleLogout} size="md">
            Logout
          </Button>
        )}
      </>
    )
  }

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
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
        title="Navigation"
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
