import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET})
    console.log({session})
    if (!session){
      const requestedPage = req.nextUrl.pathname
      const url = req.nextUrl.clone()
      url.pathname = ''
      url.search = `p=${ requestedPage }`
      return;
    }
    return NextResponse.next()
    //return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/(.*)/',
}