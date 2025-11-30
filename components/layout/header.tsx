"use client";

import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogOut, User, Menu, Calculator } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Calculator className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              ConvieneONo
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Inicio
            </Link>
            <Link
              href="/calculadora/auto"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Calculadora Auto
            </Link>
            <Link
              href="/calculadora/departamento"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Calculadora Depto
            </Link>
            <Link
              href="/ejemplos"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Ejemplos
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Mis Comparaciones
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost">Iniciar Sesión</Button>
              </Link>
              <Link href="/register">
                <Button>Registrarse</Button>
              </Link>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container flex flex-col gap-4 py-4">
            <Link
              href="/"
              className="text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/calculadora/auto"
              className="text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Calculadora Auto
            </Link>
            <Link
              href="/calculadora/departamento"
              className="text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Calculadora Depto
            </Link>
            <Link
              href="/ejemplos"
              className="text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ejemplos
            </Link>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Perfil
                </Link>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Registrarse</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

