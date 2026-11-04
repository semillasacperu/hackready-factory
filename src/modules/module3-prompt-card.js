// Archivo: src/modules/module3-prompt-card.js
import { callGeminiAPI, SYSTEM_PROMPTS } from '../services/gemini-service.js';

export function initModule3(state, onComplete) {
    const btn = document.getElementById('m3-submit-btn');
    if (!btn) return;

    btn.onclick = async () => {
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader" class="animate-spin w-5 h-5"></i> Construyendo prompt estructurado...`;

        try {
            const userPrompt = `Curso: ${state.course}\nReto: ${state.selectedReto}\nProblema: ${JSON.stringify(state.problemStatement)}`;
            const responseText = await callGeminiAPI(SYSTEM_PROMPTS.PROMPT_CARD, userPrompt);

            state.promptCard = responseText;
            const out = document.getElementById('m3-output');
            out.classList.remove('hidden');
            out.innerHTML = `
        <h3 class="font-bold text-blue-400 text-sm mb-2">Prompt Copiloto Generado (Fórmula de 7 Pasos):</h3>
        <pre class="bg-slate-900 p-4 rounded-xl text-xs text-slate-300 whitespace-pre-wrap">${responseText}</pre>
      `;

            if (onComplete) onComplete();
        } catch (error) {
            console.error(error);
            alert('Error al generar el prompt.');
        } finally {
            btn.disabled = false;
            btn.innerHTML = `<i data-lucide="terminal" class="w-5 h-5"></i> Generar Prompt Estratégico HackReady`;
            lucide.createIcons();
        }
    };
}