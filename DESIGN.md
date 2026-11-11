---
name: Apoyo Académico 9°
description: Guía y plataforma de repaso interactivo para 9° grado (Álgebra, Geoestadística e Inglés)
colors:
  primary: "#2b2d42"
  primary-deep: "#1c1d2c"
  accent: "#ef233c"
  accent-deep: "#d90429"
  slate: "#8d99ae"
  neutral-bg: "#edf2f4"
  neutral-surface: "#ffffff"
  neutral-surface-dark: "#1c1d2c"
  neutral-canvas-dark: "#0e0f17"
  success: "#16a34a"
  success-bg: "#f0fdf4"
  error: "#d90429"
  error-bg: "#fdf2f4"
typography:
  display:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.018em"
  body:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.011em"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent-deep}"
  button-secondary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "10px 18px"
  button-secondary-hover:
    backgroundColor: "{colors.primary-deep}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
---

# Design System: Apoyo Académico 9°

## Overview

**Creative North Star: "The Editorial Study Sanctuary"**

Inspirado en la tipografía editorial contemporánea, la sobriedad académica de alto rendimiento y los cuadernos de trabajo universitario. Sustituye las paletas infantiles o genéricas por un entorno visual de serenidad, alta legibilidad y contraste nítido, diseñado para sesiones de estudio concentrado donde el estudiante razona con claridad sin fatiga visual.

El sistema se estructura sobre la tensión armónica entre el azul pizarra profundo (`#2B2D42`), el blanco hielo sin deslumbramiento (`#EDF2F4`) y un acento carmesí imperial vivo (`#EF233C` / `#D90429`). Los ejercicios interactivos y los quices contrarreloj responden con inmediatez táctil y física calibrada: micro-escalas de rebote elástico, retroalimentación pedagógica instantánea y áreas de toque cómodas para móvil y escritorio.

**Key Characteristics:**
- **Contraste AAA Garantizado:** Relaciones de contraste superiores a 11.4:1 en modo claro y 14.2:1 en modo oscuro.
- **Rigor Tipográfico Dual:** `Outfit` para prosa humanista y `JetBrains Mono` con números tabulares (`tnum`) para estructuras gramaticales, KaTeX y cronómetros.
- **Micro-interacción Táctil:** Snap-in elástico en slots de palabras, respuesta háptica visual (`active:scale-98`) y temporizador pulsante.
- **Cero Fricción Cognitiva:** Longitud de línea restringida (`45-75ch`), títulos balanceados sin viudas y explicaciones pedagógicas integradas.

## Colors

Paleta editorial estructurada en tonalidades frías de pizarra y carbón, contrastadas con carmesí vivo para puntos de acción y verde esmeralda para validaciones correctas.

### Primary
- **Slate Navy** (`#2B2D42`): Ancla de autoridad, encabezados y títulos en modo claro; superficie de tarjetas y elevación en modo oscuro.
- **Deep Navy** (`#1C1D2C`): Fondo de elevación y superficies modales en modo oscuro.

### Secondary
- **Imperial Crimson Vivid** (`#EF233C`): Acento vivo para la sesión de hoy, botón de inicio, badges destacados y temporizador crítico ($\le 5\text{s}$).
- **Imperial Crimson Deep** (`#D90429`): Estado hover de botones primarios, enlaces activos y énfasis tipográfico.

### Neutral
- **Ice Canvas** (`#EDF2F4`): Lienzo base en modo claro; evita el deslumbramiento del blanco puro `#FFFFFF`.
- **Pure White Surface** (`#FFFFFF`): Fondo de tarjetas y contenedores en modo claro.
- **Charcoal Canvas Dark** (`#0E0F17` / `#151622`): Lienzo base inmersivo en modo oscuro.
- **Cool Slate Grey** (`#8D99AE`): Texto secundario, divisores neutros, contornos inactivos y metadatos.
- **Muted Slate Text** (`#4F5868` / `#A4AFBF`): Cuerpo de texto secundario con contraste óptimo en ambos modos.

### Feedback
- **Success Emerald** (`#16A34A` / Fondo `#F0FDF4` / Borde `#BBF7D0`): Respuestas correctas, aciertos y tarjetas de felicitación.
- **Error Crimson** (`#D90429` / Fondo `#FDF2F4` / Borde `#F9CCD2`): Respuestas incorrectas, tiempo agotado y alertas.

### Named Rules
**The 10% Accent Rule.** El carmesí (`#EF233C`) se reserva estrictamente para el elemento de mayor valor en la pantalla (la sesión activa, el botón de continuar, el tiempo crítico o el botón de acción principal). Jamás se utiliza como fondo masivo de página o bloques decorativos grandes.

