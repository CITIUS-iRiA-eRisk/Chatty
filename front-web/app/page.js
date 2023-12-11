import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>AUTH test</h1>
      <Link href="account/register">Register page</Link>
      <Link href="account/login">Register page</Link>
    </main>
  )
}
