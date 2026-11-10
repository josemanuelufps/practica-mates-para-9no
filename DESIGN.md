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

* **Primary Typeface:** `Plus Jakarta Sans` (humanista geométrico, excelente legibilidad en pantallas retina y móviles).
* **Code / Grammar & Data Typeface:** `JetBrains Mono` (para verbos, estructuras temporales `had + V3` y marcadores gramaticales).
* **Text Wrapping & Balance:**
  * `text-wrap: balance` aplicado en todos los encabezados (H1, H2, H3) para evitar palabras huérfanas.
  * `text-wrap: pretty` en los párrafos explicativos para garantizar un cierre armónico de líneas.
* **Títulos y Escala:**
  * H1: 2rem / 32px (sm: 2.25rem / 36px), peso 800 (extrabold), tracking `-0.025em`.
  * H2: 1.25rem / 20px (sm: 1.5rem / 24px), peso 700 (bold), tracking `-0.02em`.
  * H3: 1rem / 16px (sm: 1.125rem / 18px), peso 600 (semibold).
* **Lectura y Medida:** Longitud de línea confinada (`max-w-2xl` / 65–75 caracteres) para reducir la fatiga en el repaso de condicionales.
* **Compensación en Modo Oscuro:** Tracking ligeramente más abierto (`-0.006em`) para compensar el efecto de irradiación de luz en fondo oscuro.

## Componentes y Superficies

* **Tarjetas:** Bordes delgados (1px), esquinas redondeadas (`rounded-xl` / 12px) y micro-sombras difusas; nunca bordes gruesos ni sombras duras sin desenfoque.
* **Slots de Palabras (Drag & Drop / Click):** Borde discontinuo en estado vacío (`border-dashed`), iluminación suave al arrastrar sobre ellos y encaje tipo "pieza de rompecabezas" al depositar la palabra.
* **Botones:** Área táctil mínima de 44px para dedos en móvil, con transiciones de color de 150ms.
* **Selección de Texto:** Personalizada con tono verde bosque suave (`selection:bg-emerald-200 dark:selection:bg-emerald-900/60`).