**The Pure Black Ban.** Nunca se utiliza negro puro (`#000000`) para fondos ni tipografía. En modo oscuro, el fondo es carbón pizarra (`#0E0F17`), conservando los reflejos fríos de la paleta.

## Typography

**Display & Body Font:** `Outfit` (geométrica con terminaciones humanistas y legibilidad impecable en pantalla).  
**Code & Data Font:** `JetBrains Mono` (monoespaciada con ligaduras técnicas, cero barrado y números tabulares obligatorios).

**Character:** Pareja sobria y precisa: la calidez geométrica de Outfit guía la lectura, mientras la rigidez matemática de JetBrains Mono ancla las fórmulas de KaTeX, las estructuras gramaticales en inglés (`had + V3`) y los cronómetros.

### Hierarchy
- **Display** (Extrabold 800, 2.25rem / 36px, `line-height: 1.15`, `letter-spacing: -0.03em`): Título principal del Hero en Landing y encabezados mayores de sesión. Aplica `text-wrap: balance`.
- **Headline** (Bold 700, 1.5rem / 24px, `line-height: 1.25`, `letter-spacing: -0.025em`): Títulos de sección, encabezados de tarjetas de sesión y modales.
- **Title** (Semibold 600, 1.125rem / 18px, `line-height: 1.35`, `letter-spacing: -0.018em`): Enunciados de preguntas, nombres de temas y encabezados de ejercicios.
- **Body** (Regular 400 y Medium 500, 0.9375rem / 15px, `line-height: 1.6` en claro y `1.65` en oscuro, `letter-spacing: -0.011em`): Explicaciones pedagógicas y texto de lectura. Longitud de línea confinada a `45-75ch` (`max-w-prose`). Aplica `text-wrap: pretty`.
- **Label / Mono** (Semibold 600, 0.75rem / 12px, tabular-nums): Indicadores de progreso (`1 de 10`), temporizadores (`20s`), fórmulas matemáticas y badges.

### Named Rules
**The Tabular Numerics Rule.** Todo número que represente conteo, tiempo, fecha o puntuación debe renderizarse con números tabulares (`font-variant-numeric: tabular-nums`) para evitar oscilaciones de ancho en animaciones de cronómetro y badges.

**The Dark Mode Leading Compensation Rule.** En modo oscuro el interlineado del texto general aumenta a `1.65` y el espaciado entre letras se relaja a `-0.004em` para contrarrestar la irradiación óptica del texto luminoso sobre fondo carbón.

## Layout

Modelo espacial estructurado sobre contenedor central `max-w-5xl` con padding responsivo horizontal (`px-4 sm:px-6`). Cuadrícula de 12 columnas en el Hero y rejillas adaptables (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) para las tarjetas de sesión y opciones de respuesta.

- **Rhythm & Gaps:** Escala modular consistente de múltiplos de 4px (`gap-2` = 8px, `gap-3` = 12px, `gap-4` = 16px, `gap-6` = 24px, `gap-8` = 32px).
- **Separación de Bloques:** Espaciado vertical holgado (`space-y-6 sm:space-y-8`, secciones con `space-y-10 sm:space-y-14`) para permitir digestión cognitiva.
- **Measure:** Párrafos de lectura e instrucciones siempre limitados con `max-w-prose` para prevenir la dispersión ocular.

## Elevation & Depth

El sistema emplea **estratificación tonal plana por defecto** (Flat-By-Default), combinada con micro-sombras de tono pizarra para delimitar superficies elevadas sin generar ruido visual.

### Shadow Vocabulary
- **Subtle Surface** (`box-shadow: 0 2px 8px -1px rgba(43, 45, 66, 0.06), 0 1px 3px -1px rgba(43, 45, 66, 0.03)`): Usada en tarjetas de contenido en modo claro.
- **Subtle Dark Surface** (`box-shadow: 0 2px 10px -1px rgba(0, 0, 0, 0.45), 0 1px 4px -1px rgba(0, 0, 0, 0.3)`): Usada en tarjetas de contenido en modo oscuro sobre lienzo carbón.
- **Interactive Lift** (`transform: translateY(-1px)`): Elevación sutil en hover para tarjetas accionables.

### Named Rules
**The Flat-By-Default Rule.** Las superficies descansan completamente planas. Las sombras son micro-bordes atmosféricos que separan la tarjeta del lienzo; la jerarquía se establece por contraste tonal y bordes de 1px, jamás por sombras difusas pesadas.

## Shapes

