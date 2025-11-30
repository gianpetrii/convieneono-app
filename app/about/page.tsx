import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Acerca de Base App</h1>
          <p className="text-lg text-muted-foreground">
            Una aplicación base completa para acelerar el desarrollo de tus
            proyectos.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Nuestra Misión</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Base App nació de la necesidad de tener un punto de partida
              sólido y bien estructurado para proyectos web modernos. Cada
              proyecto nuevo requiere las mismas funcionalidades básicas:
              autenticación, gestión de usuarios, páginas informativas y un
              diseño atractivo.
            </p>
            <p>
              Nuestra misión es proporcionar una base de código limpia,
              mantenible y escalable que te permita enfocarte en lo que
              realmente importa: las características únicas de tu aplicación.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tecnologías</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-semibold">Next.js 14:</span>
                <span className="text-muted-foreground">
                  Framework de React con App Router para aplicaciones web
                  modernas
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold">Firebase:</span>
                <span className="text-muted-foreground">
                  Autenticación, base de datos y almacenamiento en la nube
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold">Tailwind CSS:</span>
                <span className="text-muted-foreground">
                  Framework CSS utility-first para diseños personalizados
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold">shadcn/ui:</span>
                <span className="text-muted-foreground">
                  Componentes UI hermosos y accesibles
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold">TypeScript:</span>
                <span className="text-muted-foreground">
                  Tipado estático para código más seguro y mantenible
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Características</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2 md:grid-cols-2">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Autenticación completa
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Modo oscuro/claro
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Diseño responsive
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Protección de rutas
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Notificaciones toast
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Estados de carga
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                SEO optimizado
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                TypeScript
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

