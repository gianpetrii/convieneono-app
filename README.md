# Base App

Una aplicación base completa y moderna para acelerar el desarrollo de tus proyectos web con Next.js, Firebase y Tailwind CSS.

## 🚀 Características

- ✅ **Next.js 14** con App Router
- ✅ **TypeScript** para código tipado y seguro
- ✅ **Firebase** (Authentication, Firestore, Storage)
- ✅ **Tailwind CSS** para estilos modernos
- ✅ **shadcn/ui** componentes UI hermosos y accesibles
- ✅ **Modo oscuro/claro** con next-themes
- ✅ **Autenticación completa** (Email/Password y Google)
- ✅ **Protección de rutas** con middleware
- ✅ **React Query** para manejo de estado del servidor
- ✅ **Zustand** para estado global
- ✅ **React Hook Form + Zod** para formularios y validación
- ✅ **Toast notifications** con Sonner
- ✅ **Diseño responsive** mobile-first
- ✅ **SEO optimizado** con metadata

## 📁 Estructura del Proyecto

```
base-app/
├── app/                      # App Router de Next.js
│   ├── (auth)/              # Grupo de rutas de autenticación
│   │   ├── login/           # Página de inicio de sesión
│   │   ├── register/        # Página de registro
│   │   └── forgot-password/ # Recuperación de contraseña
│   ├── (dashboard)/         # Grupo de rutas protegidas
│   │   ├── dashboard/       # Panel principal
│   │   ├── profile/         # Perfil de usuario
│   │   └── settings/        # Configuración
│   ├── about/               # Página acerca de
│   ├── contact/             # Página de contacto
│   ├── privacy/             # Política de privacidad
│   ├── terms/               # Términos y condiciones
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página de inicio
│   ├── not-found.tsx        # Página 404
│   ├── error.tsx            # Página de error
│   └── globals.css          # Estilos globales
├── components/              # Componentes reutilizables
│   ├── ui/                  # Componentes UI base (shadcn)
│   ├── layout/              # Componentes de layout
│   │   ├── header.tsx       # Header con navegación
│   │   └── footer.tsx       # Footer
│   ├── theme-provider.tsx   # Provider de tema
│   ├── theme-toggle.tsx     # Toggle de tema
│   └── providers.tsx        # Providers globales
├── lib/                     # Utilidades y configuración
│   ├── firebase/            # Configuración de Firebase
│   │   ├── config.ts        # Inicialización de Firebase
│   │   ├── auth.ts          # Funciones de autenticación
│   │   └── firestore.ts     # Funciones de Firestore
│   ├── hooks/               # Custom hooks
│   │   └── useAuth.ts       # Hook de autenticación
│   └── utils.ts             # Funciones utilitarias
├── types/                   # Tipos de TypeScript
│   └── index.ts             # Tipos globales
├── public/                  # Archivos estáticos
├── middleware.ts            # Middleware de Next.js
└── package.json             # Dependencias del proyecto
```

## 🛠️ Instalación

1. **Clona o copia este proyecto**

```bash
cd base-app
```

2. **Instala las dependencias**

```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Configura las variables de entorno**

Copia el archivo de ejemplo y configura tus variables:

```bash
cp .env.local.example .env.local
```

Luego edita `.env.local` con tus credenciales:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id

# App Configuration
NEXT_PUBLIC_APP_NAME="Tu App"
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Configura Firebase**

- Ve a [Firebase Console](https://console.firebase.google.com/)
- Crea un nuevo proyecto
- Habilita Authentication (Email/Password y Google)
- Crea una base de datos Firestore
- Copia las credenciales al archivo `.env.local`

5. **Inicia el servidor de desarrollo**

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📄 Páginas Incluidas

### Públicas
- `/` - Landing page con hero y features
- `/about` - Información sobre la aplicación
- `/contact` - Formulario de contacto
- `/privacy` - Política de privacidad
- `/terms` - Términos y condiciones

### Autenticación
- `/login` - Inicio de sesión
- `/register` - Registro de usuarios
- `/forgot-password` - Recuperación de contraseña

### Protegidas (requieren autenticación)
- `/dashboard` - Panel principal con estadísticas
- `/profile` - Perfil del usuario
- `/settings` - Configuración de la cuenta

### Errores
- `/404` - Página no encontrada
- `/error` - Error general

## 🎨 Personalización

### Colores y Tema

Edita `app/globals.css` para cambiar los colores del tema:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... más variables */
}
```

