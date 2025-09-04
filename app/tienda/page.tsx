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
    price: 3500, // base price
    image: "/monstera-deliciosa-pot.png",
    category: "plantas-interior",
    description: "Planta de interior perfecta para espacios con luz indirecta",
    options: [
      { name: "Pequeña (15cm)", price: 3500 },
      { name: "Mediana (25cm)", price: 4800 },
      { name: "Grande (35cm)", price: 6200 },
    ],
  },
  {
    id: "2",
    name: "Ficus Lyrata",
    price: 4200,
    image: "/ficus-lyrata-fiddle-leaf-fig-plant.jpg",
    category: "plantas-interior",
    description: "Elegante planta de hojas grandes, ideal para decoración",
    options: [
      { name: "Pequeña (20cm)", price: 4200 },
      { name: "Mediana (30cm)", price: 5800 },
      { name: "Grande (45cm)", price: 7500 },
    ],
  },
  {
    id: "3",
    name: "Maceta Cerámica Blanca",
    price: 1800,
    image: "/white-ceramic-plant-pot.jpg",
    category: "macetas",
    description: "Maceta de cerámica blanca con diseño minimalista",
    options: [
      { name: "Chica (12cm)", price: 1800 },
      { name: "Mediana (18cm)", price: 2400 },
      { name: "Grande (25cm)", price: 3200 },
    ],
  },
  {
    id: "4",
    name: "Sustrato Universal",
    price: 950,
    image: "/plant-soil-substrate-bag.jpg",
    category: "tierras",
    description: "Sustrato rico en nutrientes para todo tipo de plantas",
    options: [
      { name: "2kg", price: 950 },
      { name: "5kg", price: 2100 },
      { name: "10kg", price: 3800 },
    ],
  },
  {
    id: "5",
    name: "Chips Decorativos",
    price: 650,
    image: "/decorative-wood-chips-for-plants.jpg",
    category: "tierras",
    description: "Chips de madera natural para decoración y retención de humedad",
    options: [
      { name: "1kg", price: 650 },
      { name: "3kg", price: 1650 },
      { name: "5kg", price: 2500 },
    ],
  },
  {
    id: "6",
    name: "Pothos Dorado",
    price: 2200,
    image: "/golden-pothos-hanging-plant.png",
    category: "plantas-interior",
    description: "Planta colgante de fácil cuidado, perfecta para principiantes",
    options: [
      { name: "Pequeña (15cm)", price: 2200 },
      { name: "Mediana (25cm)", price: 3200 },
      { name: "Grande (35cm)", price: 4500 },
    ],
  },
  {
    id: "7",
    name: "Maceta Terracota",
    price: 1200,
    image: "/terracotta-clay-plant-pot.jpg",
    category: "macetas",
    description: "Maceta de terracota tradicional, ideal para plantas que necesitan drenaje",
    options: [
      { name: "Chica (10cm)", price: 1200 },
      { name: "Mediana (16cm)", price: 1800 },
      { name: "Grande (22cm)", price: 2600 },
    ],
  },
  {
    id: "8",
    name: "Tierra para Cactus",
    price: 850,
    image: "/cactus-soil-mix-bag.jpg",
    category: "tierras",
    description: "Mezcla especial para cactus y suculentas con excelente drenaje",
    options: [
      { name: "1kg", price: 850 },
      { name: "3kg", price: 2200 },
      { name: "5kg", price: 3400 },
    ],
  },
  {
    id: "9",
    name: "Compost Orgánico",
    price: 1200,
    image: "/organic-compost-soil-bag-for-plants.jpg",
    category: "tierras",
    description: "Compost 100% orgánico, perfecto para enriquecer el suelo",
    options: [
      { name: "2kg", price: 1200 },
      { name: "5kg", price: 2800 },
      { name: "10kg", price: 4800 },
    ],
  },
  {
    id: "10",
    name: "Tierra para Orquídeas",
    price: 1100,
    image: "/orchid-soil-mix-bag-specialized-substrate.jpg",
    category: "tierras",
    description: "Mezcla especializada para orquídeas con corteza y musgo",
    options: [
      { name: "1kg", price: 1100 },
      { name: "2kg", price: 2000 },
      { name: "4kg", price: 3600 },
    ],
  },
  {
    id: "11",
    name: "Sustrato para Semillas",
    price: 750,
    image: "/seed-starting-soil-mix-fine-substrate-bag.jpg",
    category: "tierras",
    description: "Sustrato fino ideal para germinación de semillas",
    options: [
      { name: "1kg", price: 750 },
      { name: "2kg", price: 1350 },
      { name: "5kg", price: 3000 },
    ],
  },
  {
    id: "12",
    name: "Tierra Negra Premium",
    price: 1350,
    image: "/premium-black-soil-bag-rich-organic-matter.jpg",
    category: "tierras",
    description: "Tierra negra de primera calidad, rica en materia orgánica",
    options: [
      { name: "3kg", price: 1350 },
      { name: "8kg", price: 3200 },
      { name: "15kg", price: 5800 },
    ],
  },
  {
    id: "13",
    name: "Areca",
    price: 4500,
    image: "/placeholder-1fj5m.png",
    category: "plantas-interior",
    description: "Palmera elegante que purifica el aire, ideal para interiores luminosos.",
    options: [
      { name: "Pequeña (20cm)", price: 4500 },
      { name: "Mediana (35cm)", price: 6800 },
      { name: "Grande (50cm)", price: 9200 },
    ],
  },
  {
    id: "14",
    name: "Gomero",
    price: 3800,
    image: "/placeholder-ijxyl.png",
    category: "plantas-interior",
    description: "Planta robusta de hojas brillantes, perfecta para decoración moderna.",
    options: [
      { name: "Pequeña (25cm)", price: 3800 },
      { name: "Mediana (40cm)", price: 5500 },
      { name: "Grande (60cm)", price: 7800 },
    ],
  },
  {
    id: "15",
    name: "Palmito",
    price: 5200,
    image: "/placeholder-mkc3f.png",
    category: "plantas-interior",
    description: "Palmera compacta de crecimiento lento, ideal para espacios pequeños.",
    options: [
      { name: "Pequeña (18cm)", price: 5200 },
      { name: "Mediana (30cm)", price: 7200 },
      { name: "Grande (45cm)", price: 9800 },
    ],
  },
  {
    id: "16",
    name: "Yucca",
    price: 4200,
    image: "/placeholder-6gp1v.png",
    category: "plantas-interior",
    description: "Planta resistente con hojas en forma de espada, muy fácil de cuidar.",
    options: [
      { name: "Pequeña (30cm)", price: 4200 },
      { name: "Mediana (50cm)", price: 6500 },
      { name: "Grande (70cm)", price: 8900 },
    ],
  },
  {
    id: "17",
    name: "Raphis",
    price: 6800,
    image: "/placeholder-m9euz.png",
    category: "plantas-interior",
    description: "Palmera de interior elegante con múltiples tallos y hojas en abanico.",
    options: [
      { name: "Pequeña (25cm)", price: 6800 },
      { name: "Mediana (40cm)", price: 9200 },
      { name: "Grande (60cm)", price: 12500 },
    ],
  },
  {
    id: "18",
    name: "Spatiphyllum",
    price: 3200,
    image: "/placeholder-kjo4y.png",
    category: "plantas-interior",
    description: "Planta purificadora con elegantes flores blancas, perfecta para interiores.",
    options: [
      { name: "Pequeña (20cm)", price: 3200 },
      { name: "Mediana (30cm)", price: 4500 },
      { name: "Grande (45cm)", price: 6200 },
    ],
  },
  {
    id: "19",
    name: "Sansiveria",
    price: 2800,
    image: "/placeholder-j6qq5.png",
    category: "plantas-interior",
    description: "Planta muy resistente que tolera poca luz y riegos esporádicos.",
    options: [
      { name: "Pequeña (25cm)", price: 2800 },
      { name: "Mediana (40cm)", price: 4200 },
      { name: "Grande (60cm)", price: 6500 },
    ],
  },
  {
    id: "20",
    name: "Philodendro",
    price: 3500,
    image: "/placeholder-kjpjf.png",
    category: "plantas-interior",
    description: "Planta trepadora de hojas en forma de corazón, ideal para colgar.",
    options: [
      { name: "Pequeña (15cm)", price: 3500 },
      { name: "Mediana (25cm)", price: 4800 },
      { name: "Grande (35cm)", price: 6500 },
    ],
  },
  {
    id: "21",
    name: "Marginata",
    price: 4800,
    image: "/placeholder-wjmjl.png",
    category: "plantas-interior",
    description: "Árbol de interior con hojas largas y bordes rojizos, muy decorativo.",
    options: [
      { name: "Pequeña (30cm)", price: 4800 },
      { name: "Mediana (50cm)", price: 6800 },
      { name: "Grande (80cm)", price: 9500 },
    ],
  },
  {
    id: "22",
    name: "Aglonema",
    price: 3800,
    image: "/placeholder-qkis4.png",
    category: "plantas-interior",
    description: "Planta de hojas coloridas que aporta vida y color a cualquier espacio.",
    options: [
      { name: "Pequeña (20cm)", price: 3800 },
      { name: "Mediana (30cm)", price: 5200 },
      { name: "Grande (40cm)", price: 7200 },
    ],
  },
  {
    id: "23",
    name: "Alocasia",
    price: 5500,
    image: "/placeholder-bdqke.png",
    category: "plantas-interior",
    description: "Planta exótica de hojas grandes y vistosas, perfecta como punto focal.",
    options: [
      { name: "Pequeña (25cm)", price: 5500 },
      { name: "Mediana (40cm)", price: 7800 },
      { name: "Grande (60cm)", price: 10500 },
    ],
  },
  {
    id: "24",
    name: "Syngonium",
    price: 2900,
    image: "/placeholder-pxu6i.png",
    category: "plantas-interior",
    description: "Planta trepadora de hojas en forma de flecha, muy adaptable.",
    options: [
      { name: "Pequeña (15cm)", price: 2900 },
      { name: "Mediana (25cm)", price: 4200 },
      { name: "Grande (35cm)", price: 5800 },
    ],
  },
  {
    id: "25",
    name: "Calathea",
    price: 4200,
    image: "/placeholder-qdrlc.png",
    category: "plantas-interior",
    description: "Planta de hojas decorativas con patrones únicos, ideal para interiores húmedos.",
    options: [
      { name: "Pequeña (20cm)", price: 4200 },
      { name: "Mediana (30cm)", price: 5800 },
      { name: "Grande (40cm)", price: 7800 },
    ],
  },
  {
    id: "26",
    name: "Aphelandra",
    price: 3600,
    image: "/placeholder-rsmr9.png",
    category: "plantas-interior",
    description: "Planta llamativa con hojas rayadas y flores amarillas brillantes.",
    options: [
      { name: "Pequeña (18cm)", price: 3600 },
      { name: "Mediana (28cm)", price: 5200 },
      { name: "Grande (38cm)", price: 7200 },
    ],
  },
  {
    id: "27",
    name: "Tradiscantia",
    price: 2200,
    image: "/placeholder-rp60m.png",
    category: "plantas-interior",
    description: "Planta colgante de hojas coloridas, perfecta para cestas colgantes.",
    options: [
      { name: "Pequeña (12cm)", price: 2200 },
      { name: "Mediana (20cm)", price: 3200 },
      { name: "Grande (30cm)", price: 4500 },
    ],
  },
  {
    id: "28",
    name: "Helecho Asplenium",
    price: 3200,
    image: "/placeholder.svg?height=300&width=300",
    category: "plantas-interior",
    description: "Helecho de interior con frondas brillantes, ideal para baños y cocinas.",
    options: [
      { name: "Pequeña (15cm)", price: 3200 },
      { name: "Mediana (25cm)", price: 4500 },
      { name: "Grande (35cm)", price: 6200 },
    ],
  },
  {
    id: "29",
    name: "Strelitzia Nicolai",
    price: 8500,
    image: "/placeholder.svg?height=300&width=300",
    category: "plantas-exterior",
    description: "Ave del paraíso gigante con hojas enormes, perfecta para jardines tropicales.",
    options: [
      { name: "Pequeña (40cm)", price: 8500 },
      { name: "Mediana (80cm)", price: 12500 },
      { name: "Grande (120cm)", price: 18500 },
    ],
  },
  {
    id: "30",
    name: "Strelitzia Reginae",
    price: 6800,
    image: "/placeholder.svg?height=300&width=300",
    category: "plantas-exterior",
    description: "Ave del paraíso clásica con flores naranjas y azules espectaculares.",
    options: [
      { name: "Pequeña (30cm)", price: 6800 },
      { name: "Mediana (60cm)", price: 9800 },
      { name: "Grande (90cm)", price: 14500 },
    ],
  },
  {
    id: "31",
    name: "Alocasia Exterior",
    price: 7200,
    image: "/placeholder.svg?height=300&width=300",
    category: "plantas-exterior",
    description: "Alocasia de exterior con hojas gigantes, ideal para jardines tropicales.",
    options: [
      { name: "Pequeña (35cm)", price: 7200 },
      { name: "Mediana (60cm)", price: 10500 },
      { name: "Grande (90cm)", price: 15200 },
    ],
  },
  {
    id: "32",
    name: "Olivo",
    price: 12500,
    image: "/placeholder.svg?height=300&width=300",
    category: "plantas-exterior",
    description: "Árbol mediterráneo clásico, resistente y de gran valor ornamental.",
    options: [
      { name: "Pequeño (60cm)", price: 12500 },
      { name: "Mediano (100cm)", price: 18500 },
      { name: "Grande (150cm)", price: 28500 },
    ],
  },
  {
    id: "33",
    name: "Alpinia",
    price: 5800,
    image: "/placeholder.svg?height=300&width=300",
    category: "plantas-exterior",
    description: "Planta tropical de jengibre con flores rojas llamativas.",
    options: [
      { name: "Pequeña (40cm)", price: 5800 },
      { name: "Mediana (70cm)", price: 8500 },
      { name: "Grande (100cm)", price: 12200 },
    ],
  },
  {
    id: "34",
    name: "Beschorneria Yuccoides",
    price: 8200,
    image: "/placeholder.svg?height=300&width=300",
    category: "plantas-exterior",
    description: "Suculenta mexicana con espectaculares flores rojas en verano.",
    options: [
      { name: "Pequeña (30cm)", price: 8200 },
      { name: "Mediana (50cm)", price: 11500 },
      { name: "Grande (80cm)", price: 16800 },
    ],
  },
  {
    id: "35",
    name: "Buxus Sempervirens",
    price: 4500,
    image: "/placeholder.svg?height=300&width=300",
    category: "plantas-exterior",
    description: "Arbusto perenne ideal para setos y topiarios, muy resistente.",
    options: [
      { name: "Pequeño (25cm)", price: 4500 },
      { name: "Mediano (40cm)", price: 6800 },
      { name: "Grande (60cm)", price: 9500 },
    ],
  },
  {
    id: "36",
    name: "Pittosporum Tobira",
    price: 5200,
    image: "/placeholder.svg?height=300&width=300",
    category: "plantas-exterior",
    description: "Arbusto aromático con flores blancas fragantes, muy ornamental.",
    options: [
      { name: "Pequeño (30cm)", price: 5200 },
      { name: "Mediano (50cm)", price: 7500 },
      { name: "Grande (80cm)", price: 10800 },
    ],
  },
  {
    id: "37",
    name: "Farfugium Japonicum",
    price: 4800,
    image: "/placeholder.svg?height=300&width=300",
    category: "plantas-exterior",
    description: "Planta de sombra con hojas redondeadas y flores amarillas brillantes.",
    options: [
      { name: "Pequeña (20cm)", price: 4800 },
      { name: "Mediana (35cm)", price: 6800 },
      { name: "Grande (50cm)", price: 9200 },
    ],
  },
  {
    id: "38",
    name: "Laurel de Jardín",
    price: 3800,
    image: "/placeholder.svg?height=300&width=300",
    category: "plantas-exterior",
    description: "Árbol aromático clásico, perfecto para jardines mediterráneos y cocina.",
    options: [
      { name: "Pequeño (40cm)", price: 3800 },
      { name: "Mediano (70cm)", price: 6200 },
      { name: "Grande (100cm)", price: 9800 },
    ],
  },
]

const categories = [
  { value: "todos", label: "Todos los productos" },
  { value: "plantas", label: "Plantas" },
  { value: "plantas-interior", label: "Plantas de Interior" },
  { value: "plantas-exterior", label: "Plantas de Exterior" },
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
        matchesCategory =
          product.category === "plantas-interior" ||
          product.category === "chips" ||
          product.category === "plantas-exterior"
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
              className="group relative"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div
                  className="h-48 bg-cover bg-center relative group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url('${product.image}')` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => (window.location.href = `/producto/${product.id}`)}
                      className="bg-white text-black hover:bg-gray-100 shadow-lg"
                    >
                      Ver más
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {categories.find((cat) => cat.value === product.category)?.label}
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-2 text-balance">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 text-pretty">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      desde ${Math.min(...product.options!.map((option) => option.price)).toLocaleString()}
                    </span>
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
