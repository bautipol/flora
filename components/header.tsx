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
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0)
  const searchRef = useRef<HTMLDivElement>(null)
  const plantsDropdownRef = useRef<HTMLDivElement>(null)
  const macetasDropdownRef = useRef<HTMLDivElement>(null)
  const { state } = useCart()
  const router = useRouter()

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  const allSuggestions = [
    ["Monstera", "Maceta Cerámica", "Chips Decorativos"],
    ["Ficus", "Maceta Terracota", "Sustrato Universal"],
    ["Pothos", "Macetas", "Tierra para Cactus"],
    ["Plantas de interior", "Cerámica", "Chips"],
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
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    router.push(`/tienda?search=${encodeURIComponent(suggestion)}`)
    setShowSuggestions(false)
  }

  const handleSearchFocus = () => {
    setShowSuggestions(true)
    setCurrentSuggestionIndex((prev) => (prev + 1) % allSuggestions.length)
  }

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsMenuOpen(false)
    setIsPlantsDropdownOpen(false)
    setIsMacetasDropdownOpen(false)
  }

  return (
    <header className="w-full bg-white">
      <div className="container mx-auto px-4 relative">
        {/* Top section with search, logo, and icons */}
        <div className="flex h-32 items-center justify-between">
          {/* Search bar - left side */}
          <div className="flex-1 max-w-xs">
            <div ref={searchRef} className="relative">
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
                      Sugerencias populares
                    </div>
                    {currentSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors flex items-center space-x-2"
                      >
                        <Search className="h-3 w-3 text-gray-400" />
                        <span>{suggestion}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Logo - center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="flex items-center">
              <Image
                src="/flora-logo-new.png"
                alt="Flora Green Garden Paisajismo"
                width={320}
                height={160}
                quality={100}
                priority
                className="h-28 w-auto object-contain"
                style={{ imageRendering: "crisp-edges" }}
              />
            </Link>
          </div>

          {/* User actions - right side */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            <Link href="/carrito">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-6 w-6" />
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavigation("/")}
                className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium text-left relative group hover:scale-105 hover:translate-x-2"
              >
                <span className="relative">
                  INICIO
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </button>
              <div className="space-y-2">
                <button
                  onClick={() => setIsPlantsDropdownOpen(!isPlantsDropdownOpen)}
                  className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium text-left relative group hover:scale-105 hover:translate-x-2 flex items-center"
                >
                  <span className="relative">
                    PLANTAS
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <ChevronDown
                    className={`ml-1 h-3 w-3 transition-transform ${isPlantsDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isPlantsDropdownOpen && (
                  <div className="ml-4 space-y-2">
                    <button
                      onClick={() => handleNavigation("/tienda?categoria=plantas-interior")}
                      className="text-gray-600 hover:text-[rgb(85,107,47)] transition-all duration-300 text-sm text-left block"
                    >
                      Plantas de interior
                    </button>
                    <button
                      onClick={() => handleNavigation("/tienda?categoria=plantas-exterior")}
                      className="text-gray-600 hover:text-[rgb(85,107,47)] transition-all duration-300 text-sm text-left block"
                    >
                      Plantas de exterior
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setIsMacetasDropdownOpen(!isMacetasDropdownOpen)}
                  className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium text-left relative group hover:scale-105 hover:translate-x-2 flex items-center"
                >
                  <span className="relative">
                    MACETAS
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <ChevronDown
                    className={`ml-1 h-3 w-3 transition-transform ${isMacetasDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isMacetasDropdownOpen && (
                  <div className="ml-4 space-y-2">
                    <button
                      onClick={() => handleNavigation("/contacto")}
                      className="text-gray-600 hover:text-[rgb(85,107,47)] transition-all duration-300 text-sm text-left block"
                    >
                      Macetas ultralivianas
                    </button>
                    <button
                      onClick={() => handleNavigation("/contacto")}
                      className="text-gray-600 hover:text-[rgb(85,107,47)] transition-all duration-300 text-sm text-left block"
                    >
                      Macetas de cemento (consultar)
                    </button>
                    <button
                      onClick={() => handleNavigation("/tienda?categoria=macetas")}
                      className="text-gray-600 hover:text-[rgb(85,107,47)] transition-all duration-300 text-sm text-left block"
                    >
                      Plantas con macetas
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => handleNavigation("/tienda?categoria=tierras")}
                className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium text-left relative group hover:scale-105 hover:translate-x-2"
              >
                <span className="relative">
                  SUSTRATOS
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </button>
              <button
                onClick={() => handleNavigation("/servicios")}
                className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium text-left relative group hover:scale-105 hover:translate-x-2"
              >
                <span className="relative">
                  SERVICIOS
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </button>
              <button
                onClick={() => handleNavigation("/contacto")}
                className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium text-left relative group hover:scale-105 hover:translate-x-2"
              >
                <span className="relative">
                  CONTACTO
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </button>
            </nav>
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center space-x-12 py-4 border-t border-gray-100">
          <button
            onClick={() => handleNavigation("/")}
            className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium relative group hover:scale-110"
          >
            <span className="relative">
              INICIO
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
            </span>
          </button>
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
                  <button
                    onClick={() => handleNavigation("/tienda?categoria=plantas-interior")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[rgb(85,107,47)] transition-colors"
                  >
                    Plantas de interior
                  </button>
                  <button
                    onClick={() => handleNavigation("/tienda?categoria=plantas-exterior")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[rgb(85,107,47)] transition-colors"
                  >
                    Plantas de exterior
                  </button>
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
                  <button
                    onClick={() => handleNavigation("/contacto")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[rgb(85,107,47)] transition-colors"
                  >
                    Macetas ultralivianas
                  </button>
                  <button
                    onClick={() => handleNavigation("/contacto")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[rgb(85,107,47)] transition-colors"
                  >
                    Macetas de cemento (consultar)
                  </button>
                  <button
                    onClick={() => handleNavigation("/tienda?categoria=macetas")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[rgb(85,107,47)] transition-colors"
                  >
                    Plantas con macetas
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => handleNavigation("/tienda?categoria=tierras")}
            className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium relative group hover:scale-110"
          >
            <span className="relative">
              SUSTRATOS
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
            </span>
          </button>
          <button
            onClick={() => handleNavigation("/servicios")}
            className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium relative group hover:scale-110"
          >
            <span className="relative">
              SERVICIOS
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
            </span>
          </button>
          <button
            onClick={() => handleNavigation("/contacto")}
            className="text-gray-700 hover:text-[rgb(85,107,47)] transition-all duration-300 font-medium relative group hover:scale-110"
          >
            <span className="relative">
              CONTACTO
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[rgb(85,107,47)] transition-all duration-300 group-hover:w-full"></span>
            </span>
          </button>
        </nav>
      </div>
    </header>
  )
}
