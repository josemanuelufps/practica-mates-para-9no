# Design System

<!-- impeccable:design-schema 1 -->

## Visual World

**Cuaderno de Estudio Orgánico (Notion-Editorial & Warm Forest):**
Inspirado en la serenidad de los cuadernos de notas de alta calidad y la calidez del papel editorial. La paleta combina un **Verde Bosque Profundo** (concentración, calma y autoridad académica) con fondos **Crema / Papel Cálido** en modo claro y **Carbón Musgo Profundo** en modo oscuro, puntuados por un **Terracota Cálido** para fechas de sesiones, insignias activas y llamadas a la acción sin estridencias.

## Color Tokens

### Light Theme (Crema & Papel)
* **Canvas Background:** `#FBFBFA` (fondo cálido tipo cuaderno/Notion, elimina el deslumbramiento del blanco puro).
* **Surface / Cards:** `#FFFFFF` con borde `#E8E7E1` y sombra suave `0 2px 8px rgba(27, 67, 50, 0.04)`.
* **Surface Elevated / Hover:** `#F4F3EE`.
* **Primary (Verde Bosque):** `#1B4332` (títulos, botones principales y acentos de navegación).
* **Secondary Accent (Terracota):** `#C85A32` (fechas clave de sesión, badges activos).
* **Body Text:** `#1E2421` (contraste > 10:1 con el fondo).
* **Muted Text:** `#535F57` (contraste > 4.8:1 con el fondo).
* **Semantic Feedback:**
  * **Acierto / Correcto:** Texto `#1B4332`, fondo `#EAF4EE`, borde `#A3D9B8`.
  * **Error / Revisión:** Texto `#9A2C2C`, fondo `#FDF0F0`, borde `#F3B6B6`.
  * **Pista / Justificación:** Texto `#7C4A1E`, fondo `#FAF2EB`, borde `#E8CEBC`.

### Dark Theme (Carbón Musgo)
* **Canvas Background:** `#121614` (base carbón con sutil matiz verdoso, relajante para sesiones nocturnas).
* **Surface / Cards:** `#1A201C` con borde `#27322C` y sombra suave `0 2px 10px rgba(0, 0, 0, 0.25)`.
* **Surface Elevated / Hover:** `#222B26`.
* **Primary (Jade Bosque):** `#52B788` (botones principales oscuros y acentos destacados).
* **Secondary Accent (Terracota Luminoso):** `#E07A5F` (etiquetas de sesión y resaltados).
* **Body Text:** `#ECF3EF` (contraste > 12:1).
* **Muted Text:** `#92A49B` (contraste > 5:1).
* **Semantic Feedback:**
  * **Acierto / Correcto:** Texto `#74C69D`, fondo `#14281E`, borde `#234937`.
  * **Error / Revisión:** Texto `#F28482`, fondo `#2C1617`, borde `#522A2D`.
  * **Pista / Justificación:** Texto `#E59866`, fondo `#271C14`, borde `#4A3525`.

## Typography & Hierarchy

* **Fuente:** Sistema sans-serif humanista (`system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`), optimizada para pantallas táctiles y fórmulas matemáticas.
* **Títulos:** Pesos semibold (600) y bold (700), sin mayúsculas forzadas ni falsos "eyebrows" decorativos.
* **Fórmulas:** Renderizado KaTeX integrado fluidamente en la línea de texto o en bloques aireados.
* **Espaciado de lectura:** Medida de cuerpo contenida (65–75 caracteres) para que la lectura de reglas en inglés sea descansada.

## Componentes y Superficies

* **Tarjetas:** Bordes delgados (1px), esquinas redondeadas (`rounded-xl` / 12px) y micro-sombras difusas; nunca bordes gruesos ni sombras duras sin desenfoque.
* **Slots de Palabras (Drag & Drop / Click):** Borde discontinuo en estado vacío (`border-dashed`), iluminación suave al arrastrar sobre ellos y encaje tipo "pieza de rompecabezas" al depositar la palabra.
* **Botones:** Área táctil mínima de 44px para dedos en móvil, con transiciones de color de 150ms.
* **Selección de Texto:** Personalizada con tono verde bosque suave (`selection:bg-emerald-200 dark:selection:bg-emerald-900/60`).
