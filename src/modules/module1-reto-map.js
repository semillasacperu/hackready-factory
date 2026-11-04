// Archivo: src/modules/module1-reto-map.js
import { callGeminiAPI, SYSTEM_PROMPTS } from '../services/gemini-service.js';

export function initModule1(state, onComplete) {
    const btn = document.getElementById('m1-submit-btn');
    if (!btn) return;

    btn.onclick = async () => {
        const course = document.getElementById('m1-course').value;
        const syllabus = document.getElementById('m1-syllabus').value;
        const problem = document.getElementById('m1-problem').value;

        if (!course || !problem) {
            alert('Por favor complete al menos la asignatura y la problemática observada.');
            return;
        }

        state.course = course;
        state.syllabus = syllabus;
        state.problemInput = problem;

        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader" class="animate-spin w-5 h-5"></i> Analizando dimensiones con IA...`;

        try {
            const userPrompt = `Asignatura: ${course}\nSílabo: ${syllabus}\nProblema: ${problem}`;
            const responseText = await callGeminiAPI(SYSTEM_PROMPTS.RETO_MAP, userPrompt);

            let result;
            try {
                const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
                result = JSON.parse(cleanJson);
            } catch (e) {
                result = {
                    retoSeleccionado: "Reto 2: Evaluación auténtica y logro de competencias",
                    justificationPedagogica: responseText
                };
            }

            state.selectedReto = result.retoSeleccionado;
            state.retoJustification = result.justificationPedagogica;

            document.getElementById('m1-selected-reto').innerText = state.selectedReto;
            document.getElementById('m1-justification').innerText = state.retoJustification;
            document.getElementById('m1-output').classList.remove('hidden');

            lucide.createIcons();
            if (onComplete) onComplete();
        } catch (error) {
            console.error(error);
            alert('Error al conectar con la IA. Verifique su API Key.');
        } finally {
            btn.disabled = false;
            btn.innerHTML = `<i data-lucide="cpu" class="w-5 h-5"></i> Analizar con IA y Clasificar en Reto Oficial`;
            lucide.createIcons();
        }
    };
}