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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react"

interface ContactForm {
  nombre: string
  email: string
  telefono: string
  servicio: string
  mensaje: string
}

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState<ContactForm>({
    nombre: "",
    email: "",
    telefono: "",
    servicio: "",
    mensaje: "",
  })

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const generateWhatsAppMessage = () => {
    let message = `🌿 *CONSULTA - FLORA* 🌿\n\n`
    message += `👤 *Nombre:* ${form.nombre}\n`
    message += `📧 *Email:* ${form.email}\n`
    message += `📱 *Teléfono:* ${form.telefono}\n`

    if (form.servicio) {
      message += `🛠️ *Servicio de interés:* ${form.servicio}\n`
    }

    message += `\n💬 *Mensaje:*\n${form.mensaje}\n\n`
    message += `¡Gracias por contactarnos! 🌱`

    return encodeURIComponent(message)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate WhatsApp message
    const whatsappMessage = generateWhatsAppMessage()
    const whatsappNumber = "5491135617412" // Replace with actual WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

    // Open WhatsApp
    window.open(whatsappUrl, "_blank")

    // Reset form
    setForm({
      nombre: "",
      email: "",
      telefono: "",
      servicio: "",
      mensaje: "",
    })

    setIsSubmitting(false)
  }

  const openWhatsApp = () => {
    const whatsappNumber = "5491135617412"
    const message = encodeURIComponent("¡Hola! Me interesa conocer más sobre los servicios de Flora 🌿")
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-sans text-balance">Contáctanos</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Estamos aquí para ayudarte a crear el jardín de tus sueños. Contáctanos para una consulta personalizada.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Envíanos un Mensaje</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      type="tel"
                      value={form.telefono}
                      onChange={(e) => handleInputChange("telefono", e.target.value)}
                      placeholder="+54 9 11 3561-7412"
                    />
                  </div>

                  <div>
                    <Label htmlFor="servicio">Servicio de Interés</Label>
                    <Select value={form.servicio} onValueChange={(value) => handleInputChange("servicio", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un servicio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asesoria">Asesoría Personalizada</SelectItem>
                        <SelectItem value="diseno">Diseño de Jardines</SelectItem>
                        <SelectItem value="remodelacion">Remodelación de Terrazas</SelectItem>
                        <SelectItem value="balcones">Decoración de Balcones</SelectItem>
                        <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="mensaje">Mensaje *</Label>
                    <Textarea
                      id="mensaje"
                      value={form.mensaje}
                      onChange={(e) => handleInputChange("mensaje", e.target.value)}
                      required
                      placeholder="Cuéntanos sobre tu proyecto, espacio disponible, ideas, presupuesto aproximado, etc."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar por WhatsApp"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Teléfono</h3>
                    <p className="text-muted-foreground">+54 9 11 3561-7412</p>
                    <p className="text-sm text-muted-foreground">Lunes a Viernes: 9:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@flora.com</p>
                    <p className="text-sm text-muted-foreground">Respondemos en 24 horas</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Ubicación</h3>
                    <p className="text-muted-foreground">Buenos Aires, Argentina</p>
                    <p className="text-sm text-muted-foreground">Servicio a domicilio en CABA y GBA</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Horarios</h3>
                    <div className="text-muted-foreground text-sm space-y-1">
                      <p>Lunes a Viernes: 9:00 - 18:00</p>
                      <p>Sábados: 9:00 - 15:00</p>
                      <p>Domingos: Cerrado</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">¿Necesitas ayuda inmediata?</h3>
                  <p className="text-muted-foreground mb-4">
                    Chatea con nosotros por WhatsApp para una respuesta rápida
                  </p>
                  <Button onClick={openWhatsApp} className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Abrir WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Consulta Gratuita</h3>
                <p className="text-muted-foreground mb-4">
                  Ofrecemos una consulta inicial gratuita para evaluar tu espacio y discutir tus ideas. Sin compromiso.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Evaluación del espacio</li>
                  <li>• Recomendaciones iniciales</li>
                  <li>• Presupuesto aproximado</li>
                  <li>• Plan de trabajo sugerido</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
