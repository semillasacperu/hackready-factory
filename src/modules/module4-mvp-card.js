export function renderMVPCard(data) {
    const container = document.getElementById('module4-results');
    if (!container) return;
    container.innerHTML = `
    <div class="space-y-3 bg-slate-900/80 p-4 rounded-xl border border-blue-500/30 text-slate-200">
      <h3 class="text-blue-400 font-bold mb-2">Flujo del MVP Demostrable (5 Pasos):</h3>
      <p><strong>Usuario:</strong> ${data.usuario}</p>
      <p><strong>Acción Principal:</strong> ${data.accionPrincipal}</p>
      <p><strong>Respuesta del Sistema:</strong> ${data.respuestaSistema}</p>
      <p><strong>Evidencia de Valor:</strong> ${data.evidenciaValor}</p>
      <div class="mt-3 pt-3 border-t border-slate-700">
        <strong>Pasos del Prototipo:</strong>
        <ul class="list-disc pl-5 mt-1 space-y-1">
          ${data.flujoPasos.map(paso => `<li>${paso}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}