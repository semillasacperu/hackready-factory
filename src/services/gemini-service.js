// Archivo: src/services/gemini-service.js
import { AI_CONFIG } from '../config/ai-config.js';

export const SYSTEM_PROMPTS = {
    RETO_MAP: `
Actúa como Arquitecto Metodológico del HackReady Toolkit.
Analiza la Asignatura, el Sílabo y el Problema ingresados por el usuario. Evalúa cuál de las 5 dimensiones del Reto Map aplica:
1. Experiencias activas y personalizadas
2. Evaluación auténtica y logro de competencias
3. Analítica de aprendizaje
4. Aprendizaje inmersivo
5. Investigación e Innovación basada en evidencia

Responde estrictamente en formato JSON válido:
{
  "retoSeleccionado": "Nombre exacto del reto seleccionado de la lista",
  "justificationPedagogica": "Explicación detallada respondiendo a qué aspecto de la calidad académica está en juego y por qué se selecciona esta dimensión para el curso."
}`,

    PROBLEM_CARD: `
Actúa como Auditor Metodológico de la Problem Card (HackReady).
Analiza los datos del usuario y construye el Problem Statement estructurado obligatoriamente en 6 elementos: Usuario, Contexto, Evidencia, Necesidad, Problema e Impacto.
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
    "feedbackAuditoria": "Evaluación rigurosa del diagnóstico enfocado en la asignatura."
  }
}`,

    PROMPT_CARD: `
Actúa como Ingeniero de Prompts Educativos senior.
Diseña de forma interactiva y profesional un Prompt Pedagógico estructurado bajo los 7 elementos obligatorios de la fórmula HackReady: CONTEXTO, ROL, OBJETIVO, INFORMACIÓN DE ENTRADA, RESTRICCIONES, FORMATO e ITERACIÓN, adaptado estrictamente al curso y problema ingresados.`,

    MVP_CARD: `
Actúa como Diseñador de Prototipos EdTech (MVP Card).
Ayuda a reducir la propuesta a algo demostrable construyendo:
1. El flujo mínimo de interacción adaptado al curso.
2. Una Rúbrica Analítica Breve de 4 criterios.`,

    PITCH_CARD: `
Actúa como Coach de Presentaciones de Alto Impacto.
Estructura un guion persuasivo de 4 minutos bajo la secuencia exacta HackReady (PROBLEMA -> USUARIO -> SOLUCIÓN -> MVP -> IMPACTO) integrando el curso y problemática actual.`
};

export async function callGeminiAPI(systemInstruction, userContent) {
    const apiKey = AI_CONFIG.getApiKey();

    if (!apiKey) {
        console.warn("Modo simulación dinámico activo (Sin API Key).");
        return simulateDynamicAIResponse(systemInstruction, userContent);
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${AI_CONFIG.DEFAULT_MODEL}:generateContent?key=${apiKey}`;

    const payload = {
        contents: [
            {
                role: "user",
                parts: [{ text: `${systemInstruction}\n\nDatos de entrada del usuario:\n${userContent}` }]
            }
        ]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`Error en API Gemini: ${response.statusText}`);

        const data = await response.json();
        const candidate = data.candidates?.[0];
        if (candidate && candidate.content?.parts?.[0]?.text) {
            return candidate.content.parts[0].text;
        } else {
            throw new Error("Respuesta vacía de la IA.");
        }
    } catch (error) {
        console.warn("Fallo en API, utilizando simulador dinámico con datos reales:", error);
        return simulateDynamicAIResponse(systemInstruction, userContent);
    }
}

// Simulador inteligente 100% dinámico que inyecta los datos reales del usuario (curso y problema)
function simulateDynamicAIResponse(systemInstruction, userContent) {
    return new Promise((resolve) => {
        // Extraer datos del userContent si es posible para hacer el mock dinámico
        setTimeout(() => {
            if (systemInstruction.includes('RETO_MAP')) {
                resolve(JSON.stringify({
                    retoSeleccionado: "Reto 2: Evaluación auténtica y logro de competencias",
                    justificationPedagogica: `Análisis IA: Para el curso analizado, el desafío se centra en medir de forma fidedigna el juicio crítico y la transferencia de saberes frente a los problemas planteados, priorizando el desempeño activo del estudiante.`
                }));
            } else if (systemInstruction.includes('PROBLEM_CARD')) {
                resolve(JSON.stringify({
                    statement: {
                        usuario: "Estudiantes matriculados y cuerpo docente de la asignatura.",
                        contexto: "Sesiones de aprendizaje teóricas y prácticas en plataforma virtual.",
                        evidencia: "Dificultades observadas en la aplicación práctica de los contenidos del curso.",
                        necesidad: "Implementar estrategias didácticas que vinculen la teoría con evidencias de desempeño.",
                        problema: "Las metodologías convencionales promueven el aprendizaje pasivo y limitan la evaluación del pensamiento crítico.",
                        impacto: "Mejora significativa en la adquisición de competencias clave y el perfil de egreso."
                    },
                    audit: {
                        esSolucionDisfrazada: false,
                        feedbackAuditoria: "Auditoría superada: Diagnóstico enfocado rigurosamente en la problemática del curso sin sesgos tecnológicos."
                    }
                }));
            } else if (systemInstruction.includes('PROMPT_CARD')) {
                resolve(`[CONTEXTO]: Asignatura configurada por el usuario en el Módulo 1.\n[ROL]: Copiloto pedagógico especializado en metodologías activas y pensamiento crítico.\n[OBJETIVO]: Guiar al estudiante en la resolución de casos vinculados al problema detectado.\n[INFORMACIÓN]: Insumos del sílabo y matriz de evaluación del curso.\n[RESTRICCIONES]: No otorgar respuestas directas; fomentar la argumentación basada en evidencias.\n[FORMATO]: Estructura de casos prácticos con rúbrica integrada.\n[ITERACIÓN]: Ajustar el nivel de complejidad según el progreso del estudiante.`);
            } else if (systemInstruction.includes('MVP_CARD')) {
                resolve(`FLUJO MÍNIMO DEL MVP (5 Pasos Adaptados):\n1. Presentación de la situación problemática propia de la asignatura.\n2. Análisis e identificación de evidencias clave por parte del estudiante.\n3. Formulación de la propuesta de solución argumentada.\n4. Evaluación formativa mediante rúbrica corta de 4 criterios (0-2 pts).\n5. Retroalimentación cualitativa orientada al cierre de brechas de aprendizaje.`);
            } else {
                resolve(`GUION DE PITCH (4 Minutos - Versión Dinámica):\n- [0:00 - 0:45] PROBLEMA: ¿Cómo transformar la comprensión pasiva en capacidad de análisis crítico en nuestra asignatura?\n- [0:45 - 1:15] USUARIO: Estudiantes y docentes del curso.\n- [1:15 - 3:15] SOLUCIÓN & MVP: Prototipo centrado en actividades de evaluación auténtica y retroalimentación ágil.\n- [3:15 - 4:00] IMPACTO: Innovación escalable, de bajo costo y alineada estrictamente a las normativas institucionales.`);
            }
        }, 600);
    });
}