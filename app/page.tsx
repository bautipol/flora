"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Leaf, Users, Award, Heart, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

const heroImages = [
  {
    url: "/lush-green-garden-with-beautiful-plants-and-flower.png",
    title: "Transforma tu espacio con Flora",
    subtitle: "Descubrí nuestra pasión por las plantas y el diseño natural.",
    cta: "Plantas de interior",
    link: "/tienda?categoria=plantas-interior",
  },
  {
    url: "/beautiful-indoor-plants-in-decorative-pots.png",
    title: "Plantas que dan vida a tu hogar.",
    subtitle: "Encuentra la planta perfecta para cada rincón de tu casa con nuestro asesoramiento personalizado.",
    cta: "Ver plantas",
    link: "/tienda?categoria=plantas",
  },
  {
    url: "/decorative-plant-pots-and-containers.png",
    title: "Diseño y funcionalidad.",
    subtitle: "Macetas y accesorios únicos que complementan perfectamente tus plantas favoritas.",
    cta: "Ver macetas",
    link: "/tienda?categoria=macetas",
  },
  {
    url: "/garden-soil-and-plant-substrates.png",
    title: "Todo lo que tus plantas necesitan.",
    subtitle: "Sustratos premium y productos especializados para el crecimiento saludable de tus plantas.",
    cta: "Sustratos",
    link: "/tienda?categoria=tierras",
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 8000)
    return () => clearInterval(timer)
  }, []) // Removed heroImages.length dependency

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
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
              style={{
                backgroundImage: `url('${image.url}')`,
                opacity: index === currentSlide ? 1 : 0,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-8 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors duration-200"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-8 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors duration-200"
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        <div className="relative z-10 text-left max-w-2xl mx-auto px-8 ml-16">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 text-balance drop-shadow-lg leading-tight">
            {heroImages[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty drop-shadow-md">
            {heroImages[currentSlide].subtitle}
          </p>
          <div className="mb-8">
            <Link href={heroImages[currentSlide].link}>
              <Button
                variant="outline"
                className="bg-white/20 backdrop-blur-md border-white/50 text-white hover:bg-white hover:text-black transition-all duration-200 text-lg px-8 py-3 shadow-lg font-medium"
              >
                {heroImages[currentSlide].cta} →
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-200 hover:scale-110 ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      </motion.section>

      {/* About Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-serif">Nuestra historia.</h2>
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
                  "Nuestro trabajo refleja el amor genuino por la naturaleza y el cuidado del medio ambiente.",
              },
              {
                icon: Users,
                title: "Equipo Especializado",
                description:
                  "Ofrecemos asesoría personal y servicio profesional a arquitectos, empresas y particulares.",
              },
              {
                icon: Award,
                title: "Calidad Garantizada",
                description: "Seleccionamos cuidadosa y personalmente cada producto.",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <card.icon className="h-12 w-12 text-primary mx-auto mb-4" />
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
      <section id="sustratos" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-serif">Productos destacados.</h2>
            <p className="text-lg text-muted-foreground">Descubre nuestra selección de plantas y accesorios.</p>
          </motion.div>

          {/* Featured Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              {
                image: "/beautiful-indoor-plants-in-decorative-pots.png",
                title: "Plantas de interior",
                description: "Perfectas para dar vida a cualquier hogar.",
                price: "Desde $2,500",
              },
              {
                image: "/decorative-plant-pots-and-containers.png",
                title: "Macetas decorativas",
                description: "Diseños únicos para complementar tus plantas.",
                price: "Desde $1,200",
              },
              {
                image: "/garden-soil-and-plant-substrates.png",
                title: "Sustratos",
                description: "La base perfecta para el crecimiento saludable.",
                price: "Desde $800",
              },
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-200">
                  <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${product.image}')` }} />
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
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/tienda">
              <Button size="lg" className="transition-transform duration-200 hover:scale-105">
                Ver Todos los Productos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-serif">
              Algunos de nuestros servicios.
            </h2>
            <p className="text-lg text-muted-foreground">Servicios profesionales de paisajismo y diseño de jardines.</p>
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
                description: "Transformamos tus espacios:",
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
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-8">
                    <service.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>• {feature}</li>
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
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/contacto">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent transition-transform duration-200 hover:scale-105"
              >
                Solicitar Consulta
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
