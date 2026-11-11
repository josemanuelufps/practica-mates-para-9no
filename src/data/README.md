# Banco de Preguntas / Slides para Quices Contrarreloj

El banco de preguntas para los quices contrarreloj se almacena como un archivo de datos JSON independiente y estático en:

👉 **[`/public/data/timedQuizBank.json`](../../public/data/timedQuizBank.json)**

### ¿Por qué está en `/public/data/timedQuizBank.json`?
1. **Archivo Independiente:** Los profesores, tutores y desarrolladores pueden añadir, editar o corregir preguntas directamente en el archivo JSON sin necesidad de tocar código de componentes React ni recompilar la aplicación.
2. **Carga Bajo Demanda (On-Demand Fetch):** El archivo se descarga asíncronamente con `fetch()` solo cuando el estudiante entra a la sección de "Quices contrarreloj", reduciendo el tamaño del bundle inicial de la web por más de 100 KB.
3. **Caché en Memoria:** Una vez descargado en la sesión del navegador, se guarda en caché para que reiniciar o jugar nuevas rondas sea instantáneo.
4. **Tipado Estricto:** Los tipos e interfaces de TypeScript para todas las mecánicas (`match-pairs`, `sentence-builder`, `bug-hunter`, `timeline-sorter`, `binary-classify`, `multiple-choice`, etc.) residen en [`src/types/timedQuiz.ts`](../types/timedQuiz.ts).
