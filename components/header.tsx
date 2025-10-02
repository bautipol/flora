"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Menu, X, Search, ChevronDown } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlantsDropdownOpen, setIsPlantsDropdownOpen] = useState(false)
  const [isMacetasDropdownOpen, setIsMacetasDropdownOpen] = useState(false)
  const [isMobilePlantsOpen, setIsMobilePlantsOpen] = useState(false)
  const [isMobileMacetasOpen, setIsMobileMacetasOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const plantsDropdownRef = useRef<HTMLDivElement>(null)
  const macetasDropdownRef = useRef<HTMLDivElement>(null)
  const { state } = useCart()
  const router = useRouter()

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  const allSuggestions = [
    [
      { name: "Monstera Deliciosa", id: "1" },
      { name: "Maceta Cerámica Blanca", id: "3" },
      { name: "Chips Decorativos", id: "5" },
    ],
    [
      { name: "Ficus Lyrata", id: "2" },
      { name: "Maceta Terracota", id: "7" },
      { name: "Sustrato Universal", id: "4" },
    ],
    [
      { name: "Pothos Dorado", id: "6" },
      { name: "Sansiveria", id: "19" },
      { name: "Tierra para Cactus", id: "8" },
    ],
    [
      { name: "Spatiphyllum", id: "18" },
      { name: "Maceta Cemento Redonda", id: "39" },
      { name: "Compost Orgánico", id: "9" },
    ],
  ]

  const currentSuggestions = allSuggestions[currentSuggestionIndex]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
      if (plantsDropdownRef.current && !plantsDropdownRef.current.contains(event.target as Node)) {
        setIsPlantsDropdownOpen(false)
      }
      if (macetasDropdownRef.current && !macetasDropdownRef.current.contains(event.target as Node)) {
        setIsMacetasDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/tienda?search=${encodeURIComponent(searchQuery.trim())}`)
      setShowSuggestions(false)
      setIsMobileSearchOpen(false)
    }
  }

  const handleSuggestionClick = (productId: string) => {
    router.push(`/producto/${productId}`)
    setShowSuggestions(false)
    setIsMobileSearchOpen(false)
    setSearchQuery("")
  }

  const handleSearchFocus = () => {
    setShowSuggestions(true)
    setCurrentSuggestionIndex((prev) => (prev + 1) % allSuggestions.length)
  }

  const handleMobileSearchClick = () => {
    setIsMobileSearchOpen(true)
    setShowSuggestions(true)
    setCurrentSuggestionIndex((prev) => (prev + 1) % allSuggestions.length)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsPlantsDropdownOpen(false)
    setIsMacetasDropdownOpen(false)
    setIsMobilePlantsOpen(false)
    setIsMobileMacetasOpen(false)
  }

  return (
    <header className="w-full bg-white">
      <div className="container mx-auto px-4 relative">
        {/* Top section with search, logo, and icons */}
        <div className="flex h-32 items-center justify-between">
          {/* Search bar - left side */}
          <div className="flex-1 max-w-[200px] mr-4">
            <Button variant="ghost" size="sm" className="md:hidden" onClick={handleMobileSearchClick}>
              <Search className="h-5 w-5 text-gray-600" />
            </Button>

            <div ref={searchRef} className="relative hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  className="bg-transparent border-0 border-b border-gray-300 focus:border-primary focus:outline-none pb-2 pr-10 text-gray-700 placeholder-gray-400 transition-colors text-sm tracking-wide w-full"
                />
                <Search className="absolute right-0 bottom-2 h-4 w-4 text-gray-400" />
              </form>

              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1">
                  <div className="py-2">
                    <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Productos populares
                    </div>
                    {currentSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion.id)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors flex items-center space-x-2"
                      >
                        <Search className="h-3 w-3 text-gray-400" />
                        <span>{suggestion.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Logo - center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="flex items-center group">
              <Image
                src="/flora-logo-new.png"
                alt="Flora Green Garden Paisajismo"
                width={320}
                height={160}
                quality={100}
                priority
                className="h-28 object-contain w-auto my-0 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-110"
                style={{ imageRendering: "crisp-edges" }}
              />
            </Link>
          </div>

          {/* User actions - right side */}
          <div className="flex-1 flex justify-end items-center space-x-4 mx-0">
            <Link href="/carrito">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-6 w-6 px-0 my-0 mx-0" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs">
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

        {isMobileSearchOpen && (
          <div className="fixed inset-0 bg-white z-50 md:hidden">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Buscar productos</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsMobileSearchOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 pr-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </form>

              {showSuggestions && (
                <div className="bg-white">
                  <div className="mb-2">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                      Productos populares
                    </div>
                    <div className="space-y-2">
                      {currentSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion.id)}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-3"
                        >
                          <Search className="h-4 w-4 text-gray-400" />
                          <span>{suggestion.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                onClick={closeMenu}
                className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium text-left relative group hover:scale-105 hover:translate-x-2 py-2"
              >
                <span className="relative">
                  INICIO
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>

              {/* Mobile Plants Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobilePlantsOpen(!isMobilePlantsOpen)}
                  className="w-full text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium text-left relative group hover:scale-105 hover:translate-x-2 py-2 flex items-center justify-between"
                >
                  <span className="relative">
                    PLANTAS
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isMobilePlantsOpen ? "rotate-180" : ""}`} />
                </button>
                {isMobilePlantsOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link
                      href="/tienda?categoria=plantas-interior"
                      onClick={closeMenu}
                      className="block text-gray-600 hover:text-[rgb(85,107,47)] transition-colors py-2 text-sm"
                    >
                      Plantas de interior
                    </Link>
                    <Link
                      href="/tienda?categoria=plantas-exterior"
                      onClick={closeMenu}
                      className="block text-gray-600 hover:text-[rgb(85,107,47)] transition-colors py-2 text-sm"
                    >
                      Plantas de exterior
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Macetas Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileMacetasOpen(!isMobileMacetasOpen)}
                  className="w-full text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium text-left relative group hover:scale-105 hover:translate-x-2 py-2 flex items-center justify-between"
                >
                  <span className="relative">
                    MACETAS
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isMobileMacetasOpen ? "rotate-180" : ""}`} />
                </button>
                {isMobileMacetasOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link
                      href="/tienda?categoria=macetas-livianas"
                      onClick={closeMenu}
                      className="block text-gray-600 hover:text-[rgb(85,107,47)] transition-colors py-2 text-sm"
                    >
                      Macetas livianas
                    </Link>
                    <Link
                      href="/tienda?categoria=macetas-cemento"
                      onClick={closeMenu}
                      className="block text-gray-600 hover:text-[rgb(85,107,47)] transition-colors py-2 text-sm"
                    >
                      Macetas de cemento
                    </Link>
                    <Link
                      href="/tienda?categoria=plantas-con-macetas"
                      onClick={closeMenu}
                      className="block text-gray-600 hover:text-[rgb(85,107,47)] transition-colors py-2 text-sm"
                    >
                      Plantas con macetas
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/tienda?categoria=tierras"
                onClick={closeMenu}
                className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium text-left relative group hover:scale-105 hover:translate-x-2 py-2"
              >
                <span className="relative">
                  SUSTRATOS
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>

              <Link
                href="/servicios"
                onClick={closeMenu}
                className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium text-left relative group hover:scale-105 hover:translate-x-2 py-2"
              >
                <span className="relative">
                  SERVICIOS
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>

              <Link
                href="/contacto"
                onClick={closeMenu}
                className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium text-left relative group hover:scale-105 hover:translate-x-2 py-2"
              >
                <span className="relative">
                  CONTACTO
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            </nav>
          </div>
        )}

        <nav className="hidden md:flex items-center justify-center space-x-12 py-4 border-t border-gray-100">
          <Link
            href="/"
            className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium relative group hover:scale-110"
          >
            <span className="relative">
              INICIO
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
          <div ref={plantsDropdownRef} className="relative">
            <button
              onClick={() => setIsPlantsDropdownOpen(!isPlantsDropdownOpen)}
              className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium relative group hover:scale-110 flex items-center"
            >
              <span className="relative">
                PLANTAS
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
              </span>
              <ChevronDown
                className={`ml-1 h-3 w-3 transition-transform ${isPlantsDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isPlantsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-48">
                <div className="py-2">
                  <Link
                    href="/tienda?categoria=plantas-interior"
                    onClick={() => setIsPlantsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[rgb(85,107,47)] transition-colors"
                  >
                    Plantas de interior
                  </Link>
                  <Link
                    href="/tienda?categoria=plantas-exterior"
                    onClick={() => setIsPlantsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[rgb(85,107,47)] transition-colors"
                  >
                    Plantas de exterior
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div ref={macetasDropdownRef} className="relative">
            <button
              onClick={() => setIsMacetasDropdownOpen(!isMacetasDropdownOpen)}
              className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium relative group hover:scale-110 flex items-center"
            >
              <span className="relative">
                MACETAS
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
              </span>
              <ChevronDown
                className={`ml-1 h-3 w-3 transition-transform ${isMacetasDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isMacetasDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-64">
                <div className="py-2">
                  <Link
                    href="/tienda?categoria=macetas-livianas"
                    onClick={() => setIsMacetasDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[rgb(85,107,47)] transition-colors"
                  >
                    Macetas livianas
                  </Link>
                  <Link
                    href="/tienda?categoria=macetas-cemento"
                    onClick={() => setIsMacetasDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[rgb(85,107,47)] transition-colors"
                  >
                    Macetas de cemento
                  </Link>
                  <Link
                    href="/tienda?categoria=plantas-con-macetas"
                    onClick={() => setIsMacetasDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[rgb(85,107,47)] transition-colors"
                  >
                    Plantas con macetas
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link
            href="/tienda?categoria=tierras"
            className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium relative group hover:scale-110"
          >
            <span className="relative">
              SUSTRATOS
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
          <Link
            href="/servicios"
            className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium relative group hover:scale-110"
          >
            <span className="relative">
              SERVICIOS
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
          <Link
            href="/contacto"
            className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium relative group hover:scale-110"
          >
            <span className="relative">
              CONTACTO
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
