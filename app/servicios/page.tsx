"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Users, Lightbulb, Palette, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Lightbulb,
    title: "Asesorías Personalizadas",
    description: "Te ayudamos a elegir las plantas perfectas para tu espacio",
    features: [
      "Evaluación completa del espacio",
      "Selección de plantas según luz y humedad",
      "Guía detallada de cuidados",
      "Seguimiento personalizado",
      "Recomendaciones de ubicación",
    ],
  },
  {
    icon: Palette,
    title: "Diseño de Jardines",
    description: "Creamos jardines únicos que reflejan tu personalidad",
    features: [
      "Diseño personalizado 3D",
      "Selección de plantas y materiales",
      "Planificación de espacios",
      "Cronograma de implementación",
      "Supervisión de instalación",
    ],
  },
  {
    icon: Users,
    title: "Remodelación de Terrazas",
    description: "Transformamos tu terraza en un oasis verde",
    features: [
      "Análisis de estructura existente",
      "Optimización del espacio",
      "Sistemas de riego automático",
      "Iluminación especializada",
      "Mobiliario de jardín",
    ],
  },
  {
    icon: Leaf,
    title: "Decoración de Balcones",
    description: "Aprovecha al máximo tu balcón con plantas y diseño",
    features: [
      "Plantas adaptadas a espacios pequeños",
      "Sistemas de soporte vertical",
      "Macetas y contenedores especiales",
      "Plantas colgantes y trepadoras",
      "Mantenimiento simplificado",
    ],
  },
]

export default function ServiciosPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <motion.section
        className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-primary mb-6 font-sans text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Nuestros servicios.
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ofrecemos servicios profesionales de paisajismo y diseño de jardines. Desde asesorías personalizadas hasta
            proyectos integrales de remodelación.
          </motion.p>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <motion.div
                          className="p-3 bg-primary/10 rounded-lg"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <IconComponent className="h-8 w-8 text-primary" />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold text-primary mb-1">{service.title}</h3>
                          <p className="text-muted-foreground">{service.description}</p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      <Link href="/contacto">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button className="w-full">
                            Solicitar Consulta
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </motion.div>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-sans">Nuestro proceso.</h2>
            <p className="text-lg text-muted-foreground">
              Trabajamos contigo paso a paso para crear el jardín de tus sueños.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                number: "1",
                title: "Consulta Inicial",
                description: "Conversamos sobre tus ideas, necesidades y presupuesto.",
              },
              {
                number: "2",
                title: "Evaluación",
                description: "Visitamos tu espacio y analizamos las condiciones.",
              },
              {
                number: "3",
                title: "Propuesta",
                description: "Creamos un diseño personalizado con presupuesto detallado.",
              },
              {
                number: "4",
                title: "Implementación",
                description: "Ejecutamos el proyecto con seguimiento constante.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.number}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-primary mb-6 font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            ¿Listo para transformar tu espacio?
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contáctanos hoy mismo para una consulta gratuita y descubre cómo podemos ayudarte a crear el jardín
            perfecto.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/contacto">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg">
                  Solicitar Consulta Gratuita
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}
