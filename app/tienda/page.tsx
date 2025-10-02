"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Search } from 'lucide-react'
import { useCart, type Product } from "@/contexts/cart-context"

interface ExtendedProduct extends Product {
  care?: {
    water: string
    light: string
    temperature: string
    tips: string
  }
}

const products: ExtendedProduct[] = [
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
    image: "/ficus-lyrata-fiddle-leaf-fig-plant.jpg",
    category: "plantas-interior",
    description: "Elegante planta de hojas grandes, ideal para decoración",
    options: [
      { name: "Pequeña (20cm)", price: 4200 },
      { name: "Mediana (30cm)", price: 5800 },
      { name: "Grande (45cm)", price: 7500 },
    ],
    care: {
      water: "Mantener el sustrato ligeramente húmedo, regar cada 7-10 días",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "18-25°C, evitar cambios bruscos de temperatura",
      tips: "Evitar moverla una vez encontrada su ubicación ideal. Las hojas grandes pueden acumular polvo.",
    },
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
    care: {
      water: "Regar cuando la tierra esté seca al tacto, aproximadamente 1 vez por semana",
      light: "Luz indirecta, tolera condiciones de poca luz",
      temperature: "18-25°C, evitar corrientes de aire frío",
      tips: "Crece muy rápido y es fácil de propagar por esquejes. Ideal para cestas colgantes.",
    },
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
    image: "/areca-palm-plant-in-pot-indoor-houseplant.jpg",
    category: "plantas-interior",
    description: "Palmera elegante que purifica el aire, ideal para interiores luminosos.",
    options: [
      { name: "Pequeña (20cm)", price: 4500 },
      { name: "Mediana (35cm)", price: 6800 },
      { name: "Grande (50cm)", price: 9200 },
    ],
    care: {
      water: "Mantener el sustrato húmedo pero no encharcado, regar 2-3 veces por semana",
      light: "Luz indirecta brillante, tolera algo de sombra",
      temperature: "18-24°C, alta humedad ambiental",
      tips: "Pulverizar las hojas regularmente. Excelente purificadora de aire.",
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
      water: "Regar cuando los primeros 5cm de tierra estén secos, cada 7-10 días",
      light: "Luz brillante indirecta, tolera algo de sol directo matutino",
      temperature: "15-24°C, evitar cambios bruscos de temperatura",
      tips: "Limpiar las hojas con paño húmedo para mantener su brillo característico.",
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
      water: "Mantener sustrato ligeramente húmedo, regar 2 veces por semana",
      light: "Sombra parcial a luz indirecta, evitar sol directo",
      temperature: "16-24°C, tolera ambientes con poca luz",
      tips: "Ideal para oficinas y baños. Crece lentamente y requiere poco mantenimiento.",
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
      water: "Riego moderado cada 10-14 días, dejar secar entre riegos",
      light: "Luz brillante directa o indirecta, muy tolerante",
      temperature: "10-30°C, muy resistente a diferentes condiciones",
      tips: "Planta muy resistente y de bajo mantenimiento. Perfecta para principiantes.",
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
      water: "Regar regularmente manteniendo sustrato húmedo, 2-3 veces por semana",
      light: "Luz indirecta media a brillante, tolera sombra",
      temperature: "16-24°C, prefiere ambientes frescos",
      tips: "Palmera muy elegante y resistente. Crece lentamente formando múltiples tallos.",
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
      water: "Mantener sustrato húmedo, regar 2-3 veces por semana",
      light: "Sombra parcial a luz indirecta, evitar sol directo",
      temperature: "18-25°C, alta humedad ambiental",
      tips: "Excelente purificadora de aire. Las hojas caídas indican necesidad de riego.",
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
      water: "Riego escaso cada 2-3 semanas, dejar secar completamente entre riegos",
      light: "Tolera desde sombra hasta luz brillante indirecta",
      temperature: "15-30°C, muy resistente",
      tips: "Una de las plantas más resistentes. Ideal para principiantes y espacios con poca luz.",
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
      water: "Regar cuando la capa superior de tierra esté seca, cada 5-7 días",
      light: "Luz indirecta media a brillante",
      temperature: "18-27°C, evitar corrientes de aire",
      tips: "Puede trepar o colgar. Podar para mantener forma deseada.",
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
      water: "Riego moderado cada 7-10 días, evitar encharcamiento",
      light: "Luz indirecta brillante, tolera algo de sombra",
      temperature: "18-24°C, evitar temperaturas extremas",
      tips: "Planta arquitectónica ideal para espacios modernos. Crece verticalmente.",
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
      water: "Mantener sustrato ligeramente húmedo, regar 1-2 veces por semana",
      light: "Luz indirecta media, tolera poca luz",
      temperature: "18-24°C, evitar corrientes de aire frío",
      tips: "Hojas coloridas que no requieren mucha luz. Excelente para oficinas.",
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
      water: "Mantener sustrato húmedo pero no encharcado, regar 2-3 veces por semana",
      light: "Luz indirecta brillante, evitar sol directo",
      temperature: "20-27°C, alta humedad ambiental",
      tips: "Requiere alta humedad. Pulverizar hojas regularmente o usar humidificador.",
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
      water: "Regar cuando la tierra superficial esté seca, cada 5-7 días",
      light: "Luz indirecta media a brillante",
      temperature: "18-24°C, evitar temperaturas bajas",
      tips: "Puede trepar o colgar. Las hojas cambian de forma con la edad.",
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
      water: "Mantener sustrato húmedo, regar 2-3 veces por semana con agua filtrada",
      light: "Luz indirecta media, evitar sol directo",
      temperature: "18-24°C, alta humedad (60-70%)",
      tips: "Sensible al cloro del agua. Usar agua filtrada o reposada. Hojas se mueven con la luz.",
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
      water: "Mantener sustrato húmedo durante floración, regar 2-3 veces por semana",
      light: "Luz indirecta brillante",
      temperature: "18-24°C, alta humedad",
      tips: "Florece en primavera-verano. Requiere alta humedad para mantener hojas brillantes.",
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
      water: "Regar regularmente manteniendo sustrato húmedo, 2 veces por semana",
      light: "Luz indirecta brillante para mantener colores vivos",
      temperature: "15-24°C, muy adaptable",
      tips: "Podar regularmente para mantener forma compacta. Muy fácil de propagar.",
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
      water: "Mantener sustrato constantemente húmedo, regar 3-4 veces por semana",
      light: "Sombra parcial a luz indirecta, evitar sol directo",
      temperature: "16-24°C, alta humedad ambiental",
      tips: "Ideal para baños por su amor a la humedad. Pulverizar hojas regularmente.",
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
    care: {
      water: "Riego abundante en verano 2-3 veces por semana, reducir en invierno",
      light: "Sol directo o semisombra, muy tolerante",
      temperature: "10-30°C, proteger de heladas",
      tips: "Planta de gran tamaño que necesita espacio. Puede alcanzar varios metros de altura.",
    },
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
    care: {
      water: "Riego regular en verano 2 veces por semana, espaciar en invierno",
      light: "Sol directo o semisombra, florece mejor con sol",
      temperature: "10-28°C, tolera heladas ligeras",
      tips: "Florece mejor con sol directo. Las flores aparecen en plantas maduras (3-5 años).",
    },
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
    care: {
      water: "Riego abundante en verano 3-4 veces por semana, mantener sustrato húmedo",
      light: "Semisombra a sombra luminosa, evitar sol directo intenso",
      temperature: "15-30°C, proteger de heladas",
      tips: "Requiere alta humedad y protección del viento. Hojas pueden alcanzar gran tamaño.",
    },
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
    care: {
      water: "Riego moderado cada 7-10 días, muy resistente a sequía",
      light: "Sol directo, necesita mínimo 6 horas de sol",
      temperature: "-10 a 40°C, muy resistente",
      tips: "Árbol muy longevo y resistente. Podar en invierno para mantener forma.",
    },
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
    care: {
      water: "Riego abundante en verano 3 veces por semana, mantener húmedo",
      light: "Semisombra a sol filtrado",
      temperature: "15-30°C, proteger de heladas",
      tips: "Florece en verano. Requiere suelo rico en materia orgánica y buen drenaje.",
    },
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
    care: {
      water: "Riego moderado cada 10-14 días, muy resistente a sequía",
      light: "Sol directo a semisombra",
      temperature: "-5 a 35°C, muy resistente",
      tips: "Florece espectacularmente en verano con tallos rojos. Muy bajo mantenimiento.",
    },
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
    care: {
      water: "Riego regular 2 veces por semana, evitar encharcamiento",
      light: "Sol a semisombra, muy adaptable",
      temperature: "-15 a 35°C, muy resistente",
      tips: "Ideal para setos y topiarios. Podar 2-3 veces al año para mantener forma.",
    },
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
    care: {
      water: "Riego moderado 2 veces por semana en verano",
      light: "Sol a semisombra",
      temperature: "-5 a 35°C, resistente",
      tips: "Flores muy fragantes en primavera. Ideal para setos y pantallas verdes.",
    },
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
    care: {
      water: "Riego regular 2-3 veces por semana, mantener húmedo",
      light: "Sombra a semisombra, evitar sol directo",
      temperature: "-5 a 25°C, prefiere climas frescos",
      tips: "Ideal para zonas sombreadas del jardín. Florece en otoño con flores amarillas.",
    },
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
    care: {
      water: "Riego moderado cada 7-10 días, resistente a sequía",
      light: "Sol directo a semisombra",
      temperature: "-10 a 35°C, muy resistente",
      tips: "Hojas aromáticas usadas en cocina. Podar para mantener forma deseada.",
    },
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
  const router = useRouter()
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
                      onClick={() => router.push(`/producto/${product.id}`)}
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
                      <Button
                        size="sm"
                        onClick={() => addToCart(product as Product)}
                        className="flex items-center gap-2"
                      >
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
