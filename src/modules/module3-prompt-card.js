export function renderPromptCard(data) {
    const container = document.getElementById('module3-results'); // O el contenedor de tu UI
    if (!container) return;
    container.innerHTML = `
    <div class="space-y-3 bg-slate-900/80 p-4 rounded-xl border border-blue-500/30 text-slate-200">
      <h3 class="text-blue-400 font-bold mb-2">Prompt Copiloto Generado para el Docente:</h3>
      <p><strong>CONTEXTO:</strong> ${data.contexto}</p>
      <p><strong>ROL:</strong> ${data.rol}</p>
      <p><strong>OBJETIVO:</strong> ${data.objetivo}</p>
      <p><strong>INFORMACIÓN:</strong> ${data.informacion}</p>
      <p><strong>RESTRICCIONES:</strong> ${data.restricciones}</p>
      <p><strong>FORMATO:</strong> ${data.formato}</p>
      <p><strong>ITERACIÓN:</strong> ${data.iteracion}</p>
    </div>
  `;
}