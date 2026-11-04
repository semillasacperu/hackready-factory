// Archivo: src/services/gemini-service.js
import { AI_CONFIG } from '../config/ai-config.js';

export const SYSTEM_PROMPTS = {
    RETO_MAP: `
Actúa como Arquitecto Metodológico del HackReady Toolkit. Analiza la Asignatura y el Problema ingresados.
Selecciona estrictamente una de las 5 dimensiones oficiales del Reto Map:
1. Experiencias activas y personalizadas
2. Evaluación auténtica y logro de competencias
3. Analítica de aprendizaje
4. Aprendizaje inmersivo
5. Investigación e Innovación basada en evidencia

Responde estrictamente en formato JSON válido:
{
  "retoSeleccionado": "Nombre exacto de la dimensión",
  "justificationPedagogica": "Explicación detallada de qué aspecto de la calidad académica está en juego para esta asignatura."
}`,

    PROBLEM_CARD: `
Actúa como Auditor Metodológico de la Problem Card. Construye el Problem Statement desglosando obligatoriamente los 6 elementos:
- Usuario
- Contexto
- Evidencia
- Necesidad
- Problema
- Impacto
Responde estrictamente en formato JSON válido:
{
  "statement": {
    "usuario": "...",
    "contexto": "...",
    "evidencia": "...",
    "necesidad": "...",
    "problema": "...",
    "impacto": "..."
  },
  "audit": {
    "esSolucionDisfrazada": false,
    "feedbackAuditoria": "Evaluación rigurosa del diagnóstico enfocado exclusivamente en el curso."
  }
}`,

    PROMPT_CARD: `
Actúa como Ingeniero de Prompts Educativos senior. Diseña un Prompt Pedagógico estructurado bajo los 7 elementos obligatorios de la fórmula HackReady.
Responde estrictamente en formato JSON válido:
{
  "contexto": "...",
  "rol": "...",
  "objetivo": "...",
  "informacion": "...",
  "restricciones": "...",
  "formato": "...",
  "iteracion": "..."
}`,

    MVP_CARD: `
Actúa como Diseñador de Prototipos EdTech (MVP Card). Construye el prototipo demostrable.
Responde estrictamente en formato JSON válido:
{
  "usuario": "...",
  "accionPrincipal": "...",
  "respuestaSistema": "...",
  "evidenciaValor": "...",
  "flujoPasos": [
    "Paso 1: ...",
    "Paso 2: ...",
    "Paso 3: ...",
    "Paso 4: ...",
    "Paso 5: ..."
  ]
}`,

    PITCH_CARD: `
Actúa como Coach de Presentaciones de Alto Impacto. Estructura un guion persuasivo de 4 minutos bajo la secuencia exacta HackReady.
Responde estrictamente en formato JSON válido:
{
  "problema": "...",
  "usuario": "...",
  "solucion": "...",
  "mvp": "...",
  "impacto": "..."
}`
};

export async function callGeminiAPI(systemInstruction, userContent) {
    const apiKey = AI_CONFIG.getApiKey();
    if (!apiKey) {
        return simulateDynamicAIResponse(systemInstruction, userContent);
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${AI_CONFIG.DEFAULT_MODEL}:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ role: "user", parts: [{ text: `${systemInstruction}\n\nDatos actuales del usuario:\n${userContent}` }] }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`Error en API Gemini: ${response.statusText}`);
        const data = await response.json();
        const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        // Limpiar bloques de código markdown si los trae la IA
        const cleanJson = textresponse.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanJson);
    } catch (error) {
        console.warn("Falla en API o parseo, utilizando simulador dinámico estructurado:", error);
        return simulateDynamicAIResponse(systemInstruction, userContent);
    }
}

function simulateDynamicAIResponse(systemInstruction, userContent) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const courseMatch = userContent.match(/Curso:\s*(.+?)(\||$)/i);
            const courseName = courseMatch ? courseMatch[1].trim() : "Asignatura Académica";

            if (systemInstruction.includes('RETO_MAP')) {
                resolve({
                    retoSeleccionado: "Reto 2: Evaluación auténtica y logro de competencias",
                    justificationPedagogica: `Para la asignatura de ${courseName}, la calidad académica exige medir de forma fidedigna el juicio crítico y la transferencia de saberes frente a problemas reales del entorno.`
                });
            } else if (systemInstruction.includes('PROBLEM_CARD')) {
                resolve({
                    statement: {
                        usuario: `Estudiantes matriculados y cuerpo docente de ${courseName}.`,
                        contexto: "Sesiones de aprendizaje síncronas y asíncronas en plataforma virtual.",
                        evidencia: "Dificultades observadas en la aplicación práctica y análisis crítico de los contenidos del sílabo.",
                        necesidad: "Implementar metodologías activas que vinculen la teoría con evidencias de desempeño.",
                        problema: `Las estrategias convencionales en ${courseName} promueven la memorización y limitan la evaluación del razonamiento complejo.`,
                        impacto: "Elevación del perfil de egreso y desarrollo competencias de pensamiento superior."
                    },
                    audit: {
                        esSolucionDisfrazada: false,
                        feedbackAuditoria: "Diagnóstico metodológico rigurosamente enfocado en la problemática del curso, libre de sesgos tecnológicos prematuros."
                    }
                });
            } else if (systemInstruction.includes('PROMPT_CARD')) {
                resolve({
                    contexto: `Asignatura: ${courseName} | Marco metodológico HackReady.`,
                    rol: "Copiloto pedagógico especializado en aprendizaje activo y desarrollo crítico.",
                    objetivo: "Guiar al estudiante en la resolución de casos vinculados al diagnóstico de la asignatura.",
                    informacion: "Sílabo oficial, matriz de consistencia y evidencias de aula.",
                    restricciones: "No otorgar soluciones directas; incentivar la argumentación basada en datos.",
                    formato: "Casos prácticos estructurados con rúbrica integrada de evaluación.",
                    iteracion: "Ajustar el nivel de andamiaje según el progreso del estudiante."
                });
            } else if (systemInstruction.includes('MVP_CARD')) {
                resolve({
                    usuario: `Estudiantes y docentes de ${courseName}`,
                    accionPrincipal: "Analizar situación problemática y proponer solución argumentada",
                    respuestaSistema: "Retroalimentación formativa y rúbrica analítica breve",
                    evidenciaValor: "Evidencia de desempeño crítico documentada",
                    flujoPasos: [
                        "Paso 1: Presentación interactiva de la situación problemática de la asignatura.",
                        "Paso 2: Análisis guiado e identificación de evidencias clave por el estudiante.",
                        "Paso 3: Formulación de la propuesta de solución fundamentada.",
                        "Paso 4: Evaluación formativa rápida mediante rúbrica analítica (0 a 2 pts).",
                        "Paso 5: Retroalimentación cualitativa automatizada orientada al cierre de brechas."
                    ]
                });
            } else {
                resolve({
                    problema: `¿Cómo transformar la comprensión pasiva en capacidad de análisis crítico en ${courseName}?`,
                    usuario: "Estudiantes de primer ciclo y docentes de la asignatura.",
                    solucion: "Prototipo EdTech centrado en actividades de evaluación auténtica y andamiaje cognitivo.",
                    mvp: "Flujo mínimo interactivo de 5 pasos con validación por rúbrica analítica.",
                    impacto: "Innovación escalable, de costo cero en licencias y alineada al modelo educativo institucional."
                });
            }
        }, 400);
    });
}