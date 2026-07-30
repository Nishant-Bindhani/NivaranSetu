import { Link } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import { Menu01Icon } from '@hugeicons/core-free-icons'
import { Button } from '@/shared/ui/button'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/shared/ui/navigation-menu'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/sheet'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/shared/ui/accordion'
import { SettingsMenu, SettingsControls } from '@/features/landing/settingsMenu/SettingsMenu'
import { navGroups, type NavLink } from '@/features/landing/shared/navGroups'

// a NavLink is either an internal route (`to`) or a plain anchor (`href`) — render whichever is set
function renderNavLink({ label, to, href }: NavLink, className: string) {
  if (to) return <Link key={label} to={to} className={className}>{label}</Link>
  return <a key={label} href={href} className={className}>{label}</a>
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <svg viewBox="0 0 32 32" className="size-8 text-primary" aria-hidden="true">
            <path
              d="M6 22V14C6 9 10.5 5 16 5C21.5 5 26 9 26 14V22"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path d="M6 22H10V16H6V22Z" fill="currentColor" />
            <path d="M22 22H26V16H22V22Z" fill="currentColor" />
          </svg>
          NivaranSetu
        </Link>

        {/* desktop nav — hidden below md breakpoint */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navGroups.map((group) => (
              <NavigationMenuItem key={group.title}>
                <NavigationMenuTrigger>{group.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="w-48">
                  {group.links.map((link) => (
                    <NavigationMenuLink key={link.label} closeOnClick render={renderNavLink(link, '')} />
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* desktop auth buttons — hidden below md breakpoint */}
        <div className="hidden items-center gap-2 md:flex">
          <SettingsMenu />
          <Button variant="ghost" nativeButton={false} render={<Link to="/login">Log in</Link>} />
          <Button nativeButton={false} render={<Link to="/register">Register</Link>} />
        </div>

        {/* mobile hamburger — hidden at md and above */}
        <Sheet>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden" />}
          >
            <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <Accordion className="border-none px-6">
              {navGroups.map((group) => (
                <AccordionItem key={group.title} value={group.title}>
                  <AccordionTrigger>{group.title}</AccordionTrigger>
                  <AccordionContent>
                    {group.links.map((link) =>
                      renderNavLink(link, 'block rounded-md p-2 text-sm no-underline hover:bg-muted'),
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
              <AccordionItem value="Settings">
                <AccordionTrigger>Settings</AccordionTrigger>
                <AccordionContent>
                  <SettingsControls />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-auto flex flex-col gap-2 p-6">
              <Button variant="outline" nativeButton={false} render={<Link to="/login">Log in</Link>} />
              <Button nativeButton={false} render={<Link to="/register">Register</Link>} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
