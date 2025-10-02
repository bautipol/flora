import Link from "next/link"
import Image from "next/image"
import { Instagram, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/flora-logo-new.png"
                alt="Flora Green Garden"
                width={180}
                height={90}
                className="h-18"
                quality={100}
                priority
                style={{
                  imageRendering: "crisp-edges",
                }}
              />
            </div>
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
              <p className="text-sm text-muted-foreground">Macetas armadas</p>
              <p className="text-sm text-muted-foreground">Plantas de interior</p>
              <p className="text-sm text-muted-foreground">Plantas de exterior</p>
              <p className="text-sm text-muted-foreground">Macetas y contenedores</p>
              <p className="text-sm text-muted-foreground">Sustratos y chips</p>
              <p className="text-sm text-muted-foreground">Accesorios</p>
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
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">+54 9 11 5492-5718</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">floregreengarden21@gmail.com</span>
              </div>
              <div className="flex space-x-4 mt-4">
                <Link
                  href="https://www.instagram.com/floragreengarden?igsh=bXpzaGhxOWRnNmNs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">© 2025 Flora. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
