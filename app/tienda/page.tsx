"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
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
    category: "tierras", // moved chips from "chips" category to "tierras" category
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
  {
    id: "9",
    name: "Compost Orgánico",
    price: 1200,
    image: "/organic-compost-soil-bag-for-plants.png",
    category: "tierras",
    description: "Compost 100% orgánico, perfecto para enriquecer el suelo",
  },
  {
    id: "10",
    name: "Tierra para Orquídeas",
    price: 1100,
    image: "/orchid-soil-mix-bag-specialized-substrate.png",
    category: "tierras",
    description: "Mezcla especializada para orquídeas con corteza y musgo",
  },
  {
    id: "11",
    name: "Sustrato para Semillas",
    price: 750,
    image: "/seed-starting-soil-mix-fine-substrate-bag.png",
    category: "tierras",
    description: "Sustrato fino ideal para germinación de semillas",
  },
  {
    id: "12",
    name: "Tierra Negra Premium",
    price: 1350,
    image: "/premium-black-soil-bag-rich-organic-matter.png",
    category: "tierras",
    description: "Tierra negra de primera calidad, rica en materia orgánica",
  },
]

const categories = [
  { value: "todos", label: "Todos los productos" },
  { value: "plantas", label: "Plantas" },
  { value: "plantas-interior", label: "Plantas de Interior" },
  { value: "macetas", label: "Macetas" },
  { value: "tierras", label: "Tierras y Sustratos" },
  { value: "chips", label: "Chips Decorativos" },
]

export default function TiendaPage() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [sortBy, setSortBy] = useState("name")
  const { addToCart } = useCart()

  useEffect(() => {
    const searchParam = searchParams.get("search")
    const categoryParam = searchParams.get("categoria")

    if (categoryParam && categoryParam !== "todos") {
      setSelectedCategory(categoryParam)
      setSearchTerm("") // Clear search when selecting category
    } else if (searchParam) {
      setSearchTerm(searchParam)
      setSelectedCategory("todos") // Reset category when searching
    }
  }, [searchParams])

  const filteredProducts = products
    .filter((product) => {
      const searchLower = searchTerm.toLowerCase()

      // Helper function to handle plurals
      const normalizeSearchTerm = (term: string) => {
        const singular = term.endsWith("s") ? term.slice(0, -1) : term
        const plural = term.endsWith("s") ? term : term + "s"
        return [term, singular, plural]
      }

      const searchVariations = normalizeSearchTerm(searchLower)

      const matchesSearch =
        searchTerm === "" ||
        searchVariations.some(
          (variation) =>
            product.name.toLowerCase().includes(variation) || product.description.toLowerCase().includes(variation),
        )

      let matchesCategory = false
      if (selectedCategory === "todos") {
        matchesCategory = true
      } else if (selectedCategory === "plantas") {
        // Show only plants and chips in the "plantas" category
        matchesCategory = product.category === "plantas-interior"
      } else {
        matchesCategory = product.category === selectedCategory
      }

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

  return (
    <div className="min-h-screen">
      <Header />

      <motion.div
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-sans">Nuestra Tienda</h1>
          <p className="text-lg text-muted-foreground">
            Descubre nuestra selección de plantas, macetas y accesorios para tu jardín
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
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
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <motion.div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${product.image}')` }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
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
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" onClick={() => addToCart(product)} className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        Agregar
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-muted-foreground">No se encontraron productos que coincidan con tu búsqueda.</p>
          </motion.div>
        )}
      </motion.div>

      <Footer />
    </div>
  )
}
