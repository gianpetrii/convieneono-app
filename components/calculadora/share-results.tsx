"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, Mail, MessageCircle, Link2, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ShareResultsProps {
  formData: any;
  resultados: any;
  tipo: "auto" | "departamento";
}

export function ShareResults({ formData, resultados, tipo }: ShareResultsProps) {
  const [copied, setCopied] = useState(false);

  // Generar URL con parámetros
  const generateShareUrl = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const params = new URLSearchParams();
    
    // Agregar todos los datos del formulario a la URL
    Object.entries(formData).forEach(([key, value]) => {
      if (value) params.append(key, String(value));
    });
    
    return `${baseUrl}/calculadora/${tipo}?${params.toString()}`;
  };

  // Generar texto para compartir
  const generateShareText = () => {
    const anos = formData.anosProyeccion || "5";
    
    if (tipo === "auto") {
      const precio = parseFloat(formData.precioAuto || "0");
      const mejorOpcion = resultados.auto.patrimonioNeto > resultados.uber.patrimonioNeto 
        ? "comprar el auto" 
        : "usar Uber e invertir";
      
      return `🚗 Calculé si me conviene comprar un auto de $${precio.toLocaleString()}

📊 Resultado a ${anos} años:
• Comprar auto: $${resultados.auto.patrimonioNeto.toLocaleString(undefined, {maximumFractionDigits: 0})}
• Usar Uber + Invertir: $${resultados.uber.patrimonioNeto.toLocaleString(undefined, {maximumFractionDigits: 0})}

💡 Me conviene más: ${mejorOpcion}

Calcula tu caso en ConvieneONo 👇`;
    }
    
    return `Calculé mi decisión financiera en ConvieneONo`;
  };

  // Compartir por WhatsApp
  const shareWhatsApp = () => {
    const text = generateShareText();
    const url = generateShareUrl();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + "\n" + url)}`;
    window.open(whatsappUrl, '_blank');
    toast.success("Abriendo WhatsApp...");
  };

  // Compartir por Email
  const shareEmail = () => {
    const text = generateShareText();
    const url = generateShareUrl();
    const subject = tipo === "auto" 
      ? "¿Me conviene comprar un auto? - Calculadora ConvieneONo"
      : "¿Me conviene comprar un departamento? - Calculadora ConvieneONo";
    
    const body = `${text}\n\nVe los detalles completos aquí:\n${url}\n\n---\nCalculado con ConvieneONo - Tu calculadora de decisiones financieras`;
    
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    toast.success("Abriendo cliente de email...");
  };

  // Copiar link
  const copyLink = async () => {
    const url = generateShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("¡Link copiado al portapapeles!");
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast.error("Error al copiar el link");
    }
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="h-5 w-5 text-primary" />
            <h3 className="font-bold">Compartir Resultados</h3>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Comparte esta comparación con amigos, familia o tu asesor financiero
          </p>

          <div className="grid gap-3">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2"
              onClick={shareWhatsApp}
            >
              <MessageCircle className="h-4 w-4 text-green-600" />
              Compartir por WhatsApp
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start gap-2"
              onClick={shareEmail}
            >
              <Mail className="h-4 w-4 text-blue-600" />
              Compartir por Email
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start gap-2"
              onClick={copyLink}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  ¡Link copiado!
                </>
              ) : (
                <>
                  <Link2 className="h-4 w-4" />
                  Copiar link
                </>
              )}
            </Button>
          </div>

          <div className="bg-muted/50 rounded-lg p-3 mt-4">
            <p className="text-xs text-muted-foreground">
              💡 <strong>Tip:</strong> El link incluye todos tus datos para que otros 
              puedan ver exactamente tu comparación
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

