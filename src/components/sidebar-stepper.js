// Archivo: src/components/sidebar-stepper.js
export class SidebarStepper {
    constructor(totalModules = 5) {
        this.totalModules = totalModules;
        this.currentActive = 1;
    }

    setActive(modNumber) {
        this.currentActive = modNumber;
        for (let i = 1; i <= this.totalModules; i++) {
            const modEl = document.getElementById(`mod-${i}`);
            const btn = document.getElementById(`step-btn-${i}`);

            if (modEl) {
                if (i === modNumber) {
                    modEl.classList.remove('hidden');
                } else {
                    modEl.classList.add('hidden');
                }
            }

            if (btn) {
                if (i === modNumber) {
                    btn.classList.add('border-blue-600', 'bg-blue-950/40', 'step-active');
                    btn.classList.remove('opacity-60');
                } else {
                    btn.classList.remove('border-blue-600', 'bg-blue-950/40', 'step-active');
                    if (i > this.currentActive + 1 && !btn.classList.contains('step-completed')) {
                        btn.classList.add('opacity-60');
                    }
                }
            }
        }
    }

    markCompleted(modNumber) {
        const btn = document.getElementById(`step-btn-${modNumber}`);
        if (btn) {
            btn.classList.add('step-completed');
            btn.classList.remove('opacity-60');
        }
        if (modNumber < this.totalModules) {
            const nextBtn = document.getElementById(`step-btn-${modNumber + 1}`);
            if (nextBtn) {
                nextBtn.classList.remove('opacity-60');
            }
        }
    }
}