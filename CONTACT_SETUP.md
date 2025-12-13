# Configuración del Formulario de Contacto

El formulario de contacto usa **Web3Forms**, un servicio gratuito que no requiere backend.

## Pasos para configurar:

1. **Crear cuenta en Web3Forms** (gratis)
   - Ve a: https://web3forms.com
   - Regístrate con tu email
   - Verifica tu email

2. **Obtener tu Access Key**
   - Una vez dentro, copia tu "Access Key"
   - Es una cadena como: `a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6`

3. **Configurar en el código**
   - Abre el archivo: `app/contact/page.tsx`
   - Busca la línea 31: `access_key: "YOUR_ACCESS_KEY_HERE"`
   - Reemplaza `YOUR_ACCESS_KEY_HERE` con tu Access Key real

4. **Personalizar links de redes sociales**
   - En el mismo archivo (`app/contact/page.tsx`)
   - Busca las líneas 196, 207, 218 (links de LinkedIn, GitHub, Twitter)
   - Reemplaza con tus URLs reales:
     - LinkedIn: `https://linkedin.com/in/tu-perfil`
     - GitHub: `https://github.com/tu-usuario`
     - Twitter: `https://twitter.com/tu-usuario`

5. **Actualizar email de contacto**
   - Línea 100: Reemplaza `contacto@convieneono.com` con tu email real
   - También actualiza en `app/privacy/page.tsx` línea 102
   - También actualiza en `app/terms/page.tsx` línea 109

## Características del formulario:

✅ Envío real de emails (no simulado)
✅ Validación de campos
✅ Mensajes de éxito/error
✅ Links a redes sociales
✅ Diseño responsive
✅ Primera persona singular (coherente con "Acerca de")

## Alternativas a Web3Forms:

Si prefieres otro servicio, puedes usar:
- **Formspree**: https://formspree.io
- **EmailJS**: https://www.emailjs.com
- **Netlify Forms**: Si deployeas en Netlify

Solo necesitas cambiar el endpoint en la función `handleSubmit`.

