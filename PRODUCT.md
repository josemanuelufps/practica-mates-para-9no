# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 18 + TypeScript + Vite + Tailwind CSS + KaTeX + Lucide Icons (Despliegue estático en GitHub Pages).

## Users

* **Estudiante de 9° grado (Colombia):** Necesita repasar, consolidar y nivelar temas clave de Álgebra, Geoestadística e Inglés para aprobar sus exámenes y cerrar brechas académicas rápidamente.
* **Tutor universitario:** Estudiante de Ingeniería de Sistemas que guía las sesiones en vivo y utiliza la plataforma como soporte didáctico interactivo durante las clases.

## Product Purpose

Brindar una plataforma web libre, abierta y gratuita de acompañamiento académico con ejercicios prácticos interactivos, retroalimentación inmediata y explicaciones claras para cubrir el temario de 9° grado en 3 sesiones intensivas de repaso.

## Positioning

A diferencia de guías estáticas en PDF o plataformas complejas con registro obligatorio, esta herramienta ofrece práctica activa inmediata sin fricción: el estudiante puede arrastrar palabras a slots de texto en celular o PC, responder quizzes interactivos y ver al instante la solución con su justificación pedagógica.

## Operating Context

* **Sesiones guiadas en vivo:** El tutor y el alumno revisan la pantalla juntos durante las sesiones de estudio.
* **Dispositivos diversos:** Debe operar con total fluidez tanto en teléfonos móviles y tablets (pantallas táctiles con toques) como en computadores portátiles / de escritorio.
* **Red y acceso:** Conexión web ligera, alojada en GitHub Pages sin necesidad de backend, base de datos ni instalación de apps.

## Capabilities and Constraints

* **Capacidades interactivas:**
  * Ejercicios de rellenar espacios (Fill in the blanks) con normalización de respuestas.
  * Banco de palabras interactivo con doble modalidad: Drag & Drop nativo y Click-to-slot accesible para pantallas táctiles.
  * Quizzes de selección múltiple con feedback de color instantáneo, solución correcta y justificación concisa.
  * Soporte de fórmulas matemáticas con KaTeX (cilindro, cono, esfera, funciones y sistemas de ecuaciones).
  * Selector persistente de Modo Claro / Modo Oscuro.
* **Restricciones:**
  * Despliegue estático exclusivo en GitHub Pages con base path `/practica-mates-para-9no/`.
  * Sin autenticación de usuarios ni almacenamiento en la nube; contenido estructurado modularmente en TypeScript.
  * 100% público, gratuito y libre de fines comerciales o anuncios.

## Brand Commitments

* Identidad sobria, motivadora y pedagógica: pensada para inspirar confianza y enfoque en el aprendizaje, sin elementos infantiles ni sobrecarga visual.

## Evidence on Hand

* Temario completo de 9° grado (Álgebra, Geoestadística, Cuerpos Redondos e Inglés).
* Cronograma estructurado de 3 sesiones de estudio.
* Banco de ejercicios interactivos ya implementados y validados para Past Perfect y Condicionales (Zero, First, Second y Third).

## Product Principles

1. **Agilidad y Feedback Inmediato:** Cada error o acierto debe enseñar en el acto mediante una justificación sencilla y clara.
2. **Usabilidad Táctil Universal:** Cualquier actividad debe poder resolverse cómodamente con un solo dedo en un celular o con el ratón en un computador.
3. **Cero Fricción:** Acceso directo a los ejercicios en un clic, sin formularios, cuentas ni barreras.
4. **Claridad sobre Ruido:** El contenido matemático y gramatical debe respirar; el diseño acompaña y clarifica, nunca compite con la lectura.

## Accessibility & Inclusion

* Contraste óptimo según pautas WCAG en modo claro y modo oscuro.
* Fuentes legibles para fórmulas matemáticas y caracteres especiales en inglés.
* Controles táctiles con áreas de toque amplias (mínimo 44px) para dispositivos móviles.
