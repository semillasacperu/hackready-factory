// Archivo: src/modules/module5-pitch-card.js
import { callGeminiAPI, SYSTEM_PROMPTS } from '../services/gemini-service.js';

export function initModule5(state, onComplete) {
    const btn = document.getElementById('m5-submit-btn');
    if (!btn) return;

    btn.onclick = async () => {
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader" class="animate-spin w-5 h-5"></i> Ensamblando guion de pitch...`;

        try {
            const userPrompt = `Proyecto completo:\nCurso: ${state.course}\nReto: ${state.selectedReto}\nProblema: ${JSON.stringify(state.problemStatement)}\nMVP: ${state.mvpCard}`;
            const responseText = await callGeminiAPI(SYSTEM_PROMPTS.PITCH_CARD, userPrompt);

            state.pitchCard = responseText;
            const out = document.getElementById('m5-output');
            out.classList.remove('hidden');
            out.innerHTML = `
        <h3 class="font-bold text-emerald-400 text-sm mb-2">Guion de Pitch (4 Minutos) & Matriz de Alineación:</h3>
        <div class="text-xs text-slate-300 whitespace-pre-wrap bg-slate-900 p-4 rounded-xl border border-slate-800">${responseText}</div>
      `;

            document.getElementById('btn-export').classList.remove('hidden');
            if (onComplete) onComplete();
        } catch (error) {
            console.error(error);
            alert('Error al generar el pitch.');
        } finally {
            btn.disabled = false;
            btn.innerHTML = `<i data-lucide="presentation" class="w-5 h-5"></i> Ensamblar Guion de Pitch (4 min)`;
            lucide.createIcons();
        }
    };
}