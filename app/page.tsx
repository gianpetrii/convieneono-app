import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center gap-4 py-20 md:py-32">
        <div className="flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
            Bienvenido a{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Base App
            </span>
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Tu punto de partida perfecto para crear aplicaciones web modernas
            con Next.js, Firebase y Tailwind CSS.
          </p>
          <div className="flex gap-4">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Comenzar
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Saber más
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20 md:py-32">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Rápido y Moderno</h3>
            <p className="text-muted-foreground">
              Construido con Next.js 14 y las últimas tecnologías web para un
              rendimiento óptimo.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Seguro</h3>
            <p className="text-muted-foreground">
              Autenticación completa con Firebase y protección de rutas
              integrada.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Hermoso</h3>
            <p className="text-muted-foreground">
              Diseño moderno con Tailwind CSS y componentes reutilizables de
              shadcn/ui.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/50">
        <div className="container flex flex-col items-center gap-4 py-20 text-center md:py-32">
          <h2 className="text-3xl font-bold md:text-4xl">
            ¿Listo para comenzar?
          </h2>
          <p className="max-w-[600px] text-muted-foreground">
            Crea tu cuenta y comienza a construir tu próxima gran idea hoy
            mismo.
          </p>
          <Link href="/register">
            <Button size="lg" className="gap-2">
              Crear cuenta gratis
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

