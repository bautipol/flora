import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, MessageCircle, Home } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />

          <h1 className="text-3xl font-bold text-primary mb-4 font-sans">¡Pedido Confirmado!</h1>

          <p className="text-lg text-muted-foreground mb-8">
            Tu pedido ha sido enviado exitosamente. En breve nos pondremos en contacto contigo por WhatsApp para
            coordinar el pago y la entrega.
          </p>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Próximos Pasos</h2>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <p className="text-sm">Recibirás un mensaje de WhatsApp con los detalles de tu pedido</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <p className="text-sm">Coordinaremos contigo el método de pago y la fecha de entrega</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <p className="text-sm">Prepararemos tu pedido con el mayor cuidado y te lo entregaremos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Button>
            </Link>

            <Link href="/tienda">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                Seguir Comprando
              </Button>
            </Link>
          </div>

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>¿Tienes alguna pregunta?</strong>
              <br />
              No dudes en contactarnos por WhatsApp al +54 9 11 3561-7412 o por email a floregreengarden21@gmail.com
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
