// Archivo: src/config/ai-config.js
export const AI_CONFIG = {
    DEFAULT_MODEL: 'gemini-1.5-flash',

    getApiKey: () => {
        // 1. Prioridad: Variable de entorno de Vite (.env)
        if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
            return import.meta.env.VITE_GEMINI_API_KEY;
        }
        // 2. Respaldo: Almacenamiento local del navegador
        return localStorage.getItem('GEMINI_API_KEY') || '';
    },

    setApiKey: (key) => {
        if (key) {
            localStorage.setItem('GEMINI_API_KEY', key);
        } else {
            localStorage.removeItem('GEMINI_API_KEY');
        }
    }
};