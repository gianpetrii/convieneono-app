import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Target, Users, Heart } from "lucide-react";

export const metadata = {
  title: "Acerca de ConvieneONo",
  description: "Conoce la historia detrás de ConvieneONo y cómo ayudamos a las personas a tomar mejores decisiones financieras",
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
              Mi Misión
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              ConvieneONo nació de una experiencia personal. Hace unos años, estaba por 
              comprar mi primer auto y todos me decían "es una buena inversión". Pero cuando 
              sumé TODOS los costos reales (seguro, mantenimiento, depreciación, combustible), 
              me di cuenta de que en 5 años habría perdido más de $15,000.
            </p>
            <p>
              Decidí seguir usando transporte público e invertir ese dinero. Hoy, esos ahorros 
              se convirtieron en la inicial de mi departamento. Esa decisión cambió mi vida 
              financiera.
            </p>
            <p className="font-semibold">
              Creé ConvieneONo para que tú también puedas ver el panorama completo antes 
              de tomar decisiones financieras importantes.
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
              Mi metodología es simple pero poderosa:
            </p>
            <ol className="space-y-3 ml-4">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  1
                </span>
                <div>
                  <strong>Recopilamos tus datos reales:</strong> No usamos promedios. 
                  Tú ingresas tu situación específica.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  2
                </span>
                <div>
                  <strong>Calculamos todos los costos:</strong> Incluimos gastos recurrentes, 
                  depreciación, inflación y rendimientos de inversión.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  3
                </span>
                <div>
                  <strong>Mostramos comparaciones visuales:</strong> Gráficos claros que 
                  proyectan tu situación a 1, 5, 10 y 20 años.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  4
                </span>
                <div>
                  <strong>Tú decides:</strong> Te damos la información, tú tomas la decisión 
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
                <strong className="text-primary">Simplicidad:</strong> Finanzas personales 
                no tiene que ser complicado. Lo hago fácil de entender.
              </li>
              <li>
                <strong className="text-primary">Gratuito:</strong> Creo que todos 
                merecen acceso a herramientas para tomar mejores decisiones financieras.
              </li>
              <li>
                <strong className="text-primary">Sin sesgos:</strong> No vendo autos, 
                departamentos ni productos financieros. Solo te muestro los números.
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">¿Listo para tomar una mejor decisión?</h3>
          <p className="text-muted-foreground mb-4">
            Únete a miles de personas que ya usaron ConvieneONo para tomar decisiones 
            financieras más inteligentes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/calculadora/auto" className="text-primary hover:underline font-semibold">
              Calcular Auto →
            </a>
            <a href="/calculadora/departamento" className="text-primary hover:underline font-semibold">
              Calcular Departamento →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