Formas sobrias y bordes suavemente redondeados que proyectan un ambiente moderno y accesible:
- **Contenedores y Tarjetas:** Esquinas con radio `rounded-2xl` (16px) y `rounded-xl` (12px).
- **Botones y Controles:** Radio `rounded-xl` (12px) y `rounded-lg` (8px).
- **Badges y Pastillas:** Radio `rounded-full` (9999px) para estados, etiquetas de fecha y temporizadores.
- **Bordes:** Filete nítido de 1px (`border border-slate-200 dark:border-navy-700`) en todas las tarjetas y paneles.
- **Slots de Palabras:** Contorno discontinuo de 2px (`border-2 border-dashed border-crimson-400/80`) para indicar área receptora táctil.

## Components

Todos los componentes siguen la filosofía **táctil, segura y reactiva**, garantizando un área de contacto mínima de 44px en móviles y feedback en menos de 100ms.

### Buttons
- **Primary Action (Carmesí):** Fondo `#EF233C` (hover `#D90429`), texto blanco, radio `rounded-xl`, padding `px-5 py-2.5`, micro-escala `active:scale-98` y sombra sutil.
- **Secondary Structured (Navy):** Fondo `#2B2D42` (hover `#1C1D2C` en claro, `#232537` en oscuro), texto blanco/hielo, radio `rounded-xl`.
- **Outline / Ghost:** Fondo transparente, borde de 1px `border-slate-300 dark:border-navy-700`, texto slate/navy, hover `bg-ice-200 dark:bg-navy-700`.

### Word Bank Chips (Tactile Slots)
- **Ficha en Banco:** Fondo blanco/navy-900, borde `border-slate-300 dark:border-navy-600`, texto semibold, cursor pointer o grab. Animación `pop-in` (220ms) al liberarse.
- **Slot Receptor:** Fondo `bg-crimson-50/40 dark:bg-crimson-950/40`, borde discontinuo carmesí. Al depositar la palabra, se dispara animación elástica `snap-in` (180ms cubic-bezier).

### Timed Quiz Slide (Contrarreloj 20s)
- **Barra de Tiempo:** Barra lineal continua de 8px de altura con transición linear de 1s. Fondo `ice-200 dark:navy-900`, relleno `navy-600 dark:crimson-500` que cambia a `crimson-600` parpadeante en $\le 5$s.
- **Badge Numérico de Cuenta Regresiva:** Pastilla monoespaciada `rounded-full` con icono de temporizador que pulsa (`animate-pulse`) en rojo crítico cuando quedan 5 segundos o menos.
- **Opciones de Respuesta Rápida:** Cajas de selección múltiple, clasificación binaria A vs B y botones de juicio correcto/incorrecto con altura mínima de 48-64px para toque ágil.

### Feedback Banner (5 Segundos)
- **Contenedor:** Borde de 1px con código cromático (verde acierto / rojo fallo), icono explicativo y texto didáctico estructurado.
- **Control de Avance:** Muestra cuenta regresiva de 5s con botón manual de salto ("Continuar ahora") para estudiantes de lectura rápida.

### Navigation Header
- Cabecera fija (`sticky top-0 z-50`) con efecto cristal translúcido (`bg-ice-300/90 dark:bg-navy-950/90 backdrop-blur-md`) y borde inferior de 1px.
- Botones de navegación compactos con badge de fecha ("10 Nov") y modo contrarreloj ("20s").
- Interruptor de tema claro/oscuro con iconos Sun/Moon y transición fluida.

## Do's and Don'ts

### Do:
- **Do** mantener el área de interacción táctil en $\ge 44\text{px}$ para todos los botones, fichas y opciones de quiz en móvil.
- **Do** aplicar `text-wrap: balance` en encabezados y `text-wrap: pretty` en explicaciones didácticas.
- **Do** emplear números tabulares (`tabular-nums`) en cronómetros, contadores y fórmulas KaTeX.
- **Do** reservar el carmesí (`#EF233C`) para llamadas a la acción primarias y estados de urgencia/atención.
- **Do** incluir retroalimentación pedagógica inmediata con su justificación en español tras cada respuesta.

### Don'ts:
- **Don't** utilizar negro puro (`#000000`) ni blanco puro (`#FFFFFF`) plano como fondos generales de la aplicación.
- **Don't** mostrar la categoría o tema pedagógico interno durante las diapositivas de quices contrarreloj (evitar spoilers).
- **Don't** permitir que las líneas de texto superen los $75\text{ch}$ de longitud en explicaciones teóricas.
- **Don't** usar sombras proyectadas pesadas, resplandores de neón ni gradientes estridentes sobre texto.
- **Don't** bloquear el avance del estudiante: el temporizador de retroalimentación de 5s siempre debe tener un botón para continuar de inmediato.