### Nombre de la Aplicación

Actualiza en varios lugares:
- `app/layout.tsx` - Metadata
- `components/layout/header.tsx` - Logo
- `.env.local` - NEXT_PUBLIC_APP_NAME

### Logo

Reemplaza el texto "Base App" en `components/layout/header.tsx` con tu logo:

```tsx
<Link href="/" className="flex items-center space-x-2">
  <Image src="/logo.svg" alt="Logo" width={32} height={32} />
  <span className="text-xl font-bold">Tu App</span>
</Link>
```

## 🔒 Autenticación

El proyecto incluye autenticación completa con Firebase:

- Email/Password
- Google Sign-In
- Recuperación de contraseña
- Protección de rutas
- Hook personalizado `useAuth`

### Uso del hook de autenticación

```tsx
import { useAuth } from "@/lib/hooks/useAuth";

function MyComponent() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div>Cargando...</div>;
  if (!user) return <div>No autenticado</div>;

  return (
    <div>
      <p>Hola, {user.displayName}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
```

## 📦 Componentes UI

El proyecto incluye componentes base de shadcn/ui:

- Button
- Input
- Card
- Label
- Skeleton
- Spinner
- Avatar

Para agregar más componentes, visita [shadcn/ui](https://ui.shadcn.com/).

## 🚀 Despliegue en Vercel

### Paso 1: Subir código a GitHub

1. **Inicializa el repositorio Git** (si aún no lo has hecho):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Crea un repositorio en GitHub**:
   - Ve a [github.com](https://github.com)
   - Haz clic en "New repository"
   - Nombra tu repositorio (ej: `mi-base-app`)
   - No inicialices con README, .gitignore o licencia (ya los tienes)
   - Haz clic en "Create repository"

3. **Conecta y sube tu código**:
   ```bash
   git remote add origin https://github.com/tu-usuario/mi-base-app.git
   git branch -M main
   git push -u origin main
   ```

### Paso 2: Importar proyecto en Vercel

1. **Inicia sesión en Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta (puedes usar GitHub para autenticarte)

2. **Importa tu repositorio**:
   - Haz clic en el botón **"Add New..."** → **"Project"**
   - O ve directamente a [vercel.com/new](https://vercel.com/new)
   - Conecta tu cuenta de GitHub si aún no lo has hecho
   - Busca y selecciona tu repositorio `mi-base-app`
   - Haz clic en **"Import"**

3. **Configura el proyecto**:
   - **Framework Preset**: Vercel debería detectar automáticamente "Next.js"
   - **Root Directory**: Deja en blanco (o `./` si tu proyecto está en la raíz)
   - **Build Command**: `npm run build` (debería estar preconfigurado)
   - **Output Directory**: `.next` (debería estar preconfigurado)
   - **Install Command**: `npm install` (debería estar preconfigurado)

### Paso 3: Configurar Variables de Entorno en Vercel

**⚠️ IMPORTANTE**: Antes de hacer el deploy, configura todas las variables de entorno:

1. **En la pantalla de configuración del proyecto**, desplázate hasta la sección **"Environment Variables"**

2. **Agrega cada variable una por una**:
   - Haz clic en **"Add"** o **"Add Another"**
   - Ingresa el nombre de la variable (ej: `NEXT_PUBLIC_FIREBASE_API_KEY`)
   - Ingresa el valor de la variable
   - Selecciona los ambientes donde aplicará:
     - ✅ **Production** (para producción)
     - ✅ **Preview** (para preview deployments)
     - ✅ **Development** (opcional, para desarrollo local en Vercel)

3. **Variables a agregar** (copia exactamente desde tu `.env.local`):
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
   NEXT_PUBLIC_APP_NAME="Tu App"
   NEXT_PUBLIC_APP_URL=https://tu-app.vercel.app
   ```

   **Nota**: Para `NEXT_PUBLIC_APP_URL`, usa la URL que Vercel te asignará (ej: `https://mi-base-app.vercel.app`) o tu dominio personalizado si lo configuras después.

4. **Verifica que todas las variables estén agregadas** antes de continuar

### Paso 4: Configurar Firebase para Producción

**⚠️ IMPORTANTE**: Debes autorizar el dominio de Vercel en Firebase:

1. **Obtén tu URL de Vercel**:
   - Después del primer deploy, Vercel te dará una URL como `https://mi-base-app.vercel.app`
   - También puedes verla en el dashboard de Vercel

2. **Autoriza el dominio en Firebase**:
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Selecciona tu proyecto
   - Ve a **Authentication** → **Settings** → **Authorized domains**
   - Haz clic en **"Add domain"**
   - Agrega: `tu-app.vercel.app` (sin `https://`)
   - Si usas dominio personalizado, agrégalo también
   - Haz clic en **"Add"**

### Paso 5: Desplegar

1. **Haz clic en "Deploy"** en la parte inferior de la pantalla de configuración

2. **Espera el despliegue**:
   - Vercel construirá tu aplicación automáticamente
   - Verás el progreso en tiempo real
   - El proceso toma aproximadamente 2-5 minutos

3. **Verifica el despliegue**:
   - Si todo sale bien, verás "Ready" con un enlace a tu aplicación
   - Haz clic en el enlace para ver tu app en vivo
   - La URL será algo como: `https://mi-base-app.vercel.app`

### Paso 6: Actualizar Variables de Entorno (si es necesario)

Si necesitas cambiar `NEXT_PUBLIC_APP_URL` después del primer deploy:

1. Ve a tu proyecto en Vercel
2. Ve a **Settings** → **Environment Variables**
3. Busca `NEXT_PUBLIC_APP_URL`
4. Edita el valor con tu URL real de Vercel
5. Haz un nuevo deploy (Vercel puede hacerlo automáticamente o puedes hacerlo manualmente)

### Configuración Adicional

- **Dominio Personalizado**: Ve a **Settings** → **Domains** para agregar tu propio dominio
- **Automatic Deployments**: Cada push a `main` desplegará automáticamente a producción
- **Preview Deployments**: Cada pull request creará un preview deployment único

### Troubleshooting

**Error: "Environment variables not found"**
- Verifica que agregaste todas las variables en Vercel
- Asegúrate de que las variables comienzan con `NEXT_PUBLIC_` si se usan en el cliente

**Error: "Firebase unauthorized domain"**
- Agrega tu dominio de Vercel en Firebase Console → Authentication → Authorized domains

**El build falla**
- Revisa los logs en Vercel para ver el error específico
- Verifica que todas las dependencias estén en `package.json`

## 📚 Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run start    # Inicia el servidor de producción
npm run lint     # Ejecuta el linter
npm run format   # Formatea el código con Prettier
```

## 🤝 Contribuir

Este es un proyecto base diseñado para ser personalizado. Siéntete libre de:

- Agregar nuevas características
- Mejorar el diseño
- Optimizar el rendimiento
- Compartir tus mejoras

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🆘 Soporte

Si tienes preguntas o problemas:

1. Revisa la documentación de [Next.js](https://nextjs.org/docs)
2. Consulta la documentación de [Firebase](https://firebase.google.com/docs)
3. Visita la documentación de [Tailwind CSS](https://tailwindcss.com/docs)

## 🎯 Próximos Pasos

Después de configurar el proyecto, considera:

1. Personalizar los colores y el tema
2. Agregar tu logo y branding
3. Configurar las reglas de seguridad de Firestore
4. Agregar más páginas según tus necesidades
5. Implementar características específicas de tu aplicación
6. Configurar analytics y monitoreo
7. Agregar tests unitarios y de integración

¡Feliz desarrollo! 🚀

