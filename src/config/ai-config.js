// Configuración centralizada para la API de IA (Gemini)
export const AI_CONFIG = {
    // Puedes cambiar o inyectar tu API Key de Gemini aquí o vía variable de entorno
    API_KEY: localStorage.getItem('HACKREADY_GEMINI_KEY') || '',
    DEFAULT_MODEL: 'gemini-1.5-flash',

    setApiKey(key) {
        if (key && key.trim() !== '') {
            localStorage.setItem('HACKREADY_GEMINI_KEY', key.trim());
            return true;
        }
        return false;
    },

    getApiKey() {
        return localStorage.getItem('HACKREADY_GEMINI_KEY') || '';
    }
};