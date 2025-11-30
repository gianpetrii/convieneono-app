import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, Construction, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Calculadora de Departamento - ConvieneONo",
  description: "Calcula si te conviene comprar un departamento o seguir alquilando e invertir tu dinero",
};

export default function CalculadoraDepartamentoPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
              <Home className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Calculadora de Departamento</h1>
          <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
            Descubre si te conviene comprar un departamento o seguir alquilando e invertir la diferencia.
          </p>
        </div>

        {/* Coming Soon Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Construction className="h-6 w-6 text-primary" />
              Próximamente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Estamos trabajando en la calculadora de departamentos. Pronto podrás:
            </p>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <div>
                  <strong>Comparar compra vs alquiler:</strong> Ve qué opción te deja en mejor posición financiera a largo plazo
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <div>
                  <strong>Incluir todos los gastos:</strong> Expensas, impuestos, servicios, mantenimiento y más
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <div>
                  <strong>Apreciación del inmueble:</strong> Considera cómo el departamento puede aumentar de valor
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <div>
                  <strong>Costo de oportunidad:</strong> Descubre cuánto ganarías invirtiendo ese dinero
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <div>
                  <strong>Filtros avanzados:</strong> Inflación, costos de escrituración, hipotecas y más
                </div>
              </li>
            </ul>

            <div className="bg-muted/50 rounded-lg p-4 border">
              <p className="text-sm text-muted-foreground">
                <strong>Mientras tanto,</strong> puedes probar nuestra calculadora de autos 
                para ver cómo funciona la herramienta y el tipo de análisis que ofrecemos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/calculadora/auto" className="flex-1">
                <Button size="lg" className="w-full">
                  Probar Calculadora de Auto
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button size="lg" variant="outline" className="w-full gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            ¿Quieres que te avisemos cuando esté lista?
          </p>
          <Link href="/contact">
            <Button variant="outline">
              Contáctanos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

