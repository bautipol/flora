import Link from "next/link"
import { Leaf, Instagram, Facebook, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary font-sans">Flora</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Transformamos espacios con la belleza de la naturaleza. Plantas, diseño y paisajismo profesional.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navegación</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Inicio
              </Link>
              <Link href="/tienda" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Tienda
              </Link>
              <Link
                href="/servicios"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Servicios
              </Link>
              <Link
                href="/contacto"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contacto
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Productos</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Plantas de interior</p>
              <p className="text-sm text-muted-foreground">Plantas de exterior</p>
              <p className="text-sm text-muted-foreground">Macetas y contenedores</p>
              <p className="text-sm text-muted-foreground">Tierras y sustratos</p>
              <p className="text-sm text-muted-foreground">Chips y decoración</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">+54 9 11 3561-7412</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">info@flora.com</span>
              </div>
              <div className="flex space-x-4 mt-4">
                <Link
                  href="https://www.instagram.com/floragreengarden?igsh=bXpzaGhxOWRnNmNs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                </Link>
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">© 2024 Flora. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
