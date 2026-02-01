import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Target, Users, Heart, Car, Home as HomeIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acerca de ConvieneONo - Historia y Misión",
  description: "Descubre por qué creé ConvieneONo y cómo esta herramienta te ayuda a tomar mejores decisiones financieras sobre autos y departamentos.",
  keywords: "acerca de convieneono, historia, misión, decisiones financieras, calculadora financiera",
  openGraph: {
    title: "Acerca de ConvieneONo",
    description: "La historia detrás de la calculadora financiera que te ayuda a tomar mejores decisiones.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold">Acerca de ConvieneONo</h1>
          <p className="text-lg text-muted-foreground">
            Ayudo a las personas a tomar decisiones financieras más inteligentes 
            mostrándoles el costo real de sus grandes compras.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Por qué creé ConvieneONo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Hace un tiempo, estaba considerando comprar un auto. Todos me decían que era 
              una buena decisión, pero decidí hacer los números primero.
            </p>
            <p>
              Cuando analicé los gastos iniciales y el mantenimiento mensual, me di cuenta de 
              algo importante: <strong>los números no cerraban</strong>. El costo real era mucho 
              más alto de lo que había imaginado. Empecé a considerar alternativas: ¿una moto? 
              ¿Uber? Al comparar, descubrí que no comprar era la decisión más inteligente.
            </p>
            <p className="font-semibold">
              Creé ConvieneONo para que tú también puedas hacer este análisis de forma simple 
              y ver el panorama completo antes de tomar decisiones financieras importantes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              El Problema que Resolvemos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              La mayoría de las personas toman decisiones financieras importantes basándose 
              solo en el precio de compra. Pero el precio es solo el comienzo:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong>Gastos ocultos:</strong> Seguros, mantenimiento, impuestos y expensas 
                  pueden duplicar el costo real a largo plazo
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong>Costo de oportunidad:</strong> El dinero que gastas hoy podría estar 
                  generando rendimientos si lo invirtieras
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong>Depreciación:</strong> Los autos pierden valor cada año, pero pocos 
                  lo consideran en su decisión
                </span>
              </li>
            </ul>
            <p>
              ConvieneONo te muestra todo esto de forma clara y visual, para que puedas tomar 
              decisiones informadas.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cómo Funciona</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              La metodología que uso es simple pero poderosa:
            </p>
            <ol className="space-y-3 ml-4">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  1
                </span>
                <div>
                  <strong>Recopilo tus datos reales:</strong> No uso promedios genéricos. 
                  Tú ingresas tu situación específica.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  2
                </span>
                <div>
                  <strong>Calculo todos los costos:</strong> Incluyo gastos recurrentes, 
                  depreciación, inflación y rendimientos de inversión.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  3
                </span>
                <div>
                  <strong>Muestro comparaciones visuales:</strong> Gráficos claros que 
                  proyectan tu situación a 1, 5, 10 y 20 años.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  4
                </span>
                <div>
                  <strong>Tú decides:</strong> Te doy la información, tú tomas la decisión 
                  que mejor se ajuste a tus objetivos.
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Mis Valores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li>
                <strong className="text-primary">Transparencia:</strong> Muestro todos 
                los cálculos. Sin trucos, sin letra chica.
              </li>
              <li>
                <strong className="text-primary">Simplicidad:</strong> Las finanzas personales 
                no tienen que ser complicadas. Hago todo fácil de entender.
              </li>
              <li>
                <strong className="text-primary">Gratuito:</strong> Creo que todos 
                merecen acceso a herramientas para tomar mejores decisiones financieras.
              </li>
              <li>
                <strong className="text-primary">Sin sesgos:</strong> No vendo autos, 
                departamentos ni productos financieros. Solo muestro los números reales.
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 rounded-lg p-8 text-center border border-primary/10">
          <h3 className="text-2xl font-bold mb-3">¿Listo para tomar una mejor decisión?</h3>
          <p className="text-muted-foreground mb-6">
            Usa las calculadoras y descubre el costo real de tu próxima gran compra.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculadora/auto">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                <Car className="h-5 w-5" />
                Calcular Auto
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/calculadora/departamento">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                <HomeIcon className="h-5 w-5" />
                Calcular Departamento
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

