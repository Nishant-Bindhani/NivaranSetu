import { AuthedNavbar } from '@/features/dashboard/AuthedNavbar'
import { Welcome } from '@/features/dashboard/sections/Welcome'
import { MyComplaints } from '@/features/dashboard/sections/MyComplaints'

export function CitizenDashboardPage() {
  return (
    <>
      <AuthedNavbar />
      <Welcome />
      <MyComplaints />
    </>
  )
}
