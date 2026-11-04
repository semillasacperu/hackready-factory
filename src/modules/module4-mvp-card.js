// Archivo: src/modules/module4-mvp-card.js
import { callGeminiAPI, SYSTEM_PROMPTS } from '../services/gemini-service.js';

export function initModule4(state, onComplete) {
    const btn = document.getElementById('m4-submit-btn');
    if (!btn) return;

    btn.onclick = async () => {
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader" class="animate-spin w-5 h-5"></i> Diseñando flujo y rúbrica...`;

        try {
            const userPrompt = `Curso: ${state.course}\nReto: ${state.selectedReto}\nProblema: ${JSON.stringify(state.problemStatement)}`;
            const responseText = await callGeminiAPI(SYSTEM_PROMPTS.MVP_CARD, userPrompt);

            state.mvpCard = responseText;
            const out = document.getElementById('m4-output');
            out.classList.remove('hidden');
            out.innerHTML = `
        <h3 class="font-bold text-blue-400 text-sm mb-2">Arquitectura del Prototipo MVP & Rúbrica Analítica:</h3>
        <div class="text-xs text-slate-300 whitespace-pre-wrap bg-slate-900 p-4 rounded-xl border border-slate-800">${responseText}</div>
      `;

            if (onComplete) onComplete();
        } catch (error) {
            console.error(error);
            alert('Error al diseñar el MVP.');
        } finally {
            btn.disabled = false;
            btn.innerHTML = `<i data-lucide="layout" class="w-5 h-5"></i> Diseñar Flujo MVP y Rúbrica Analítica`;
            lucide.createIcons();
        }
    };
}