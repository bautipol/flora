"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"

interface CheckoutForm {
  nombre: string
  email: string
  telefono: string
  notas: string
}

export default function CheckoutPage() {
  const { state, dispatch } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState<CheckoutForm>({
    nombre: "",
    email: "",
    telefono: "",
    notas: "",
  })

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const generateWhatsAppMessage = () => {
    let message = `*NUEVO PEDIDO - FLORA*\n\n`
    message += `*Cliente:* ${form.nombre}\n`
    message += `*Email:* ${form.email}\n`
    message += `*Telefono:* ${form.telefono}\n\n`

    message += `*Productos:*\n`
    state.items.forEach((item) => {
      message += `- ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}\n`
    })

    message += `\n*Total: $${state.total.toLocaleString()}*\n\n`

    if (form.notas) {
      message += `*Notas adicionales:*\n${form.notas}\n\n`
    }

    message += `Gracias por elegir Flora!\n`
    message += `Nos pondremos en contacto para coordinar el pago y la entrega.`

    return encodeURIComponent(message)
  }

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate WhatsApp message
    const whatsappMessage = generateWhatsAppMessage()
    const whatsappNumber = "5491135617412"
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

    // Clear cart
    dispatch({ type: "CLEAR_CART" })

    if (isMobile()) {
      // On mobile, use location.href for better WhatsApp integration
      window.location.href = whatsappUrl
    } else {
      // On desktop, use window.open
      window.open(whatsappUrl, "_blank")
    }

    // Redirect to success page after opening WhatsApp (both mobile and desktop)
    setTimeout(() => {
      router.push("/checkout/success")
    }, 1000)

    setIsSubmitting(false)
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
            <p className="text-muted-foreground mb-6">Agrega algunos productos para proceder con el checkout</p>
            <Link href="/tienda">
              <Button size="lg">Ir a la Tienda</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8 font-sans">Finalizar Compra</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="nombre">Nombre Completo *</Label>
                    <Input
                      id="nombre"
                      value={form.nombre}
                      onChange={(e) => handleInputChange("nombre", e.target.value)}
                      required
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input
                      id="telefono"
                      type="tel"
                      value={form.telefono}
                      onChange={(e) => handleInputChange("telefono", e.target.value)}
                      required
                      placeholder="+54 9 11 3561-7412"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notas">Notas Adicionales</Label>
                    <Textarea
                      id="notas"
                      value={form.notas}
                      onChange={(e) => handleInputChange("notas", e.target.value)}
                      placeholder="Instrucciones especiales, referencias, etc."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div
                          className="w-12 h-12 bg-cover bg-center rounded flex-shrink-0"
                          style={{ backgroundImage: `url('${item.image}')` }}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Cantidad: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span className="text-primary">${state.total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Método de pago y entrega:</strong>
                    </p>
                    <p className="text-sm">
                      Al confirmar tu pedido, te contactaremos por WhatsApp para coordinar el pago, la entrega y todos
                      los detalles. Aceptamos efectivo, transferencia bancaria y tarjetas.
                    </p>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Procesando..." : "Confirmar Pedido por WhatsApp"}
                  </Button>

                  <Link href="/carrito" className="block">
                    <Button variant="outline" size="lg" className="w-full bg-transparent">
                      Volver al Carrito
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}
