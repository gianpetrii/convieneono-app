import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  Calculator, 
  TrendingUp, 
  Eye, 
  DollarSign,
  Car,
  Home,
  PiggyBank,
  BarChart3
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center gap-4 py-20 md:py-32">
        <div className="flex max-w-[980px] flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-4">
            <Calculator className="mr-2 h-4 w-4" />
            Toma decisiones financieras inteligentes
          </div>
          
          <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
            ¿Conviene o No?{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Descúbrelo en 2 minutos
            </span>
          </h1>
          
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Visualiza el <strong>costo REAL</strong> a largo plazo de comprar un auto o departamento 
            vs invertir tu dinero. Incluye gastos ocultos, depreciación y costo de oportunidad.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/calculadora/auto">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                <Car className="h-5 w-5" />
                Calcular Auto
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/calculadora/departamento">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                <Home className="h-5 w-5" />
                Calcular Departamento
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              Gratis
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              Sin registro
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              Resultados instantáneos
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20 md:py-32 border-t">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">¿Por qué usar ConvieneONo?</h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            La mayoría de las personas subestiman los costos reales de sus grandes compras. 
            Te ayudamos a ver el panorama completo.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                  <Eye className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold">Gastos Ocultos</h3>
                <p className="text-sm text-muted-foreground">
                  Visualiza TODOS los costos: seguros, mantenimiento, impuestos, expensas y más.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold">Costo de Oportunidad</h3>
                <p className="text-sm text-muted-foreground">
                  Descubre cuánto ganarías si invirtieras ese dinero en lugar de gastarlo.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold">Comparación Visual</h3>
                <p className="text-sm text-muted-foreground">
                  Gráficos claros que muestran tu situación en 1, 5, 10 y 20 años.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/10">
                  <DollarSign className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold">Personalizable</h3>
                <p className="text-sm text-muted-foreground">
                  Ajusta cada gasto a TU situación real. No usamos promedios genéricos.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="container py-20 md:py-32 border-t bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Cómo funciona</h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            En solo 3 pasos simples, obtén una comparación completa de tus opciones
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold">Elige qué calcular</h3>
              <p className="text-muted-foreground">
                Selecciona si quieres calcular un auto o un departamento
              </p>
            </div>

            <div className="flex flex-col items-center text-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold">Ingresa tus datos</h3>
              <p className="text-muted-foreground">
                Completa el precio, tus ahorros y gastos mensuales estimados
              </p>
            </div>

            <div className="flex flex-col items-center text-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold">Ve los resultados</h3>
              <p className="text-muted-foreground">
                Obtén gráficos claros y descubre qué opción te conviene más
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="container py-20 md:py-32 border-t">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Casos reales</h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            Mira cómo otros han usado ConvieneONo para tomar mejores decisiones
          </p>
        </div>

        <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                  <Car className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Auto de $20,000</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Martín tenía $25,000 ahorrados y quería comprar un auto. 
                    Descubrió que en 5 años, invertir le dejaría $8,500 más.
                  </p>
                  <Link href="/ejemplos" className="text-sm text-primary hover:underline">
                    Ver caso completo →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                  <Home className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Departamento de $200,000</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Laura comparó comprar vs alquilar. En 10 años, comprar le generaría 
                    $45,000 más de patrimonio.
                  </p>
                  <Link href="/ejemplos" className="text-sm text-primary hover:underline">
                    Ver caso completo →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Link href="/ejemplos">
            <Button variant="outline" size="lg">
              Ver más ejemplos
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10">
        <div className="container flex flex-col items-center gap-4 py-20 text-center md:py-32">
          <PiggyBank className="h-16 w-16 text-primary mb-4" />
          <h2 className="text-3xl font-bold md:text-5xl max-w-[700px]">
            ¿Listo para tomar una decisión inteligente?
          </h2>
          <p className="max-w-[600px] text-lg text-muted-foreground">
            No dejes que los costos ocultos te sorprendan. Descubre el costo real 
            de tu próxima gran compra en menos de 2 minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/calculadora/auto">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                <Calculator className="h-5 w-5" />
                Empezar ahora gratis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/ejemplos">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Ver ejemplos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

