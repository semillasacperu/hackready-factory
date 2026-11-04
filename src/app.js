import { AI_CONFIG } from './config/ai-config.js';
import { initModule1 } from './modules/module1-reto-map.js';
import { initModule2 } from './modules/module2-problem-card.js';
import { initModule3 } from './modules/module3-prompt-card.js';
import { initModule4 } from './modules/module4-mvp-card.js';
import { initModule5 } from './modules/module5-pitch-card.js';

// Estado global de la aplicación
const projectState = {
    course: '',
    syllabus: '',
    problemInput: '',
    selectedReto: '',
    retoJustification: '',
    problemStatement: null,
    auditResult: null,
    promptCard: '',
    mvpCard: '',
    pitchCard: ''
};

window.goToModule = function (modNumber) {
    for (let i = 1; i <= 5; i++) {
        const modEl = document.getElementById(`mod-${i}`);
        const btn = document.getElementById(`step-btn-${i}`);
        if (modEl) modEl.classList.add('hidden');
        if (btn) {
            btn.classList.remove('border-blue-600', 'bg-blue-950/40', 'step-active');
            btn.classList.add('opacity-60');
        }
    }

    const activeMod = document.getElementById(`mod-${modNumber}`);
    const activeBtn = document.getElementById(`step-btn-${modNumber}`);
    if (activeMod) activeMod.classList.remove('hidden');
    if (activeBtn) {
        activeBtn.classList.remove('opacity-60');
        activeBtn.classList.add('border-blue-600', 'bg-blue-950/40', 'step-active');
    }
};

function markModuleCompleted(modNumber) {
    const btn = document.getElementById(`step-btn-${modNumber}`);
    if (btn) {
        btn.classList.add('step-completed');
    }
    if (modNumber < 5) {
        const nextBtn = document.getElementById(`step-btn-${modNumber + 1}`);
        if (nextBtn) nextBtn.classList.remove('opacity-60');
    }
}

window.exportProject = function () {
    const markdownContent = `# PROYECTO DE INNOVACIÓN EDUCATIVA - HACKREADY
## Asignatura: ${projectState.course}
## Reto Oficial: ${projectState.selectedReto}

### 1. Reto Map & Justificación
${projectState.retoJustification}

### 2. Problem Statement
${projectState.problemStatement ? JSON.stringify(projectState.problemStatement, null, 2) : 'No definido'}

### 3. Prompt Card (Copiloto Pedagógico)
\`\`\`text
${projectState.promptCard}
\`\`\`

### 4. MVP Card (Prototipo)
${projectState.mvpCard}

### 5. Pitch Card (Guion 4 min)
${projectState.pitchCard}

---
*Generado con la Fábrica de Proyectos HackReady - Universidad Científica del Sur & Instituto SISE.*`;

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Proyecto_HackReady_${projectState.course.replace(/[^a-zA-Z0-9]/g, '_') || 'Innovacion'}.md`;
    a.click();
};

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar iconos de Lucide
    lucide.createIcons();

    // Configurar input de API Key si existe modal o input rápido
    const savedKey = AI_CONFIG.getApiKey();
    if (!savedKey) {
        const userKey = prompt("Ingrese su API Key de Google Gemini para habilitar la IA en el generador (o déjalo en blanco para modo simulación inteligente):");
        if (userKey) {
            AI_CONFIG.setApiKey(userKey);
        }
    }

    // Inicializar lógica de cada módulo
    initModule1(projectState, () => markModuleCompleted(1));
    initModule2(projectState, () => markModuleCompleted(2));
    initModule3(projectState, () => markModuleCompleted(3));
    initModule4(projectState, () => markModuleCompleted(4));
    initModule5(projectState, () => markModuleCompleted(5));
});