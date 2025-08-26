import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
    price: "Desde $3,000",
    duration: "1-2 horas",
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
    price: "Desde $8,000",
    duration: "1-2 semanas",
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
    price: "Desde $12,000",
    duration: "2-3 semanas",
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
    price: "Desde $4,500",
    duration: "3-5 días",
  },
]

export default function ServiciosPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-sans text-balance">
            Nuestros Servicios
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Ofrecemos servicios profesionales de paisajismo y diseño de jardines. Desde asesorías personalizadas hasta
            proyectos integrales de remodelación.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-primary mb-1">{service.title}</h3>
                        <p className="text-muted-foreground">{service.description}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {service.duration}
                        </Badge>
                        <p className="text-lg font-bold text-primary">{service.price}</p>
                      </div>
                    </div>

                    <Link href="/contacto">
                      <Button className="w-full">
                        Solicitar Consulta
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-sans">Nuestro Proceso</h2>
            <p className="text-lg text-muted-foreground">
              Trabajamos contigo paso a paso para crear el jardín de tus sueños
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Consulta Inicial</h3>
              <p className="text-muted-foreground text-sm">Conversamos sobre tus ideas, necesidades y presupuesto</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Evaluación</h3>
              <p className="text-muted-foreground text-sm">Visitamos tu espacio y analizamos las condiciones</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Propuesta</h3>
              <p className="text-muted-foreground text-sm">Creamos un diseño personalizado con presupuesto detallado</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Implementación</h3>
              <p className="text-muted-foreground text-sm">Ejecutamos el proyecto con seguimiento constante</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-sans">
            ¿Listo para transformar tu espacio?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contáctanos hoy mismo para una consulta gratuita y descubre cómo podemos ayudarte a crear el jardín
            perfecto.
          </p>
          <Link href="/contacto">
            <Button size="lg">
              Solicitar Consulta Gratuita
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
