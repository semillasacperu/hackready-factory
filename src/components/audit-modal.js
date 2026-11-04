// Archivo: src/components/audit-modal.js
export class AuditModal {
    constructor() {
        this.modalElement = null;
        this.createModalDOM();
    }

    createModalDOM() {
        if (document.getElementById('hackready-audit-modal')) return;

        const modalHTML = `
      <div id="hackready-audit-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm hidden">
        <div class="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
          <div class="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 id="audit-modal-title" class="text-lg font-bold text-amber-400 flex items-center gap-2">
              <i data-lucide="shield-alert"></i> Auditoría Pedagógica IA
            </h3>
            <button id="audit-modal-close" class="text-slate-400 hover:text-white transition">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>
          <div id="audit-modal-body" class="py-4 text-sm text-slate-300 space-y-3">
            <!-- Contenido dinámico -->
          </div>
          <div class="pt-4 border-t border-slate-800 flex justify-end">
            <button id="audit-modal-btn-ok" class="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2 rounded-lg transition">
              Entendido y Corregido
            </button>
          </div>
        </div>
      </div>
    `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        this.modalElement = document.getElementById('hackready-audit-modal');
        document.getElementById('audit-modal-close').onclick = () => this.close();
        document.getElementById('audit-modal-btn-ok').onclick = () => this.close();
    }

    open(title, message, isError = false) {
        if (!this.modalElement) this.createModalDOM();

        const titleEl = document.getElementById('audit-modal-title');
        const bodyEl = document.getElementById('audit-modal-body');

        titleEl.innerHTML = `<i data-lucide="${isError ? 'alert-octagon' : 'check-circle-2'}"></i> ${title}`;
        titleEl.className = `text-lg font-bold flex items-center gap-2 ${isError ? 'text-rose-400' : 'text-emerald-400'}`;

        bodyEl.innerHTML = `<p>${message}</p>`;
        this.modalElement.classList.remove('hidden');

        if (window.lucide) window.lucide.createIcons();
    }

    close() {
        if (this.modalElement) {
            this.modalElement.classList.add('hidden');
        }
    }
}