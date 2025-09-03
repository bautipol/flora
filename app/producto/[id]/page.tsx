"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, ArrowLeft, ChevronDown, ChevronUp, Leaf, Info } from "lucide-react"
import { useCart, type Product, type ProductOption } from "@/contexts/cart-context"
import Image from "next/image"

// Same products array as in tienda page
const products: Product[] = [
  {
    id: "1",
    name: "Monstera Deliciosa",
    price: 3500,
    image: "/monstera-deliciosa-pot.png",
    category: "plantas-interior",
    description:
      "Planta de interior perfecta para espacios con luz indirecta. La Monstera Deliciosa es conocida por sus hojas grandes y perforadas que le dan un aspecto tropical único. Es ideal para principiantes ya que requiere cuidados básicos y se adapta bien a diferentes condiciones de luz.",
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
    image: "/ficus-lyrata-fiddle-leaf-fig-plant.png",
    category: "plantas-interior",
    description:
      "Elegante planta de hojas grandes, ideal para decoración. El Ficus Lyrata, también conocido como higuera de hoja de violín, es perfecto para darle un toque sofisticado a cualquier espacio interior.",
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
    image: "/white-ceramic-plant-pot.png",
    category: "macetas",
    description:
      "Maceta de cerámica blanca con diseño minimalista. Perfecta para complementar cualquier decoración moderna. Su acabado liso y elegante la convierte en la opción ideal para plantas de interior.",
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
    image: "/plant-soil-substrate-bag.png",
    category: "tierras",
    description:
      "Sustrato rico en nutrientes para todo tipo de plantas. Formulado especialmente para proporcionar el drenaje y la retención de humedad perfectos para el crecimiento saludable de tus plantas.",
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
    image: "/decorative-wood-chips-for-plants.png",
    category: "tierras",
    description:
      "Chips de madera natural para decoración y retención de humedad. Ideales para cubrir la superficie del sustrato y mantener la humedad mientras aportan un toque decorativo natural.",
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
    description:
      "Planta colgante de fácil cuidado, perfecta para principiantes. Sus hojas doradas y su capacidad de crecer en condiciones de poca luz la convierten en una excelente opción para cualquier hogar.",
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
    image: "/terracotta-clay-plant-pot.png",
    category: "macetas",
    description:
      "Maceta de terracota tradicional, ideal para plantas que necesitan drenaje. Su material poroso permite una excelente aireación de las raíces y un drenaje natural.",
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
    image: "/cactus-soil-mix-bag.png",
    category: "tierras",
    description:
      "Mezcla especial para cactus y suculentas con excelente drenaje. Formulada específicamente para plantas que requieren un sustrato bien drenado y con bajo contenido de humedad.",
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
    image: "/organic-compost-soil-bag-for-plants.png",
    category: "tierras",
    description:
      "Compost 100% orgánico, perfecto para enriquecer el suelo. Rico en nutrientes naturales que favorecen el crecimiento saludable y vigoroso de todas tus plantas.",
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
    image: "/orchid-soil-mix-bag-specialized-substrate.png",
    category: "tierras",
    description:
      "Mezcla especializada para orquídeas con corteza y musgo. Proporciona el drenaje perfecto y la aireación que necesitan estas plantas exóticas para florecer.",
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
    image: "/seed-starting-soil-mix-fine-substrate-bag.png",
    category: "tierras",
    description:
      "Sustrato fino ideal para germinación de semillas. Su textura fina y su composición balanceada proporcionan las condiciones perfectas para el inicio de nuevas plantas.",
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
    image: "/premium-black-soil-bag-rich-organic-matter.png",
    category: "tierras",
    description:
      "Tierra negra de primera calidad, rica en materia orgánica. Ideal para todo tipo de plantas, proporciona los nutrientes esenciales para un crecimiento óptimo.",
    options: [
      { name: "3kg", price: 1350 },
      { name: "8kg", price: 3200 },
      { name: "15kg", price: 5800 },
    ],
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [selectedOption, setSelectedOption] = useState<ProductOption | null>(null)
  const [currentPrice, setCurrentPrice] = useState(0)
  const [showCuidados, setShowCuidados] = useState(false)
  const [showInformacion, setShowInformacion] = useState(false)

  const product = products.find((p) => p.id === params.id)

  useEffect(() => {
    if (product) {
      // Set default option and price
      const defaultOption = product.options?.[0]
      setSelectedOption(defaultOption || null)
      setCurrentPrice(defaultOption?.price || product.price)
    }
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Button onClick={() => router.push("/tienda")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la tienda
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const handleOptionChange = (optionName: string) => {
    const option = product.options?.find((opt) => opt.name === optionName)
    if (option) {
      setSelectedOption(option)
      setCurrentPrice(option.price)
    }
  }

  const handleAddToCart = () => {
    addToCart(product, selectedOption || undefined)
  }

  const getCuidados = (category: string) => {
    if (category === "plantas-interior") {
      return [
        "Coloca tu planta en un lugar con luz indirecta brillante",
        "Riega cuando la tierra esté seca al tacto (aproximadamente 1-2 veces por semana)",
        "Mantén la humedad ambiental entre 40-60%",
        "Limpia las hojas regularmente con un paño húmedo",
        "Fertiliza mensualmente durante primavera y verano",
        "Rota la planta ocasionalmente para un crecimiento uniforme",
      ]
    } else if (category === "macetas") {
      return [
        "Asegúrate de que tenga orificios de drenaje adecuados",
        "Limpia regularmente para evitar acumulación de sales",
        "Verifica que el tamaño sea apropiado para tu planta",
        "Coloca un plato debajo para proteger superficies",
        "Reemplaza cuando la planta haya crecido demasiado",
      ]
    } else {
      return [
        "Almacena en un lugar seco y fresco",
        "Mantén el envase bien cerrado después de usar",
        "Mezcla bien antes de aplicar",
        "No uses en exceso, sigue las indicaciones",
        "Combina con buen drenaje para mejores resultados",
      ]
    }
  }

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
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            onClick={() => router.push("/tienda")}
            className="flex items-center gap-2 text-primary hover:text-primary-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a la tienda
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Card>
          </motion.div>

          {/* Product Details */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category === "plantas-interior"
                  ? "Plantas de Interior"
                  : product.category === "macetas"
                    ? "Macetas"
                    : product.category === "tierras"
                      ? "Tierras y Sustratos"
                      : "Productos"}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-serif">{product.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Options Selector */}
            {product.options && product.options.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Elegir una opción:</h3>
                <Select value={selectedOption?.name || ""} onValueChange={handleOptionChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.options.map((option) => (
                      <SelectItem key={option.name} value={option.name}>
                        {option.name} - ${option.price.toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Price */}
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">${currentPrice.toLocaleString()}</div>
              {selectedOption && (
                <p className="text-sm text-muted-foreground">Opción seleccionada: {selectedOption.name}</p>
              )}
            </div>

            {/* Add to Cart Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="w-full flex items-center gap-2 text-lg py-6"
                disabled={product.options && product.options.length > 0 && !selectedOption}
              >
                <ShoppingCart className="h-5 w-5" />
                Agregar al carrito
              </Button>
            </motion.div>

            <div className="space-y-4">
              {/* Cuidados Section */}
              <div className="border rounded-lg">
                <button
                  onClick={() => setShowCuidados(!showCuidados)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Cuidados</span>
                  </div>
                  {showCuidados ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                {showCuidados && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4"
                  >
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p className="font-medium text-foreground mb-3">
                        Tips y recomendaciones para cuidar la vida de tu planta:
                      </p>
                      <ul className="space-y-2">
                        {getCuidados(product.category).map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Información Section */}
              <div className="border rounded-lg">
                <button
                  onClick={() => setShowInformacion(!showInformacion)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Información</span>
                  </div>
                  {showInformacion ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                {showInformacion && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4"
                  >
                    <div className="text-sm text-muted-foreground space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        <span className="font-medium">Envío seguro</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        <span className="font-medium">Planta elegida a mano</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        <span className="font-medium">Fotos reales</span>
                      </div>
                      <p className="text-xs mt-3 text-muted-foreground">
                        Todas nuestras plantas son seleccionadas cuidadosamente y las fotos corresponden al producto
                        real que recibirás.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </div>
  )
}
