import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Leaf, Users, Award, Heart, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/lush-green-garden-with-beautiful-plants-and-flower.png')",
          }}
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 font-sans text-balance">
            Transforma tu espacio con Flora
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Descubre nuestra pasión por las plantas y el diseño. Creamos jardines únicos que conectan con la naturaleza.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tienda">
              <Button size="lg" className="w-full sm:w-auto">
                Explorar Tienda
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/servicios">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                Nuestros Servicios
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-sans">Nuestra Historia</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Flora nació de la unión de dos amigas apasionadas por el diseño y el amor por la naturaleza. Lo que
              comenzó como la comercialización de plantas e insumos para el jardín, evolucionó hacia el paisajismo,
              acercándonos aún más a la naturaleza.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Pasión por la Naturaleza</h3>
                <p className="text-muted-foreground">
                  Cada planta que ofrecemos refleja nuestro amor genuino por la naturaleza y el cuidado del medio
                  ambiente.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Equipo Especializado</h3>
                <p className="text-muted-foreground">
                  Dos amigas unidas por la pasión del diseño, ofreciendo asesorías personalizadas y servicios
                  profesionales.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Calidad Garantizada</h3>
                <p className="text-muted-foreground">
                  Seleccionamos cuidadosamente cada producto para garantizar la mejor calidad y durabilidad.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-sans">Productos Destacados</h2>
            <p className="text-lg text-muted-foreground">
              Descubre nuestra selección de plantas y accesorios más populares
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/beautiful-indoor-plants-in-decorative-pots.png')",
                }}
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Plantas de Interior</h3>
                <p className="text-muted-foreground mb-4">Perfectas para dar vida a cualquier espacio interior</p>
                <p className="text-primary font-semibold">Desde $2,500</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/decorative-plant-pots-and-containers.png')",
                }}
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Macetas Decorativas</h3>
                <p className="text-muted-foreground mb-4">Diseños únicos para complementar tus plantas</p>
                <p className="text-primary font-semibold">Desde $1,200</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/garden-soil-and-plant-substrates.png')",
                }}
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Tierras y Sustratos</h3>
                <p className="text-muted-foreground mb-4">La base perfecta para el crecimiento saludable</p>
                <p className="text-primary font-semibold">Desde $800</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/tienda">
              <Button size="lg">
                Ver Todos los Productos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-sans">Nuestros Servicios</h2>
            <p className="text-lg text-muted-foreground">Servicios profesionales de paisajismo y diseño de jardines</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <Leaf className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-semibold mb-4">Asesorías Personalizadas</h3>
                <p className="text-muted-foreground mb-4">
                  Te ayudamos a elegir las plantas perfectas para tu espacio, considerando luz, humedad y cuidados
                  específicos.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Evaluación del espacio</li>
                  <li>• Selección de plantas adecuadas</li>
                  <li>• Guía de cuidados</li>
                  <li>• Seguimiento personalizado</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-semibold mb-4">Diseño y Remodelación</h3>
                <p className="text-muted-foreground mb-4">
                  Transformamos jardines, terrazas y balcones en espacios únicos que reflejan tu personalidad y estilo.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Diseño de jardines</li>
                  <li>• Remodelación de terrazas</li>
                  <li>• Decoración de balcones</li>
                  <li>• Proyectos integrales</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/contacto">
              <Button size="lg" variant="outline">
                Solicitar Consulta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
