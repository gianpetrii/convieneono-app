"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, Calculator } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo - Left */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Calculator className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              ConvieneONo
            </span>
          </Link>
        </div>

        {/* Navigation - Center */}
        <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
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
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Acerca de
          </Link>
        </nav>

        {/* Theme Toggle & Mobile Menu - Right */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

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
              href="/about"
              className="text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Acerca de
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contacto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

