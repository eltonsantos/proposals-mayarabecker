import { NextResponse, NextRequest } from "next/server";

export default async function middleware(request: NextRequest, response: NextResponse) {
  const token = request.cookies.get("@proposalsmayarabecker.token")?.value
  const id = request.cookies.get("@proposalsmayarabecker.userId")?.value

  const signInURL = new URL('/login', request.url)
  const homeURL = new URL('/', request.url)

  if(!token) {
    if (request.nextUrl.pathname === '/login') {
      return NextResponse.next()
    }
    return NextResponse.redirect(signInURL)
  }

  if (request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(homeURL)
  }

  // const userResponse = await fetch(`http://localhost:3333/user?id=${id}`, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   }
  // });

  // console.log(userResponse)

  return NextResponse.next();

}

//Add your protected routes
export const config = {
  matcher: ["/login", "/", "/users", "/services-types", "/services", "/steps", "/proposals"],
};