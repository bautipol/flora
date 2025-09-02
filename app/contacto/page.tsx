"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
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

    if (isMobile()) {
      // On mobile, use window.location.href to ensure WhatsApp opens properly
      window.location.href = whatsappUrl
    } else {
      // On desktop, use window.open
      window.open(whatsappUrl, "_blank")
    }

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

    if (isMobile()) {
      window.location.href = whatsappUrl
    } else {
      window.open(whatsappUrl, "_blank")
    }
  }

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
            Contáctanos
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Estamos aquí para ayudarte a crear el jardín de tus sueños. Contáctanos para una consulta personalizada.
          </motion.p>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Envíanos un Mensaje</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Label htmlFor="nombre">Nombre Completo *</Label>
                    <Input
                      id="nombre"
                      value={form.nombre}
                      onChange={(e) => handleInputChange("nombre", e.target.value)}
                      required
                      placeholder="Tu nombre completo"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      placeholder="tu@email.com"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      type="tel"
                      value={form.telefono}
                      onChange={(e) => handleInputChange("telefono", e.target.value)}
                      placeholder="+54 9 11 3561-7412"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
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
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <Label htmlFor="mensaje">Mensaje *</Label>
                    <Textarea
                      id="mensaje"
                      value={form.mensaje}
                      onChange={(e) => handleInputChange("mensaje", e.target.value)}
                      required
                      placeholder="Cuéntanos sobre tu proyecto, espacio disponible, ideas, presupuesto aproximado, etc."
                      rows={5}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Enviando..." : "Enviar por WhatsApp"}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </CardContent>
            </Card>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 1.0 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HdnJvHycDdjN3Z22BaA6AljM7fNDTp.png"
                        alt="Fundadoras de Flora"
                        className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-4"
                      />
                    </motion.div>
                    <motion.p
                      className="text-muted-foreground italic text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                    >
                      Las fundadoras de Flora: dos amigas unidas por la pasión del diseño y la naturaleza, creando
                      espacios verdes únicos desde 2020.
                    </motion.p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      icon: Phone,
                      title: "Teléfono",
                      content: "+54 9 11 3561-7412",
                      subtitle: "Lunes a Viernes: 9:00 - 18:00",
                    },
                    {
                      icon: Mail,
                      title: "Email",
                      content: "info@flora.com",
                      subtitle: "Respondemos en 24 horas",
                    },
                    {
                      icon: MapPin,
                      title: "Ubicación",
                      content: "Buenos Aires, Argentina",
                      subtitle: "Servicio a domicilio en CABA y GBA",
                    },
                    {
                      icon: Clock,
                      title: "Horarios",
                      content: "Lunes a Viernes: 9:00 - 18:00",
                      subtitle: "Sábados: 9:00 - 15:00 • Domingos: Cerrado",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    >
                      <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
                        <item.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.content}</p>
                        <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
                      <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">¿Necesitas ayuda inmediata?</h3>
                    <p className="text-muted-foreground mb-4">
                      Chatea con nosotros por WhatsApp para una respuesta rápida
                    </p>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button onClick={openWhatsApp} className="w-full">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Abrir WhatsApp
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Consulta Gratuita</h3>
                  <p className="text-muted-foreground mb-4">
                    Ofrecemos una consulta inicial gratuita para evaluar tu espacio y discutir tus ideas. Sin
                    compromiso.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {[
                      "Evaluación del espacio",
                      "Recomendaciones iniciales",
                      "Presupuesto aproximado",
                      "Plan de trabajo sugerido",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                      >
                        • {item}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
