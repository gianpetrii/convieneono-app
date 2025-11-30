# ConvieneONo App

**Descubre el costo REAL de tus grandes decisiones financieras**

Una aplicación web moderna que te ayuda a tomar decisiones financieras inteligentes al comparar el costo real a largo plazo de comprar un auto o departamento versus invertir tu dinero.

## 🎯 ¿Qué Problema Resuelve?

Las personas entre 20-50 años con ahorros suficientes para hacer compras importantes enfrentan decisiones difíciles sin poder visualizar fácilmente:

- ✅ Los **costos ocultos y recurrentes** reales (mantenimiento, seguros, impuestos, expensas)
- ✅ El **costo de oportunidad** de no invertir ese dinero
- ✅ Qué opción los deja en **mejor posición financiera** a largo plazo

## 💡 Solución

ConvieneONo es una calculadora inteligente y visual que:

1. **Personaliza tus gastos** - No asumimos, tú ingresas TU realidad
2. **Compara escenarios** lado a lado con gráficos claros
3. **Muestra el impacto real** a 1, 5, 10 y 20 años
4. **Incluye depreciación** y apreciación de activos
5. **Visualiza el costo de oportunidad** - "Esto es lo que ganarías/perderías"

## 🚀 Características

### Calculadora de Autos
- Precio del auto vs inversión alternativa
- Gastos mensuales personalizables:
  - Seguro
  - Combustible (km/mes + consumo)
  - Mantenimiento
  - Estacionamiento (garage/calle)
  - Lavado
  - Patente/Impuestos
  - Reparaciones imprevistas
- Comparación con transporte alternativo (Uber/Taxi, Transporte público)
- Depreciación del vehículo
- Proyección a largo plazo

### Calculadora de Departamentos
- Precio del departamento vs inversión
- Gastos mensuales:
  - Expensas
  - Impuestos
  - Servicios
  - Seguro
  - Mantenimiento
- Comparación: Compra vs Alquiler + Inversión
- Filtros avanzados:
  - Apreciación del inmueble
  - Inflación
  - Costos de escrituración

## 🛠️ Tecnologías

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore)
- **UI Components**: shadcn/ui
- **Gráficos**: (Por implementar)
- **Estado**: Zustand + React Query
- **Formularios**: React Hook Form + Zod

## 📦 Instalación

1. **Clona el repositorio**

```bash
git clone https://github.com/gianpetrii/convieneono-app.git
cd convieneono-app
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Configura las variables de entorno**

Crea un archivo `.env.local` con tus credenciales de Firebase:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id

# App Configuration
NEXT_PUBLIC_APP_NAME="ConvieneONo"
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Inicia el servidor de desarrollo**

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📄 Estructura del Proyecto

```
convieneono-app/
├── app/
│   ├── (auth)/              # Autenticación
│   ├── (dashboard)/         # Panel de usuario
│   ├── calculadora/         # Calculadoras
│   │   ├── auto/           # Calculadora de autos
│   │   └── departamento/   # Calculadora de departamentos
│   ├── ejemplos/           # Casos de uso
│   ├── about/              # Acerca de
│   ├── contact/            # Contacto
│   └── page.tsx            # Landing page
├── components/
│   ├── ui/                 # Componentes UI base
│   ├── layout/             # Header, Footer
│   └── calculadora/        # Componentes de calculadoras
├── lib/
│   ├── firebase/           # Configuración Firebase
│   ├── hooks/              # Custom hooks
│   └── utils.ts            # Utilidades
└── types/                  # Tipos TypeScript
```

## 🎨 Casos de Uso

### Ejemplo 1: Auto vs Inversión
```
Tengo $25,000 ahorrados
Auto que me gusta: $20,000
Gastos mensuales estimados: $300

Resultado: En 5 años, invertir te dejaría con $8,500 más
```

### Ejemplo 2: Comprar vs Alquilar
```
Tengo $80,000 para inicial
Departamento: $200,000
Alquiler similar: $800/mes

Resultado: En 10 años, comprar te genera $45,000 más de patrimonio
```

## 🚀 Roadmap

### Fase 1 - MVP (En desarrollo)
- [x] Setup del proyecto
- [x] Branding y landing page
- [ ] Calculadora de autos básica
- [ ] Calculadora de departamentos básica
- [ ] Gráficos comparativos

### Fase 2 - Mejoras
- [ ] Sistema de usuarios (guardar comparaciones)
- [ ] Calculadora de financiamiento
- [ ] Más opciones de inversión
- [ ] Compartir comparaciones

### Fase 3 - Expansión
- [ ] Calculadora de otros bienes (motos, propiedades comerciales)
- [ ] API pública
- [ ] App móvil

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia AGPL-3.0. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 📧 Contacto

Gian Petri - [@gianpetrii](https://github.com/gianpetrii)

Link del proyecto: [https://github.com/gianpetrii/convieneono-app](https://github.com/gianpetrii/convieneono-app)

---

**Creado con ❤️ para ayudarte a tomar mejores decisiones financieras** 🚀
