"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, MessageSquare, Send, Linkedin, Github, Twitter, Clock } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Usar Web3Forms - Reemplaza con tu access key de https://web3forms.com
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_ACCESS_KEY_HERE", // Reemplazar con tu access key
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "Nuevo mensaje desde ConvieneONo",
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("¡Mensaje enviado!", {
          description: "Te responderé lo antes posible. Gracias por contactarme.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Error al enviar");
      }
    } catch (error) {
      toast.error("Error al enviar el mensaje", {
        description: "Por favor, intenta nuevamente o escríbeme directamente al email.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold">Contacto</h1>
          <p className="text-lg text-muted-foreground">
            ¿Tienes preguntas, sugerencias o encontraste un error? Me encantaría saber de ti.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mail className="h-5 w-5 text-primary" />
                Email Directo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a 
                href="mailto:contacto@convieneono.com" 
                className="text-primary hover:underline font-medium"
              >
                contacto@convieneono.com
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-primary" />
                Tiempo de Respuesta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Respondo en menos de 24 horas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Envíame un mensaje</CardTitle>
            <p className="text-sm text-muted-foreground">
              Completa el formulario y me pondré en contacto contigo pronto
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Cuéntame qué tienes en mente..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <Button type="submit" className="w-full gap-2" disabled={loading}>
                {loading ? (
                  "Enviando..."
                ) : (
                  <>
                    Enviar mensaje
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardHeader>
            <CardTitle>También puedes encontrarme en</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://linkedin.com/in/tu-perfil"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Linkedin className="h-5 w-5 text-primary" />
                </div>
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/tu-usuario"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Github className="h-5 w-5 text-primary" />
                </div>
                <span>GitHub</span>
              </a>

              <a
                href="https://twitter.com/tu-usuario"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Twitter className="h-5 w-5 text-primary" />
                </div>
                <span>Twitter</span>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">¿Qué tipo de mensajes me puedes enviar?</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>✓ Reportar bugs o errores en las calculadoras</p>
            <p>✓ Sugerir nuevas funcionalidades</p>
            <p>✓ Hacer preguntas sobre cómo usar la herramienta</p>
            <p>✓ Compartir tu experiencia usando ConvieneONo</p>
            <p>✓ Proponer colaboraciones o ideas</p>
          </div>
        </div>
      </div>
    </div>
  );
}
