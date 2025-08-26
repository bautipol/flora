import type React from "react"
import { Geist, Geist_Mono, Manrope } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata = {
  title: "Flora - Tu jardín perfecto",
  description: "Plantas, macetas, tierras y todo para tu jardín. Diseño y paisajismo profesional.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} antialiased`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
