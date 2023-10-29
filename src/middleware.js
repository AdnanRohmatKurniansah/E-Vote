import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
  const { pathname } = req.nextUrl

  const protectedPaths = ["/pages/dashboard"]

  const matchesProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  )

  const token = await getToken({ req })
  if (matchesProtectedPath) {

    if (!token) {
      const url = new URL(`/pages/login`, req.url)
      url.searchParams.set("callbackUrl", encodeURI(req.url))
      return NextResponse.redirect(url)
    }

    if (token.role !== "admin") {
      const url = new URL(`/`, req.url)
      return NextResponse.rewrite(url)
    }
  }

  if (pathname === "/pages/login" && token) {
    if (token.role === "admin") {
      const url = new URL(`/pages/dashboard`, req.url)
      return NextResponse.redirect(url)
    } else {
      const url = new URL(`/`, req.url)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}