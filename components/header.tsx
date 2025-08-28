"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Menu, X, Leaf, Search } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { state } = useCart()
  const router = useRouter()

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/tienda?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsMenuOpen(false)
  }

  return (
    <header className="w-full bg-white">
      <div className="container mx-auto px-4">
        {/* Top section with search, logo, and icons */}
        <div className="flex h-20 items-center justify-between">
          {/* Search bar - left side */}
          <div className="flex-1 max-w-sm">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="¿Qué estás buscando?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 border-gray-300 focus:border-primary"
              />
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Logo - center */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-10 w-10 text-primary" />
              <span className="text-4xl font-serif text-primary">Flora</span>
            </Link>
          </div>

          {/* User actions - right side */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            <Link href="/carrito">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavigation("/")}
                className="text-gray-700 hover:text-[rgb(85,107,47)] transition-colors font-medium text-left"
              >
                INICIO
              </button>
              <button
                onClick={() => handleNavigation("/tienda?categoria=plantas")}
                className="text-gray-700 hover:text-[rgb(85,107,47)] transition-colors font-medium text-left"
              >
                PLANTAS
              </button>
              <button
                onClick={() => handleNavigation("/tienda?categoria=macetas")}
                className="text-gray-700 hover:text-[rgb(85,107,47)] transition-colors font-medium text-left"
              >
                MACETAS
              </button>
              <button
                onClick={() => handleNavigation("/servicios")}
                className="text-gray-700 hover:text-[rgb(85,107,47)] transition-colors font-medium text-left"
              >
                SERVICIOS
              </button>
              <button
                onClick={() => handleNavigation("/contacto")}
                className="text-gray-700 hover:text-[rgb(85,107,47)] transition-colors font-medium text-left"
              >
                CONTACTO
              </button>
            </nav>
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center space-x-12 py-4 border-t border-gray-100">
          <button
            onClick={() => handleNavigation("/")}
            className="text-gray-700 hover:text-[rgb(85,107,47)] transition-colors font-medium"
          >
            INICIO
          </button>
          <button
            onClick={() => handleNavigation("/tienda?categoria=plantas")}
            className="text-gray-700 hover:text-[rgb(85,107,47)] transition-colors font-medium"
          >
            PLANTAS
          </button>
          <button
            onClick={() => handleNavigation("/tienda?categoria=macetas")}
            className="text-gray-700 hover:text-[rgb(85,107,47)] transition-colors font-medium"
          >
            MACETAS
          </button>
          <button
            onClick={() => handleNavigation("/servicios")}
            className="text-gray-700 hover:text-[rgb(85,107,47)] transition-colors font-medium"
          >
            SERVICIOS
          </button>
          <button
            onClick={() => handleNavigation("/contacto")}
            className="text-gray-700 hover:text-[rgb(85,107,47)] transition-colors font-medium"
          >
            CONTACTO
          </button>
        </nav>
      </div>
    </header>
  )
}
