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
import { ShoppingCart, ArrowLeft, MessageCircle, Droplets, Sun, Thermometer, Lightbulb } from "lucide-react"
import { useCart, type Product, type ProductOption } from "@/contexts/cart-context"
import Image from "next/image"

interface ExtendedProduct extends Product {
  care?: {
    water: string
    light: string
    temperature: string
    tips: string
  }
  consultPrice?: boolean
}

const products: ExtendedProduct[] = [
  {
    id: "1",
    name: "Monstera Deliciosa",
    price: 3500,
    image: "/monstera-deliciosa-pot.png",
    category: "plantas-interior",
    description: "Planta de interior perfecta para espacios con luz indirecta",
    options: [
      { name: "Pequeña (15cm)", price: 3500 },
      { name: "Mediana (25cm)", price: 4800 },
      { name: "Grande (35cm)", price: 6200 },
    ],
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-27°C, proteger de corrientes de aire frío",
      tips: "Limpiar las hojas regularmente para mantener su brillo. Puede trepar con soporte.",
    },
  },
  {
    id: "2",
    name: "Ficus Lyrata",
    price: 4200,
    image: "/ficus-lyrata-fiddle-leaf-fig-plant.png",
    category: "plantas-interior",
    description: "Elegante planta de hojas grandes, ideal para decoración.",
    options: [
      { name: "Pequeña (20cm)", price: 4200 },
      { name: "Mediana (30cm)", price: 5800 },
      { name: "Grande (45cm)", price: 7500 },
    ],
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-27°C, proteger de corrientes de aire frío",
      tips: "Limpiar las hojas regularmente para mantener su brillo. Puede trepar con soporte.",
    },
  },
  {
    id: "3",
    name: "Maceta Cerámica Blanca",
    price: 1800,
    image: "/white-ceramic-plant-pot.png",
    category: "macetas",
    description: "Maceta de cerámica blanca con diseño minimalista.",
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
    description: "Sustrato rico en nutrientes para todo tipo de plantas.",
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
    description: "Chips de madera natural para decoración y retención de humedad.",
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
    description: "Planta colgante de fácil cuidado, perfecta para principiantes.",
    options: [
      { name: "Pequeña (15cm)", price: 2200 },
      { name: "Mediana (25cm)", price: 3200 },
      { name: "Grande (35cm)", price: 4500 },
    ],
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-27°C, proteger de corrientes de aire frío",
      tips: "Limpiar las hojas regularmente para mantener su brillo. Puede trepar con soporte.",
    },
  },
  {
    id: "7",
    name: "Maceta Terracota",
    price: 1200,
    image: "/terracotta-clay-plant-pot.png",
    category: "macetas",
    description: "Maceta de terracota tradicional, ideal para plantas que necesitan drenaje.",
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
    description: "Mezcla especial para cactus y suculentas con excelente drenaje.",
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
    description: "Compost 100% orgánico, perfecto para enriquecer el suelo.",
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
    description: "Mezcla especializada para orquídeas con corteza y musgo.",
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
    description: "Sustrato fino ideal para germinación de semillas.",
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
    description: "Tierra negra de primera calidad, rica en materia orgánica.",
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
    image: "/areca-palm-plant-in-pot-indoor-houseplant.jpg",
    category: "plantas-interior",
    description: "Palmera elegante que purifica el aire, ideal para interiores luminosos.",
    options: [
      { name: "Pequeña (20cm)", price: 4500 },
      { name: "Mediana (35cm)", price: 6800 },
      { name: "Grande (50cm)", price: 9200 },
    ],
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-27°C, proteger de corrientes de aire frío",
      tips: "Limpiar las hojas regularmente para mantener su brillo. Puede trepar con soporte.",
    },
  },
  {
    id: "14",
    name: "Gomero",
    price: 3800,
    image: "/ficus-elastica-rubber-plant-glossy-leaves-pot.jpg",
    category: "plantas-interior",
    description: "Planta robusta de hojas brillantes, perfecta para decoración moderna.",
    options: [
      { name: "Pequeña (25cm)", price: 3800 },
      { name: "Mediana (40cm)", price: 5500 },
      { name: "Grande (60cm)", price: 7800 },
    ],
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-27°C, proteger de corrientes de aire frío",
      tips: "Limpiar las hojas regularmente para mantener su brillo. Puede trepar con soporte.",
    },
  },
  {
    id: "15",
    name: "Palmito",
    price: 5200,
    image: "/chamaedorea-elegans-parlor-palm-small-indoor-plant.jpg",
    category: "plantas-interior",
    description: "Palmera compacta de crecimiento lento, ideal para espacios pequeños.",
    options: [
      { name: "Pequeña (18cm)", price: 5200 },
      { name: "Mediana (30cm)", price: 7200 },
      { name: "Grande (45cm)", price: 9800 },
    ],
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-27°C, proteger de corrientes de aire frío",
      tips: "Limpiar las hojas regularmente para mantener su brillo. Puede trepar con soporte.",
    },
  },
  {
    id: "16",
    name: "Yucca",
    price: 4200,
    image: "/yucca-plant-sword-shaped-leaves-indoor-houseplant.jpg",
    category: "plantas-interior",
    description: "Planta resistente con hojas en forma de espada, muy fácil de cuidar.",
    options: [
      { name: "Pequeña (30cm)", price: 4200 },
      { name: "Mediana (50cm)", price: 6500 },
      { name: "Grande (70cm)", price: 8900 },
    ],
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-27°C, proteger de corrientes de aire frío",
      tips: "Limpiar las hojas regularmente para mantener su brillo. Puede trepar con soporte.",
    },
  },
  {
    id: "17",
    name: "Raphis",
    price: 6800,
    image: "/rhapis-excelsa-lady-palm-fan-shaped-leaves-indoor.jpg",
    category: "plantas-interior",
    description: "Palmera de interior elegante con múltiples tallos y hojas en abanico.",
    options: [
      { name: "Pequeña (25cm)", price: 6800 },
      { name: "Mediana (40cm)", price: 9200 },
      { name: "Grande (60cm)", price: 12500 },
    ],
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-27°C, proteger de corrientes de aire frío",
      tips: "Limpiar las hojas regularmente para mantener su brillo. Puede trepar con soporte.",
    },
  },
  {
    id: "18",
    name: "Spatiphyllum",
    price: 3200,
    image: "/spathiphyllum-peace-lily-white-flowers-green-leave.jpg",
    category: "plantas-interior",
    description: "Planta purificadora con elegantes flores blancas, perfecta para interiores.",
    options: [
      { name: "Pequeña (20cm)", price: 3200 },
      { name: "Mediana (30cm)", price: 4500 },
      { name: "Grande (45cm)", price: 6200 },
    ],
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-27°C, proteger de corrientes de aire frío",
      tips: "Limpiar las hojas regularmente para mantener su brillo. Puede trepar con soporte.",
    },
  },
  {
    id: "19",
    name: "Sansiveria",
    price: 2800,
    image: "/sansevieria-snake-plant-tall-upright-leaves-indoor.jpg",
    category: "plantas-interior",
    description: "Planta muy resistente que tolera poca luz y riegos esporádicos.",
    options: [
      { name: "Pequeña (25cm)", price: 2800 },
      { name: "Mediana (40cm)", price: 4200 },
      { name: "Grande (60cm)", price: 6500 },
    ],
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-27°C, proteger de corrientes de aire frío",
      tips: "Limpiar las hojas regularmente para mantener su brillo. Puede trepar con soporte.",
    },
  },
  {
    id: "20",
    name: "Philodendro",
    price: 3500,
    image: "/philodendron-heart-shaped-leaves-climbing-plant-po.jpg",
    category: "plantas-interior",
    description: "Planta trepadora de hojas en forma de corazón, ideal para colgar.",
    options: [
      { name: "Pequeña (15cm)", price: 3500 },
      { name: "Mediana (25cm)", price: 4800 },
      { name: "Grande (35cm)", price: 6500 },
    ],
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-27°C, proteger de corrientes de aire frío",
      tips: "Limpiar las hojas regularmente para mantener su brillo. Puede trepar con soporte.",
    },
  },
  {
    id: "21",
    name: "Marginata",
    price: 4800,
    image: "/dracaena-marginata-dragon-tree-red-edges-leaves-in.jpg",
    category: "plantas-interior",
    description: "Árbol de interior con hojas largas y bordes rojizos, muy decorativo.",
    options: [
      { name: "Pequeña (30cm)", price: 4800 },
      { name: "Mediana (50cm)", price: 6800 },
      { name: "Grande (80cm)", price: 9500 },
    ],
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-27°C, proteger de corrientes de aire frío",
      tips: "Limpiar las hojas regularmente para mantener su brillo. Puede trepar con soporte.",
    },
  },
  {
    id: "22",
    name: "Aglonema",
    price: 3800,
    image: "/aglaonema-colorful-variegated-leaves-indoor-housep.jpg",
    category: "plantas-interior",
    description: "Planta de hojas coloridas que aporta vida y color a cualquier espacio.",
    options: [
      { name: "Pequeña (20cm)", price: 3800 },
      { name: "Mediana (30cm)", price: 5200 },
      { name: "Grande (40cm)", price: 7200 },
    ],
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-27°C, proteger de corrientes de aire frío",
      tips: "Limpiar las hojas regularmente para mantener su brillo. Puede trepar con soporte.",
    },
  },
  {
    id: "23",
    name: "Alocasia",
    price: 5500,
    image: "/alocasia-elephant-ear-large-leaves-indoor-tropical.jpg",
    category: "plantas-interior",
    description: "Planta exótica de hojas grandes y vistosas, perfecta como punto focal.",
    options: [
      { name: "Pequeña (25cm)", price: 5500 },
      { name: "Mediana (40cm)", price: 7800 },
      { name: "Grande (60cm)", price: 10500 },
    ],
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-27°C, proteger de corrientes de aire frío",
      tips: "Limpiar las hojas regularmente para mantener su brillo. Puede trepar con soporte.",
    },
  },
  {
    id: "24",
    name: "Syngonium",
    price: 2900,
    image: "/syngonium-arrowhead-plant-climbing-vine-indoor-pot.jpg",
    category: "plantas-interior",
    description: "Planta trepadora de hojas en forma de flecha, muy adaptable.",
    options: [
      { name: "Pequeña (15cm)", price: 2900 },
      { name: "Mediana (25cm)", price: 4200 },
      { name: "Grande (35cm)", price: 5800 },
    ],
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-27°C, proteger de corrientes de aire frío",
      tips: "Limpiar las hojas regularmente para mantener su brillo. Puede trepar con soporte.",
    },
  },
  {
    id: "25",
    name: "Calathea",
    price: 4200,
    image: "/calathea-prayer-plant-patterned-leaves-indoor-hous.jpg",
    category: "plantas-interior",
    description: "Planta de hojas decorativas con patrones únicos, ideal para interiores húmedos.",
    options: [
      { name: "Pequeña (20cm)", price: 4200 },
      { name: "Mediana (30cm)", price: 5800 },
      { name: "Grande (40cm)", price: 7800 },
    ],
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-27°C, proteger de corrientes de aire frío",
      tips: "Limpiar las hojas regularmente para mantener su brillo. Puede trepar con soporte.",
    },
  },
  {
    id: "26",
    name: "Aphelandra",
    price: 3600,
    image: "/aphelandra-zebra-plant-striped-leaves-yellow-flowe.jpg",
    category: "plantas-interior",
    description: "Planta llamativa con hojas rayadas y flores amarillas brillantes.",
    options: [
      { name: "Pequeña (18cm)", price: 3600 },
      { name: "Mediana (28cm)", price: 5200 },
      { name: "Grande (38cm)", price: 7200 },
    ],
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-27°C, proteger de corrientes de aire frío",
      tips: "Limpiar las hojas regularmente para mantener su brillo. Puede trepar con soporte.",
    },
  },
  {
    id: "27",
    name: "Tradiscantia",
    price: 2200,
    image: "/tradiscantia-wandering-jew-colorful-trailing-plant.jpg",
    category: "plantas-interior",
    description: "Planta colgante de hojas coloridas, perfecta para cestas colgantes.",
    options: [
      { name: "Pequeña (12cm)", price: 2200 },
      { name: "Mediana (20cm)", price: 3200 },
      { name: "Grande (30cm)", price: 4500 },
    ],
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-27°C, proteger de corrientes de aire frío",
      tips: "Limpiar las hojas regularmente para mantener su brillo. Puede trepar con soporte.",
    },
  },
  {
    id: "28",
    name: "Helecho Asplenium",
    price: 3200,
    image: "/asplenium-fern-bright-green-fronds-indoor-housepla.jpg",
    category: "plantas-interior",
    description: "Helecho de interior con frondas brillantes, ideal para baños y cocinas.",
    options: [
      { name: "Pequeña (15cm)", price: 3200 },
      { name: "Mediana (25cm)", price: 4500 },
      { name: "Grande (35cm)", price: 6200 },
    ],
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-27°C, proteger de corrientes de aire frío",
      tips: "Limpiar las hojas regularmente para mantener su brillo. Puede trepar con soporte.",
    },
  },
  {
    id: "29",
    name: "Strelitzia Nicolai",
    price: 8500,
    image: "/strelitzia-nicolai-giant-bird-of-paradise-large-le.jpg",
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
    image: "/strelitzia-reginae-bird-of-paradise-orange-blue-fl.jpg",
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
    image: "/alocasia-elephant-ear-large-tropical-leaves-outdoo.jpg",
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
    image: "/olive-tree-mediterranean-silver-green-leaves-outdo.jpg",
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
    image: "/alpinia-ginger-plant-red-flowers-tropical-outdoor-.jpg",
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
    image: "/beschorneria-yuccoides-mexican-succulent-red-flowe.jpg",
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
    image: "/buxus-sempervirens-boxwood-evergreen-shrub-small-l.jpg",
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
    image: "/pittosporum-tobira-white-fragrant-flowers-green-le.jpg",
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
    image: "/farfugium-japonicum-round-leaves-yellow-flowers-sh.jpg",
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
    image: "/bay-laurel-tree-aromatic-leaves-mediterranean-outd.jpg",
    category: "plantas-exterior",
    description: "Árbol aromático clásico, perfecto para jardines mediterráneos y cocina.",
    options: [
      { name: "Pequeño (40cm)", price: 3800 },
      { name: "Mediano (70cm)", price: 6200 },
      { name: "Grande (100cm)", price: 9800 },
    ],
  },
  {
    id: "39",
    name: "Maceta Cemento Redonda",
    price: 0,
    image: "/round-concrete-cement-pot-planter-gray-modern-mini.jpg",
    category: "macetas-cemento",
    description: "Maceta de cemento redonda con acabado liso, ideal para interiores y exteriores.",
    consultPrice: true,
    options: [
      { name: "Chica (15cm)", price: 0 },
      { name: "Mediana (20cm)", price: 0 },
      { name: "Grande (30cm)", price: 0 },
    ],
  },
  {
    id: "40",
    name: "Maceta Cemento Cuadrada",
    price: 0,
    image: "/square-concrete-cement-pot-planter-gray-modern-geo.jpg",
    category: "macetas-cemento",
    description: "Maceta de cemento cuadrada con diseño geométrico moderno.",
    consultPrice: true,
    options: [
      { name: "Chica (15cm)", price: 0 },
      { name: "Mediana (20cm)", price: 0 },
      { name: "Grande (30cm)", price: 0 },
    ],
  },
  {
    id: "41",
    name: "Maceta Cemento Cilíndrica",
    price: 0,
    image: "/cylindrical-concrete-cement-pot-planter-tall-gray-.jpg",
    category: "macetas-cemento",
    description: "Maceta de cemento cilíndrica alta, perfecta para plantas grandes.",
    consultPrice: true,
    options: [
      { name: "Chica (20cm)", price: 0 },
      { name: "Mediana (30cm)", price: 0 },
      { name: "Grande (40cm)", price: 0 },
    ],
  },
  {
    id: "42",
    name: "Maceta Cemento Texturizada",
    price: 0,
    image: "/textured-concrete-cement-pot-planter-rough-surface.jpg",
    category: "macetas-cemento",
    description: "Maceta de cemento con textura rugosa, estilo industrial moderno.",
    consultPrice: true,
    options: [
      { name: "Chica (15cm)", price: 0 },
      { name: "Mediana (20cm)", price: 0 },
      { name: "Grande (30cm)", price: 0 },
    ],
  },
  {
    id: "43",
    name: "Maceta Cemento Cónica",
    price: 0,
    image: "/conical-concrete-cement-pot-planter-tapered-gray-m.jpg",
    category: "macetas-cemento",
    description: "Maceta de cemento cónica con diseño elegante y contemporáneo.",
    consultPrice: true,
    options: [
      { name: "Chica (18cm)", price: 0 },
      { name: "Mediana (25cm)", price: 0 },
      { name: "Grande (35cm)", price: 0 },
    ],
  },
  {
    id: "44",
    name: "Maceta Cemento Bowl",
    price: 0,
    image: "/bowl-concrete-cement-pot-planter-wide-shallow-gray.jpg",
    category: "macetas-cemento",
    description: "Maceta de cemento tipo bowl, ideal para suculentas y cactus.",
    consultPrice: true,
    options: [
      { name: "Chica (20cm)", price: 0 },
      { name: "Mediana (30cm)", price: 0 },
      { name: "Grande (40cm)", price: 0 },
    ],
  },
  {
    id: "45",
    name: "Maceta Plástico Negro",
    price: 800,
    image: "/black-plastic-pot-planter-lightweight-modern.jpg",
    category: "macetas-livianas",
    description: "Maceta de plástico negro ligera, ideal para todo tipo de plantas.",
    options: [
      { name: "Chica (10cm)", price: 800 },
      { name: "Mediana (15cm)", price: 1200 },
      { name: "Grande (20cm)", price: 1800 },
    ],
  },
  {
    id: "46",
    name: "Maceta Resina Blanca",
    price: 1500,
    image: "/white-resin-pot-planter-lightweight-modern-clean.jpg",
    category: "macetas-livianas",
    description: "Maceta de resina blanca con acabado mate, muy liviana y resistente.",
    options: [
      { name: "Chica (12cm)", price: 1500 },
      { name: "Mediana (18cm)", price: 2200 },
      { name: "Grande (25cm)", price: 3000 },
    ],
  },
  {
    id: "47",
    name: "Maceta Plástico Colores",
    price: 900,
    image: "/colorful-plastic-pot-planter-bright-modern-fun.jpg",
    category: "macetas-livianas",
    description: "Maceta de plástico en colores vibrantes, perfecta para alegrar espacios.",
    options: [
      { name: "Chica (10cm)", price: 900 },
      { name: "Mediana (15cm)", price: 1400 },
      { name: "Grande (20cm)", price: 2000 },
    ],
  },
  {
    id: "48",
    name: "Maceta Resina Gris",
    price: 1600,
    image: "/gray-resin-pot-planter-lightweight-modern-neutral.jpg",
    category: "macetas-livianas",
    description: "Maceta de resina gris con diseño minimalista y moderno.",
    options: [
      { name: "Chica (12cm)", price: 1600 },
      { name: "Mediana (18cm)", price: 2400 },
      { name: "Grande (25cm)", price: 3200 },
    ],
  },
  {
    id: "49",
    name: "Pack Pothos + Maceta Cerámica",
    price: 3800,
    image: "/pothos-plant-in-white-ceramic-pot-combo-pack.jpg",
    category: "plantas-con-macetas",
    description: "Pothos dorado en maceta de cerámica blanca, listo para decorar.",
    options: [
      { name: "Pack Pequeño", price: 3800 },
      { name: "Pack Mediano", price: 5200 },
      { name: "Pack Grande", price: 6800 },
    ],
  },
  {
    id: "50",
    name: "Pack Sansiveria + Maceta Cemento",
    price: 4500,
    image: "/sansevieria-snake-plant-in-concrete-pot-combo-pack.jpg",
    category: "plantas-con-macetas",
    description: "Sansiveria en maceta de cemento, combinación perfecta de estilo y resistencia.",
    consultPrice: true,
  },
  {
    id: "51",
    name: "Pack Monstera + Maceta Terracota",
    price: 4800,
    image: "/monstera-deliciosa-in-terracotta-pot-combo-pack.jpg",
    category: "plantas-con-macetas",
    description: "Monstera deliciosa en maceta de terracota, estilo clásico y elegante.",
    options: [
      { name: "Pack Pequeño", price: 4800 },
      { name: "Pack Mediano", price: 6500 },
      { name: "Pack Grande", price: 8500 },
    ],
  },
  {
    id: "52",
    name: "Pack Spatiphyllum + Maceta Blanca",
    price: 4200,
    image: "/peace-lily-spathiphyllum-in-white-pot-combo-pack.jpg",
    category: "plantas-con-macetas",
    description: "Spatiphyllum en maceta blanca, purifica el aire con estilo.",
    options: [
      { name: "Pack Pequeño", price: 4200 },
      { name: "Pack Mediano", price: 5800 },
      { name: "Pack Grande", price: 7500 },
    ],
  },
  {
    id: "53",
    name: "Pack Suculentas + Maceta Cemento",
    price: 2800,
    image: "/succulent-plants-in-concrete-bowl-pot-combo-pack.jpg",
    category: "plantas-con-macetas",
    description: "Variedad de suculentas en maceta de cemento tipo bowl.",
    consultPrice: true,
  },
  {
    id: "54",
    name: "Pack Ficus + Maceta Resina",
    price: 5500,
    image: "/ficus-lyrata-fiddle-leaf-fig-plant-in-modern-white.jpg",
    category: "plantas-con-macetas",
    description: "Ficus lyrata en maceta de resina moderna, elegancia garantizada.",
    options: [
      { name: "Pack Pequeño", price: 5500 },
      { name: "Pack Mediano", price: 7800 },
      { name: "Pack Grande", price: 10200 },
    ],
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [selectedOption, setSelectedOption] = useState<ProductOption | null>(null)
  const [currentPrice, setCurrentPrice] = useState(0)

  const product = products.find((p) => p.id === params.id)

  useEffect(() => {
    if (product) {
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

  const handleConsultPrice = () => {
    const sizeInfo = selectedOption ? ` - Tamaño: ${selectedOption.name}` : ""
    const message = `Hola! Me interesa consultar el precio de: ${product.name}${sizeInfo}. Podrian darme mas informacion?`
    const whatsappUrl = `https://wa.me/5491135617412?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const shouldShowSizeSelector =
    (product.category === "plantas-interior" ||
      product.category === "plantas-exterior" ||
      product.category === "macetas-livianas" ||
      product.category === "macetas-cemento") &&
    product.options &&
    product.options.length > 0

  const getCategoryLabel = () => {
    switch (product.category) {
      case "plantas-interior":
        return "Plantas de Interior"
      case "plantas-exterior":
        return "Plantas de Exterior"
      case "macetas-cemento":
        return "Macetas de Cemento"
      case "macetas-livianas":
        return "Macetas Livianas"
      case "plantas-con-macetas":
        return "Plantas con Macetas"
      case "tierras":
        return "Tierras y Sustratos"
      default:
        return "Producto"
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <motion.div
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            variant="ghost"
            onClick={() => router.push("/tienda")}
            className="flex items-center gap-2 text-primary hover:text-primary/80"
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
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            </Card>
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div>
              <Badge variant="secondary" className="mb-3">
                {getCategoryLabel()}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-sans">{product.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {shouldShowSizeSelector && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Tamaños disponibles:</h3>
                <Select value={selectedOption?.name || ""} onValueChange={handleOptionChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un tamaño" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.options.map((option) => (
                      <SelectItem key={option.name} value={option.name}>
                        {product.consultPrice ? option.name : `${option.name} - $${option.price.toLocaleString()}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Price Display */}
            <div className="space-y-2">
              {product.consultPrice ? (
                <div className="text-3xl font-bold text-primary">Consultar precio</div>
              ) : (
                <>
                  <div className="text-3xl font-bold text-primary">${currentPrice.toLocaleString()}</div>
                  {selectedOption && shouldShowSizeSelector && (
                    <p className="text-sm text-muted-foreground">Tamaño seleccionado: {selectedOption.name}</p>
                  )}
                </>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {product.consultPrice ? (
                <Button
                  size="lg"
                  onClick={handleConsultPrice}
                  className="w-full flex items-center gap-2 text-lg py-6 bg-green-600 hover:bg-green-700"
                  disabled={shouldShowSizeSelector && !selectedOption}
                >
                  <MessageCircle className="h-5 w-5" />
                  Consultar precio por WhatsApp
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="w-full flex items-center gap-2 text-lg py-6"
                  disabled={shouldShowSizeSelector && !selectedOption}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Agregar al carrito
                </Button>
              )}
            </motion.div>

            {product.care && (
              <Card className="p-6 bg-muted/50">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Cuidados de la planta
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Droplets className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Riego</p>
                      <p className="text-sm text-muted-foreground">{product.care.water}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Sun className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Luz</p>
                      <p className="text-sm text-muted-foreground">{product.care.light}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Thermometer className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Temperatura</p>
                      <p className="text-sm text-muted-foreground">{product.care.temperature}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Lightbulb className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Consejos</p>
                      <p className="text-sm text-muted-foreground">{product.care.tips}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </div>
  )
}
