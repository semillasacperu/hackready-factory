// Archivo: src/components/navbar.js
import { AI_CONFIG } from '../config/ai-config.js';

export function initNavbar() {
    const exportBtn = document.getElementById('btn-export');

    // Opcional: Agregar botón de configuración de API Key si se desea interactivo en el header
    const headerContainer = document.querySelector('header > div:last-child');
    if (headerContainer && !document.getElementById('btn-settings')) {
        const settingsBtn = document.createElement('button');
        settingsBtn.id = 'btn-settings';
        settingsBtn.className = 'bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 transition border border-slate-700';
        settingsBtn.innerHTML = `<i data-lucide="key" class="w-3.5 h-3.5"></i> Configurar API Key`;
        settingsBtn.onclick = () => {
            const currentKey = AI_CONFIG.getApiKey();
            const newKey = prompt("Ingrese su API Key de Google Gemini:", currentKey);
            if (newKey !== null) {
                AI_CONFIG.setApiKey(newKey);
                alert(newKey ? "API Key guardada correctamente." : "API Key eliminada (modo simulación).");
            }
        };
        headerContainer.insertBefore(settingsBtn, exportBtn);
    }

    if (window.lucide) window.lucide.createIcons();
}