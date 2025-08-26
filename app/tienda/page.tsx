"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Search } from "lucide-react"
import { useCart, type Product } from "@/contexts/cart-context"

const products: Product[] = [
  {
    id: "1",
    name: "Monstera Deliciosa",
    price: 3500,
    image: "/monstera-deliciosa-pot.png",
    category: "plantas-interior",
    description: "Planta de interior perfecta para espacios con luz indirecta",
  },
  {
    id: "2",
    name: "Ficus Lyrata",
    price: 4200,
    image: "/ficus-lyrata-fiddle-leaf-fig-plant.png",
    category: "plantas-interior",
    description: "Elegante planta de hojas grandes, ideal para decoración",
  },
  {
    id: "3",
    name: "Maceta Cerámica Blanca",
    price: 1800,
    image: "/white-ceramic-plant-pot.png",
    category: "macetas",
    description: "Maceta de cerámica blanca con diseño minimalista",
  },
  {
    id: "4",
    name: "Sustrato Universal",
    price: 950,
    image: "/plant-soil-substrate-bag.png",
    category: "tierras",
    description: "Sustrato rico en nutrientes para todo tipo de plantas",
  },
  {
    id: "5",
    name: "Chips Decorativos",
    price: 650,
    image: "/decorative-wood-chips-for-plants.png",
    category: "chips",
    description: "Chips de madera natural para decoración y retención de humedad",
  },
  {
    id: "6",
    name: "Pothos Dorado",
    price: 2200,
    image: "/golden-pothos-hanging-plant.png",
    category: "plantas-interior",
    description: "Planta colgante de fácil cuidado, perfecta para principiantes",
  },
  {
    id: "7",
    name: "Maceta Terracota",
    price: 1200,
    image: "/terracotta-clay-plant-pot.png",
    category: "macetas",
    description: "Maceta de terracota tradicional, ideal para plantas que necesitan drenaje",
  },
  {
    id: "8",
    name: "Tierra para Cactus",
    price: 850,
    image: "/cactus-soil-mix-bag.png",
    category: "tierras",
    description: "Mezcla especial para cactus y suculentas con excelente drenaje",
  },
]

const categories = [
  { value: "todos", label: "Todos los productos" },
  { value: "plantas-interior", label: "Plantas de Interior" },
  { value: "macetas", label: "Macetas" },
  { value: "tierras", label: "Tierras y Sustratos" },
  { value: "chips", label: "Chips Decorativos" },
]

export default function TiendaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [sortBy, setSortBy] = useState("name")
  const { dispatch } = useCart()

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "todos" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product })
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-sans">Nuestra Tienda</h1>
          <p className="text-lg text-muted-foreground">
            Descubre nuestra selección de plantas, macetas y accesorios para tu jardín
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nombre A-Z</SelectItem>
              <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${product.image}')` }} />
              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {categories.find((cat) => cat.value === product.category)?.label}
                  </Badge>
                </div>
                <h3 className="font-semibold mb-2 text-balance">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 text-pretty">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">${product.price.toLocaleString()}</span>
                  <Button size="sm" onClick={() => addToCart(product)} className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Agregar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
