export function renderPitchCard(data) {
    const container = document.getElementById('module5-results');
    if (!container) return;
    container.innerHTML = `
    <div class="space-y-3 bg-slate-900/80 p-4 rounded-xl border border-blue-500/30 text-slate-200">
      <h3 class="text-blue-400 font-bold mb-2">Guion del Pitch de 4 Minutos:</h3>
      <p><strong>[0:00 - 0:45] PROBLEMA:</strong> ${data.problema}</p>
      <p><strong>[0:45 - 1:15] USUARIO:</strong> ${data.usuario}</p>
      <p><strong>[1:15 - 3:15] SOLUCIÓN & MVP:</strong> ${data.solucion} (${data.mvp})</p>
      <p><strong>[3:15 - 4:00] IMPACTO:</strong> ${data.impacto}</p>
    </div>
  `;
}