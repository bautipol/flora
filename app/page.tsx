"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Leaf, Users, Award, Heart, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroImages = [
    {
      url: "/lush-green-garden-with-beautiful-plants-and-flower.png",
      title: "Pequeños toques, grandes momentos",
      subtitle: "Transforma tu espacio con Flora. Descubre nuestra pasión por las plantas y el diseño natural.",
      cta: "Plantas de interior",
    },
    {
      url: "/beautiful-indoor-plants-in-decorative-pots.png",
      title: "Plantas que dan vida a tu hogar",
      subtitle: "Encuentra la planta perfecta para cada rincón de tu casa con nuestro asesoramiento personalizado.",
      cta: "Ver plantas",
    },
    {
      url: "/decorative-plant-pots-and-containers.png",
      title: "Diseño y funcionalidad unidos",
      subtitle: "Macetas y accesorios únicos que complementan perfectamente tus plantas favoritas.",
      cta: "Ver macetas",
    },
    {
      url: "/garden-soil-and-plant-substrates.png",
      title: "Todo lo que tus plantas necesitan",
      subtitle: "Sustratos premium y productos especializados para el crecimiento saludable de tus plantas.",
      cta: "Ver productos",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroImages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section with Image Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url('${image.url}')`,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-8 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-8 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        <motion.div
          className="relative z-10 text-left max-w-2xl mx-auto px-8 ml-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-serif text-white mb-6 text-balance drop-shadow-lg leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            key={currentSlide}
          >
            {heroImages[currentSlide].title}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            key={`subtitle-${currentSlide}`}
          >
            {heroImages[currentSlide].subtitle}
          </motion.p>
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="/tienda">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-lg px-8 py-3"
                >
                  {heroImages[currentSlide].cta} →
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-serif">Nuestra Historia</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Flora nació de la unión de dos amigas apasionadas por el diseño y el amor por la naturaleza. Lo que
              comenzó como la comercialización de plantas e insumos para el jardín, evolucionó hacia el paisajismo,
              acercándonos aún más a la naturaleza.
            </p>
          </motion.div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Heart,
                title: "Pasión por la Naturaleza",
                description:
                  "Cada planta que ofrecemos refleja nuestro amor genuino por la naturaleza y el cuidado del medio ambiente.",
              },
              {
                icon: Users,
                title: "Equipo Especializado",
                description:
                  "Dos amigas unidas por la pasión del diseño, ofreciendo asesorías personalizadas y servicios profesionales.",
              },
              {
                icon: Award,
                title: "Calidad Garantizada",
                description:
                  "Seleccionamos cuidadosamente cada producto para garantizar la mejor calidad y durabilidad.",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
                      <card.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                    <p className="text-muted-foreground">{card.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-serif">Productos Destacados</h2>
            <p className="text-lg text-muted-foreground">
              Descubre nuestra selección de plantas y accesorios más populares
            </p>
          </motion.div>

          {/* Featured Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              {
                image: "/beautiful-indoor-plants-in-decorative-pots.png",
                title: "Plantas de Interior",
                description: "Perfectas para dar vida a cualquier espacio interior",
                price: "Desde $2,500",
              },
              {
                image: "/decorative-plant-pots-and-containers.png",
                title: "Macetas Decorativas",
                description: "Diseños únicos para complementar tus plantas",
                price: "Desde $1,200",
              },
              {
                image: "/garden-soil-and-plant-substrates.png",
                title: "Tierras y Sustratos",
                description: "La base perfecta para el crecimiento saludable",
                price: "Desde $800",
              },
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <motion.div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url('${product.image}')` }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                    <p className="text-muted-foreground mb-4">{product.description}</p>
                    <p className="text-primary font-semibold">{product.price}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/tienda">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg">
                  Ver Todos los Productos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-serif">Nuestros Servicios</h2>
            <p className="text-lg text-muted-foreground">Servicios profesionales de paisajismo y diseño de jardines</p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Leaf,
                title: "Asesorías Personalizadas",
                description:
                  "Te ayudamos a elegir las plantas perfectas para tu espacio, considerando luz, humedad y cuidados específicos.",
                features: [
                  "Evaluación del espacio",
                  "Selección de plantas adecuadas",
                  "Guía de cuidados",
                  "Seguimiento personalizado",
                ],
              },
              {
                icon: Users,
                title: "Diseño y Remodelación",
                description:
                  "Transformamos jardines, terrazas y balcones en espacios únicos que reflejan tu personalidad y estilo.",
                features: [
                  "Diseño de jardines",
                  "Remodelación de terrazas",
                  "Decoración de balcones",
                  "Proyectos integrales",
                ],
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
                      <service.icon className="h-12 w-12 text-primary mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          • {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/contacto">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="bg-transparent">
                  Solicitar Consulta
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
