import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">ConvieneONo</h3>
            <p className="text-sm text-muted-foreground">
              Toma decisiones financieras inteligentes. Descubre el costo real de tus grandes compras.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Calculadoras</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/calculadora/auto"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Auto vs Inversión
                </Link>
              </li>
              <li>
                <Link
                  href="/calculadora/departamento"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Departamento vs Alquiler
                </Link>
              </li>
              <li>
                <Link
                  href="/ejemplos"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Ver Ejemplos
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Información</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Acerca de
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Términos
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/gianpetrii/convieneono-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cómo funciona
                </Link>
              </li>
              <li>
                <Link
                  href="/ejemplos"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Casos de uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} ConvieneONo. Todos los derechos reservados.</p>
          <p className="mt-2">Hecho con ❤️ para ayudarte a tomar mejores decisiones financieras</p>
        </div>
      </div>
    </footer>
  );
}

