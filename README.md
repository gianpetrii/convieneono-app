# Conviene o No App

## Descripción del proyecto

App web donde el usuario puede **comparar precios u ofertas** y decidir si “conviene o no” según criterios y datos guardados en Firebase, con sesión autenticada.

## Problema que resuelve

Reduce la fricción de comparar opciones entre comercios o planes (descuentos engañosos, unidades distintas, condiciones ocultas) ofreciendo un espacio único para cargar o contrastar información y tomar decisiones más informadas.

## Stack

- Next.js, TypeScript, Tailwind, shadcn/ui  
- Firebase, TanStack Query, Zustand, React Hook Form + Zod  

## Requisitos

- Node.js LTS  

## Instalación

```bash
npm install
npm run dev
```

Scripts: `build`, `start`, `lint`, `format`.

## Variables de entorno

`.env.local` con variables `NEXT_PUBLIC_FIREBASE_*` según tu proyecto Firebase.
