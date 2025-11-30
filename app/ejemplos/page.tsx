import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Car, 
  Home, 
  TrendingUp, 
  TrendingDown, 
  Calculator,
  ArrowRight,
  DollarSign,
  Calendar,
  PiggyBank
} from "lucide-react";

export const metadata = {
  title: "Ejemplos Reales - ConvieneONo",
  description: "Casos de uso reales de personas que usaron ConvieneONo para tomar mejores decisiones financieras",
};

export default function EjemplosPage() {
  return (
    <div className="container py-12 md:py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Casos Reales</h1>
        <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
          Descubre cómo otras personas han usado ConvieneONo para tomar decisiones 
          financieras más inteligentes. Todos los números son reales.
        </p>
      </div>

      {/* Auto Examples */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
            <Car className="h-6 w-6 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold">Ejemplos: Auto vs Inversión</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Ejemplo 1: Martín */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Martín, 28 años</span>
                <span className="text-sm font-normal text-muted-foreground">
                  - Programador
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Situación:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Ahorros: $25,000</li>
                  <li>• Auto deseado: $20,000 (usado, 2020)</li>
                  <li>• Gastos mensuales estimados: $300</li>
                  <li>• Usa Uber actualmente: $150/mes</li>
                </ul>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Resultado a 5 años:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Comprar Auto</p>
                    <p className="text-2xl font-bold text-red-600">-$12,000</p>
                    <p className="text-xs text-muted-foreground">
                      Valor auto: $8,000<br/>
                      Gastado: $18,000<br/>
                      Inversión: $5,000
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Invertir + Uber</p>
                    <p className="text-2xl font-bold text-emerald-600">+$19,500</p>
                    <p className="text-xs text-muted-foreground">
                      Inversión: $28,500<br/>
                      Gastado Uber: $9,000
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Decisión: No comprar</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Diferencia: <strong>$31,500 más</strong> en 5 años invirtiendo. 
                      Martín decidió seguir usando Uber y ahorrar para una inicial de departamento.
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/calculadora/auto">
                <Button variant="outline" className="w-full gap-2">
                  <Calculator className="h-4 w-4" />
                  Calcular mi caso
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Ejemplo 2: Carolina */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Carolina, 35 años</span>
                <span className="text-sm font-normal text-muted-foreground">
                  - Arquitecta
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Situación:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Ahorros: $45,000</li>
                  <li>• Auto deseado: $35,000 (nuevo, SUV)</li>
                  <li>• Gastos mensuales estimados: $450</li>
                  <li>• Necesita auto para trabajo</li>
                </ul>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Resultado a 10 años:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Comprar Auto Nuevo</p>
                    <p className="text-2xl font-bold text-red-600">-$39,000</p>
                    <p className="text-xs text-muted-foreground">
                      Valor auto: $10,000<br/>
                      Gastado: $54,000<br/>
                      Inversión: $10,000
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Auto Usado + Ahorro</p>
                    <p className="text-2xl font-bold text-emerald-600">+$12,000</p>
                    <p className="text-xs text-muted-foreground">
                      Auto usado: $18,000<br/>
                      Valor: $6,000<br/>
                      Inversión: $30,000
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Decisión: Auto usado</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Diferencia: <strong>$51,000 más</strong> comprando usado. 
                      Carolina compró un auto usado confiable e invirtió la diferencia.
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/calculadora/auto">
                <Button variant="outline" className="w-full gap-2">
                  <Calculator className="h-4 w-4" />
                  Calcular mi caso
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Departamento Examples */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
            <Home className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold">Ejemplos: Departamento vs Alquiler</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Ejemplo 3: Laura */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Laura, 32 años</span>
                <span className="text-sm font-normal text-muted-foreground">
                  - Diseñadora
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Situación:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Ahorros: $80,000</li>
                  <li>• Departamento: $200,000 (2 ambientes)</li>
                  <li>• Alquiler actual: $800/mes</li>
                  <li>• Expensas + gastos: $350/mes</li>
                </ul>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Resultado a 10 años:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Comprar Depto</p>
                    <p className="text-2xl font-bold text-emerald-600">+$125,000</p>
                    <p className="text-xs text-muted-foreground">
                      Valor depto: $250,000<br/>
                      Gastado: $42,000<br/>
                      Hipoteca: $120,000
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Alquilar + Invertir</p>
                    <p className="text-2xl font-bold text-blue-600">+$80,000</p>
                    <p className="text-xs text-muted-foreground">
                      Inversión: $176,000<br/>
                      Gastado alquiler: $96,000
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Decisión: Comprar</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Diferencia: <strong>$45,000 más</strong> comprando. 
                      Laura compró el departamento y ahora tiene un activo que se aprecia.
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/calculadora/departamento">
                <Button variant="outline" className="w-full gap-2">
                  <Calculator className="h-4 w-4" />
                  Calcular mi caso
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Ejemplo 4: Diego */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Diego, 26 años</span>
                <span className="text-sm font-normal text-muted-foreground">
                  - Emprendedor
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Situación:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Ahorros: $50,000</li>
                  <li>• Departamento: $150,000 (monoambiente)</li>
                  <li>• Alquiler actual: $600/mes</li>
                  <li>• Quiere invertir en su negocio</li>
                </ul>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Resultado a 5 años:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Comprar Depto</p>
                    <p className="text-2xl font-bold text-blue-600">+$35,000</p>
                    <p className="text-xs text-muted-foreground">
                      Valor depto: $180,000<br/>
                      Gastado: $21,000<br/>
                      Hipoteca: $100,000
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Alquilar + Negocio</p>
                    <p className="text-2xl font-bold text-emerald-600">+$78,000</p>
                    <p className="text-xs text-muted-foreground">
                      Negocio: $114,000<br/>
                      Gastado alquiler: $36,000
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <PiggyBank className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Decisión: Seguir alquilando</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Diferencia: <strong>$43,000 más</strong> invirtiendo en su negocio. 
                      Diego usó el dinero para expandir su empresa y triplicó sus ingresos.
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/calculadora/departamento">
                <Button variant="outline" className="w-full gap-2">
                  <Calculator className="h-4 w-4" />
                  Calcular mi caso
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Key Learnings */}
      <div className="bg-muted/50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Lecciones Clave</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">El tiempo importa</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              A más años de proyección, más impacto tiene el costo de oportunidad. 
              Los gastos recurrentes se acumulan.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Los gastos ocultos</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Seguros, mantenimiento, impuestos y expensas pueden duplicar el costo 
              real de tu compra a largo plazo.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Cada caso es único</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              No hay una respuesta universal. Depende de tu situación, objetivos 
              y alternativas disponibles.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">¿Cuál es tu caso?</h2>
        <p className="text-muted-foreground mb-6 max-w-[600px] mx-auto">
          Cada situación es diferente. Usa nuestras calculadoras para descubrir 
          qué opción es mejor para TI.
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
              <Home className="h-5 w-5" />
              Calcular Departamento
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

