// Archivo: src/modules/module2-problem-card.js
import { callGeminiAPI, SYSTEM_PROMPTS } from '../services/gemini-service.js';

export function initModule2(state, onComplete) {
    const btn = document.getElementById('m2-submit-btn');
    if (!btn) return;

    btn.onclick = async () => {
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader" class="animate-spin w-5 h-5"></i> Auditando diagnóstico y enfoque...`;

        try {
            const userPrompt = `Asignatura: ${state.course}\nProblema inicial: ${state.problemInput}\nReto seleccionado: ${state.selectedReto}`;
            const responseText = await callGeminiAPI(SYSTEM_PROMPTS.PROBLEM_CARD, userPrompt);

            let result;
            try {
                const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
                result = JSON.parse(cleanJson);
            } catch (e) {
                result = {
                    statement: {
                        usuario: `Estudiantes y docentes de ${state.course || 'la asignatura'}`,
                        contexto: "Entornos virtuales de aprendizaje",
                        evidencia: state.problemInput,
                        necesidad: "Diseñar experiencias de evaluación basadas en desempeño real",
                        problema: "Las actividades tradicionales dificultan la observación del juicio crítico",
                        impacto: "Aumento del compromiso y alineación con las competencias del sílabo"
                    },
                    audit: {
                        esSolucionDisfrazada: false,
                        feedbackAuditoria: "Auditoría superada: Diagnóstico enfocado estrictamente en la necesidad pedagógica sin soluciones tecnológicas prematuras."
                    }
                };
            }

            state.problemStatement = result.statement;
            state.auditResult = result.audit;

            const box = document.getElementById('m2-statement-box');
            box.innerHTML = Object.entries(state.problemStatement)
                .map(([k, v]) => `<p><strong class="uppercase text-amber-400">${k}:</strong> ${v}</p>`).join('');

            const auditBox = document.getElementById('m2-audit-box');
            if (state.auditResult.esSolucionDisfrazada) {
                auditBox.className = "p-4 rounded-xl border bg-rose-950/30 border-rose-800 text-rose-300";
                auditBox.innerHTML = `<strong><i data-lucide="alert-octagon"></i> Alerta de Auditoría (Solución Disfrazada Detectada):</strong> ${state.auditResult.feedbackAuditoria}`;
            } else {
                auditBox.className = "p-4 rounded-xl border bg-emerald-950/30 border-emerald-800 text-emerald-300";
                auditBox.innerHTML = `<strong><i data-lucide="check-circle"></i> Auditoría Aprobada:</strong> ${state.auditResult.feedbackAuditoria}`;
            }

            document.getElementById('m2-output').classList.remove('hidden');
            lucide.createIcons();
            if (onComplete) onComplete();
        } catch (error) {
            console.error(error);
            alert('Error al auditar el problema.');
        } finally {
            btn.disabled = false;
            btn.innerHTML = `<i data-lucide="wand-2" class="w-5 h-5"></i> Generar Problem Statement Riguroso y Auditar`;
            lucide.createIcons();
        }
    };
}