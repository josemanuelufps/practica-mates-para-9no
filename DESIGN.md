# Design System

<!-- impeccable:design-schema 1 -->

## Visual World

**Editorial Slate & Crimson (Pizarra Azulada, Blanco Hielo y Carmesí Imperial):**
Inspirado en la tipografía editorial moderna, publicaciones académicas contemporáneas y cuadernos de estudio de alto rendimiento. Sustituye los tonos verdes y terracota por una paleta nítida, sobria y de altísimo contraste estructurada sobre la armonía clásica:
`#2B2D42` (Pizarra Azulada / Space Cadet), `#8D99AE` (Gris Pizarra / Cool Grey), `#EDF2F4` (Blanco Hielo / Anti-flash White), `#EF233C` (Carmesí Imperial) y `#D90429` (Rojo Carmesí Profundo).

## Color Tokens & Roles

### 1. Paleta Primaria Solicitada
* **`#2B2D42` (Navy / Space Cadet):** Ancla de autoridad, estructura y títulos en modo claro; superficie de tarjetas y elevación en modo oscuro.
* **`#8D99AE` (Slate / Cool Grey):** Texto secundario, bordes sutiles, estados inactivos e indicadores neutrales.
* **`#EDF2F4` (Ice / Anti-flash White):** Lienzo principal en modo claro; texto de alto contraste en modo oscuro.
* **`#EF233C` (Crimson Vivid / Imperial Red):** Acento vivo para la sesión de hoy, botones destacados, indicadores activos y puntos de atención.
* **`#D90429` (Crimson Deep):** Hover de botones principales, estados activos firmes y realce de llamadas a la acción.

---

### Light Theme (Blanco Hielo & Pizarra)
* **Canvas Background:** `#EDF2F4` (Limpio, moderno, sin deslumbramiento).
* **Surface / Cards:** `#FFFFFF` con borde `#DFE5E8` (`ice-400`) y micro-sombra `0 2px 8px -1px rgba(43, 45, 66, 0.06)`.
* **Surface Elevated / Hover:** `#F4F7F8` (`ice-200`).
* **Primary (Slate Navy):** `#2B2D42` (Títulos H1/H2, botones estructurados y texto de marca).
* **Primary Accent (Carmesí):** `#D90429` / `#EF233C` (Botón de sesión activa de hoy, insignias destacadas).
* **Body Text:** `#2B2D42` (Contraste **11.4:1** sobre `#EDF2F4`, estándar WCAG AAA).
* **Secondary / Muted Text:** `#4F5868` (`slate-700`, Contraste **6.2:1** sobre `#EDF2F4`).
* **Borders & Dividers:** `#E2E6EA` / `#DFE5E8`.

---

### Dark Theme (Pizarra Carbón & Hielo Luminoso)
* **Canvas Background:** `#0E0F17` / `#151622` (`navy-950` / `navy-900`, tono carbón azulado profundo derivado de `#2B2D42`).
* **Surface / Cards:** `#1C1D2C` (`navy-800`) con borde `#2B2D42` / `#3D415C` y micro-sombra `0 2px 10px rgba(0, 0, 0, 0.45)`.
* **Surface Elevated / Hover:** `#232537` (`navy-700`).
* **Body Text & Headings:** `#EDF2F4` (`ice-300`, Contraste **14.2:1** sobre fondo oscuro).
* **Secondary Text:** `#A4AFBF` / `#8D99AE` (`slate-400` / `slate-500`, Contraste **5.4:1** sobre fondo oscuro).
* **Primary Accent (Carmesí Luminoso):** `#EF233C` (Botones de acción principal y badges destacados).
* **Borders & Dividers:** `#232537` / `#3D415C`.

---

### Semantic Feedback Tokens
* **Acierto / Correcto:**
  * Fondo Claro: `#F0FDF4`, Borde: `#BBF7D0`, Texto: `#15803D`.
  * Fondo Oscuro: `#052E16`/60, Borde: `#166534`, Texto: `#4ADE80`.
* **Error / Corrección:**
  * Fondo Claro: `#FDF2F4`, Borde: `#F9CCD2`, Texto: `#B50322` (`crimson-700`).
  * Fondo Oscuro: `#3D000B`/60, Borde: `#8C021A`, Texto: `#F49DA7`.
* **Pista / Justificación Didáctica:**
  * Fondo Claro: `#F4F5F7` (`navy-50`), Borde: `#C7CAD4`, Texto: `#2B2D42`.
  * Fondo Oscuro: `#1C1D2C` (`navy-800`), Borde: `#3D415C`, Texto: `#EDF2F4`.

---

## Typography & Hierarchy

* **Primary Typeface:** `Plus Jakarta Sans` (claridad geométrica humanista para máxima concentración de lectura).
* **Code / Grammar & Data Typeface:** `JetBrains Mono` (para estructuras `had + V3`, marcadores temporales, conectores y fórmulas KaTeX).
* **OpenType Features Activas:** `cv02`, `cv03`, `cv04`, `cv11`, `tnum` (números tabulares) y `zero` (cero barrado en mono).
* **Line Height & Leading:**
  * Cuerpo de texto en modo claro: `line-height: 1.6`.
  * Compensación en modo oscuro: `line-height: 1.65` (evita empaste tipográfico).
* **Tracking & Espaciado entre caracteres:**
  * Modo claro: `-0.011em` para ritmo compacto y nítido.
  * Compensación en modo oscuro: `-0.004em` (apertura calculada para neutralizar la irradiación óptica de luz clara sobre fondo oscuro).
* **Line Wrapping & Balance:**
  * `text-wrap: balance` aplicado en todos los encabezados (H1–H4) para eliminar líneas viudas y palabras huérfanas.
  * `text-wrap: pretty` en todos los párrafos pedagógicos y explicaciones de quizzes para garantizar un salto armónico de líneas.
* **Escala y Pesos:**
  * **H1:** 2rem / 32px (sm: 2.25rem / 36px), peso 800 (extrabold), tracking `-0.03em`, line-height `1.15`.
  * **H2:** 1.25rem / 20px (sm: 1.5rem / 24px), peso 700 (bold), tracking `-0.025em`, line-height `1.25`.
  * **H3:** 1rem / 16px (sm: 1.125rem / 18px), peso 600 (semibold), tracking `-0.018em`, line-height `1.35`.
  * **Body:** 0.875rem / 14px (sm: 1rem / 16px), peso 400 (regular) y 500 (medium).
  * **Mono / Badges:** 0.75rem / 12px (text-[11px] / text-xs), peso 600 (semibold), tabular-nums.
* **Medida de Lectura (Measure):** Longitud de línea confinada estrictamente a `45–75ch` (`max-w-prose`) para prevenir el cansancio visual durante el repaso de inglés y álgebra.

---

## Componentes y Superficies

* **Tarjetas:** Bordes de 1px con radio `rounded-xl` (12px), sombras sutiles con tono pizarra (`rgba(43, 45, 66, ...)`).
* **Slots de Palabras:** Contorno discontinuo en reposo, encaje elástico `snap-in` al depositar y área táctil accesible $\ge 42\text{px}$.
* **Botones:** Área táctil mínima de 44px, con transición suave de 150ms.
* **Selección de Texto:** Personalizada con tono carmesí suave (`selection:bg-crimson-200 dark:selection:bg-crimson-900/60`).
