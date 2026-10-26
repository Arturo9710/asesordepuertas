import { DOORS_DATABASE, WIZARD_STEPS, ACCESSORIES_CONFIG } from "../data/doors.js";
import { calculateRecommendations } from "./advisor.js";

// Estado de la Aplicación
const state = {
  currentStepIndex: 0,
  userAnswers: {
    step_location: null,
    step_priority: null,
    step_style: null,
    step_format: null,
    step_budget: null
  },
  currentResult: null,
  activeAccessories: {
    handle: "handle_vertical_brass",
    lock: "lock_smart_biometric",
    installation: "inst_turnkey"
  },
  currentCatalogFilter: "all"
};

// Elementos DOM
const dom = {
  wizardView: document.getElementById("wizardView"),
  resultsView: document.getElementById("resultsView"),
  catalogView: document.getElementById("catalogView"),
  
  // Controles de Progreso
  stepBadge: document.getElementById("stepBadge"),
  stepPhaseTitle: document.getElementById("stepPhaseTitle"),
  progressBarFill: document.getElementById("progressBarFill"),
  
  // Contenido del Paso
  stepHeadline: document.getElementById("stepHeadline"),
  stepDescription: document.getElementById("stepDescription"),
  optionsGrid: document.getElementById("optionsGrid"),
  
  // Botones de Navegación del Wizard
  btnPrevStep: document.getElementById("btnPrevStep"),
  btnNextStep: document.getElementById("btnNextStep"),
  
  // Elementos de Resultados
  resultDoorImage: document.getElementById("resultDoorImage"),
  resultMatchPercentage: document.getElementById("resultMatchPercentage"),
  resultTaglinePill: document.getElementById("resultTaglinePill"),
  resultDoorName: document.getElementById("resultDoorName"),
  resultDoorDesc: document.getElementById("resultDoorDesc"),
  resultBadges: document.getElementById("resultBadges"),
  resultRationaleText: document.getElementById("resultRationaleText"),
  resultPriceFigure: document.getElementById("resultPriceFigure"),
  btnWhatsappAction: document.getElementById("btnWhatsappAction"),
  btnPrintAction: document.getElementById("btnPrintAction"),
  specsGrid: document.getElementById("specsGrid"),
  alternativesGrid: document.getElementById("alternativesGrid"),
  
  // Configurador de Accesorios dentro de Resultados
  accessoriesContainer: document.getElementById("accessoriesContainer"),
  
  // Elementos de Catálogo
  catalogGrid: document.getElementById("catalogGrid"),
  filterPills: document.querySelectorAll(".filter-pill"),
  
  // Enlaces de Navegación Principal & Tema
  navBtnAdvisor: document.getElementById("navBtnAdvisor"),
  navBtnCatalog: document.getElementById("navBtnCatalog"),
  navBtnGuide: document.getElementById("navBtnGuide"),
  btnRestartAdvisor: document.getElementById("btnRestartAdvisor"),
  themeToggleBtn: document.getElementById("themeToggleBtn"),
  themeIcon: document.getElementById("themeIcon"),
  themeLabel: document.getElementById("themeLabel")
};

// Inicialización de la Aplicación
function init() {
  initTheme();
  setupEventListeners();
  renderCurrentStep();
  renderCatalog();
}

// Inicialización y Manejo del Tema Blanco / Negro
function initTheme() {
  const savedTheme = localStorage.getItem("portalis_theme") || "dark";
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("portalis_theme", theme);

  if (dom.themeLabel && dom.themeIcon) {
    if (theme === "light") {
      dom.themeLabel.textContent = "Modo Oscuro";
      dom.themeIcon.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    } else {
      dom.themeLabel.textContent = "Modo Claro";
      dom.themeIcon.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    }
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
}

// Configuración de Event Listeners
function setupEventListeners() {
  // Conmutador de Tema
  if (dom.themeToggleBtn) {
    dom.themeToggleBtn.addEventListener("click", toggleTheme);
  }

  // Wizard Navigation
  dom.btnPrevStep.addEventListener("click", () => {
    if (state.currentStepIndex > 0) {
      state.currentStepIndex--;
      renderCurrentStep();
    }
  });

  dom.btnNextStep.addEventListener("click", () => {
    const currentStep = WIZARD_STEPS[state.currentStepIndex];
    if (!state.userAnswers[currentStep.id]) {
      alert("Por favor selecciona una opción para continuar.");
      return;
    }

    if (state.currentStepIndex < WIZARD_STEPS.length - 1) {
      state.currentStepIndex++;
      renderCurrentStep();
    } else {
      finishAdvisor();
    }
  });

  // Navegación Superior
  dom.navBtnAdvisor.addEventListener("click", () => {
    switchView("wizard");
  });

  dom.navBtnCatalog.addEventListener("click", () => {
    switchView("catalog");
  });

  if (dom.navBtnGuide) {
    dom.navBtnGuide.addEventListener("click", () => {
      document.getElementById("measurementGuideSection")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (dom.btnRestartAdvisor) {
    dom.btnRestartAdvisor.addEventListener("click", () => {
      resetAdvisor();
    });
  }

  // Botón de Impresión
  dom.btnPrintAction.addEventListener("click", () => {
    window.print();
  });

  // Filtros de Catálogo
  dom.filterPills.forEach(pill => {
    pill.addEventListener("click", (e) => {
      dom.filterPills.forEach(p => p.classList.remove("active"));
      e.target.classList.add("active");
      const filter = e.target.getAttribute("data-filter");
      state.currentCatalogFilter = filter;
      renderCatalog(filter);
    });
  });

  // FAQ Acordeón
  document.querySelectorAll(".faq-item").forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    questionBtn?.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });
}

// Cambiar Vistas
function switchView(viewName) {
  dom.wizardView.style.display = "none";
  dom.resultsView.style.display = "none";
  dom.catalogView.style.display = "none";

  dom.navBtnAdvisor.classList.remove("active");
  dom.navBtnCatalog.classList.remove("active");

  if (viewName === "wizard") {
    dom.wizardView.style.display = "block";
    dom.navBtnAdvisor.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (viewName === "results") {
    dom.resultsView.style.display = "block";
    dom.navBtnAdvisor.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (viewName === "catalog") {
    dom.catalogView.style.display = "block";
    dom.navBtnCatalog.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// Renderizar Paso Actual del Wizard
function renderCurrentStep() {
  const step = WIZARD_STEPS[state.currentStepIndex];
  const totalSteps = WIZARD_STEPS.length;
  const progressPercent = ((state.currentStepIndex + 1) / totalSteps) * 100;

  // Actualizar indicadores
  dom.stepBadge.textContent = `Paso ${step.stepNumber} de ${totalSteps}`;
  dom.stepPhaseTitle.textContent = step.title;
  dom.progressBarFill.style.width = `${progressPercent}%`;

  dom.stepHeadline.textContent = step.title;
  dom.stepDescription.textContent = step.subtitle;

  // Actualizar estado de botón Atrás
  dom.btnPrevStep.disabled = state.currentStepIndex === 0;

  // Texto del botón siguiente
  if (state.currentStepIndex === totalSteps - 1) {
    dom.btnNextStep.innerHTML = `Ver Recomendación <i class="fa-solid fa-sparkles"></i>`;
  } else {
    dom.btnNextStep.innerHTML = `Continuar <i class="fa-solid fa-arrow-right"></i>`;
  }

  // Renderizar Tarjetas de Opción
  dom.optionsGrid.innerHTML = "";
  const currentSelection = state.userAnswers[step.id];

  step.options.forEach(opt => {
    const isSelected = currentSelection === opt.id;
    const card = document.createElement("div");
    card.className = `option-card ${isSelected ? "selected" : ""}`;
    card.innerHTML = `
      <div class="option-card-header">
        <div class="option-icon-wrapper">
          <i class="fa-solid ${opt.icon}"></i>
        </div>
        <div class="option-check-circle">
          <i class="fa-solid fa-check"></i>
        </div>
      </div>
      <h3 class="option-title">${opt.title}</h3>
      <p class="option-desc">${opt.desc}</p>
    `;

    card.addEventListener("click", () => {
      state.userAnswers[step.id] = opt.id;
      dom.optionsGrid.querySelectorAll(".option-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");

      // Auto avance sutil después de 260ms (físicas Emil Kowalski)
      setTimeout(() => {
        if (state.currentStepIndex < WIZARD_STEPS.length - 1) {
          state.currentStepIndex++;
          renderCurrentStep();
        } else {
          finishAdvisor();
        }
      }, 260);
    });

    dom.optionsGrid.appendChild(card);
  });
}

// Finalizar el Asesor y Calcular la Recomendación
function finishAdvisor() {
  const result = calculateRecommendations(state.userAnswers);
  state.currentResult = result;
  renderResults(result.bestMatch, result.alternatives, result.rationale);
  switchView("results");
}

// Renderizar Vista de Resultados
function renderResults(bestMatch, alternatives, rationale) {
  const door = bestMatch.door;

  // Portada y Afinidad
  dom.resultDoorImage.src = door.image;
  dom.resultDoorImage.alt = door.name;
  dom.resultMatchPercentage.innerHTML = `<i class="fa-solid fa-check-circle"></i> Afinidad: ${bestMatch.matchPercentage}%`;
  
  dom.resultTaglinePill.textContent = `${door.category.toUpperCase()} · ${door.style}`;
  dom.resultDoorName.textContent = door.name;
  dom.resultDoorDesc.textContent = door.tagline;

  // Badges Técnicos
  dom.resultBadges.innerHTML = "";
  door.badges.forEach(b => {
    const span = document.createElement("span");
    span.className = "tech-badge";
    span.innerHTML = `<i class="fa-solid fa-certificate"></i> ${b}`;
    dom.resultBadges.appendChild(span);
  });

  // Justificación Técnica Inteligente
  dom.resultRationaleText.innerHTML = rationale;

  // Especificaciones Técnicas Detalladas
  dom.specsGrid.innerHTML = `
    <div class="spec-item">
      <div class="spec-label"><i class="fa-solid fa-layer-group"></i> Estructura & Alma</div>
      <div class="spec-value">${door.specs.estructura}</div>
    </div>
    <div class="spec-item">
      <div class="spec-label"><i class="fa-solid fa-sliders"></i> Sistema de Apertura</div>
      <div class="spec-value">${door.specs.herrajes}</div>
    </div>
    <div class="spec-item">
      <div class="spec-label"><i class="fa-solid fa-shield-halved"></i> Seguridad & Anclaje</div>
      <div class="spec-value">${door.specs.cerradura}</div>
    </div>
    <div class="spec-item">
      <div class="spec-label"><i class="fa-solid fa-clock-rotate-left"></i> Aislamiento & Garantía</div>
      <div class="spec-value">Acústico: <strong>${door.acousticRating}</strong> · Térmico: <strong>${door.thermalRating}</strong><br>${door.specs.garantia}</div>
    </div>
  `;

  // Renderizar Configurador de Herrajes & Accesorios
  renderAccessoriesConfigurator(door);

  // Renderizar Alternativas Viables
  renderAlternatives(alternatives);

  // Actualizar Precio y Enlace de WhatsApp
  updateQuoteSummary(door);
}

// Renderizar Selector de Accesorios
function renderAccessoriesConfigurator(door) {
  if (!dom.accessoriesContainer) return;

  const relevantHandles = ACCESSORIES_CONFIG.handles.filter(h => 
    door.category === "exterior" ? h.type === "exterior" : h.type === "interior"
  );
  const relevantLocks = ACCESSORIES_CONFIG.locks.filter(l => 
    door.category === "exterior" ? l.type === "exterior" : l.type === "interior"
  );

  if (!relevantHandles.some(h => h.id === state.activeAccessories.handle)) {
    state.activeAccessories.handle = relevantHandles[0]?.id || "";
  }
  if (!relevantLocks.some(l => l.id === state.activeAccessories.lock)) {
    state.activeAccessories.lock = relevantLocks[0]?.id || "";
  }

  dom.accessoriesContainer.innerHTML = `
    <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 1.5rem;">
      <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--gold-primary); margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.08em; display: flex; align-items: center; gap: 0.5rem;">
        <i class="fa-solid fa-sliders"></i> Personalizar Equipamiento & Herrajes
      </h4>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
        <div>
          <label style="display: block; font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.35rem; font-weight: 600;">TIRADOR / MANILLA</label>
          <select id="selectHandle" style="width: 100%; padding: 0.65rem; background: var(--bg-surface); border: 1px solid var(--border-medium); border-radius: var(--radius-sm); color: var(--text-primary); font-size: 0.85rem;">
            ${relevantHandles.map(h => `
              <option value="${h.id}" ${state.activeAccessories.handle === h.id ? "selected" : ""}>
                ${h.name} (+${formatCurrency(h.price)})
              </option>
            `).join("")}
          </select>
        </div>

        <div>
          <label style="display: block; font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.35rem; font-weight: 600;">SISTEMA DE CIERRE / CERRADURA</label>
          <select id="selectLock" style="width: 100%; padding: 0.65rem; background: var(--bg-surface); border: 1px solid var(--border-medium); border-radius: var(--radius-sm); color: var(--text-primary); font-size: 0.85rem;">
            ${relevantLocks.map(l => `
              <option value="${l.id}" ${state.activeAccessories.lock === l.id ? "selected" : ""}>
                ${l.name} (+${formatCurrency(l.price)})
              </option>
            `).join("")}
          </select>
        </div>

        <div>
          <label style="display: block; font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.35rem; font-weight: 600;">SERVICIO DE INSTALACIÓN</label>
          <select id="selectInstallation" style="width: 100%; padding: 0.65rem; background: var(--bg-surface); border: 1px solid var(--border-medium); border-radius: var(--radius-sm); color: var(--text-primary); font-size: 0.85rem;">
            ${ACCESSORIES_CONFIG.installation.map(i => `
              <option value="${i.id}" ${state.activeAccessories.installation === i.id ? "selected" : ""}>
                ${i.name} (+${formatCurrency(i.price)})
              </option>
            `).join("")}
          </select>
        </div>
      </div>
    </div>
  `;

  // Listeners de actualización de accesorios
  document.getElementById("selectHandle")?.addEventListener("change", (e) => {
    state.activeAccessories.handle = e.target.value;
    updateQuoteSummary(door);
  });
  document.getElementById("selectLock")?.addEventListener("change", (e) => {
    state.activeAccessories.lock = e.target.value;
    updateQuoteSummary(door);
  });
  document.getElementById("selectInstallation")?.addEventListener("change", (e) => {
    state.activeAccessories.installation = e.target.value;
    updateQuoteSummary(door);
  });
}

// Calcular y actualizar precio total + enlace de WhatsApp
function updateQuoteSummary(door) {
  let total = door.basePriceMXN;

  const handle = ACCESSORIES_CONFIG.handles.find(h => h.id === state.activeAccessories.handle);
  const lock = ACCESSORIES_CONFIG.locks.find(l => l.id === state.activeAccessories.lock);
  const inst = ACCESSORIES_CONFIG.installation.find(i => i.id === state.activeAccessories.installation);

  if (handle) total += handle.price;
  if (lock) total += lock.price;
  if (inst) total += inst.price;

  dom.resultPriceFigure.textContent = formatCurrency(total);

  // Generar mensaje para WhatsApp
  const locTitle = getOptionText("step_location", state.userAnswers.step_location);
  const prioTitle = getOptionText("step_priority", state.userAnswers.step_priority);

  const messageText = `Hola Asesor de Puertas Portalis, he completado el asesor guiado en línea:
• *Modelo Recomendado*: ${door.name}
• *Ubicación*: ${locTitle}
• *Prioridad Principal*: ${prioTitle}
• *Apertura*: ${door.openingLabel}
• *Equipamiento Elegido*:
  - Tirador: ${handle?.name || "Estándar"}
  - Cerradura: ${lock?.name || "Estándar"}
  - Instalación: ${inst?.name || "Estándar"}
• *Cotización Estimada*: ${formatCurrency(total)} MXN

¿Podrían confirmarme disponibilidad y coordinar detalles para mi proyecto?`;

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(messageText)}`;
  dom.btnWhatsappAction.href = waUrl;
}

// Renderizar Alternativas
function renderAlternatives(alternatives) {
  dom.alternativesGrid.innerHTML = "";

  alternatives.forEach(alt => {
    const d = alt.door;
    const card = document.createElement("div");
    card.className = "alt-card";
    card.innerHTML = `
      <div class="alt-thumb">
        <img src="${d.image}" alt="${d.name}">
        <div class="alt-match-tag">Match ${alt.matchPercentage}%</div>
      </div>
      <div class="alt-body">
        <div>
          <h4 class="alt-title">${d.name}</h4>
          <div class="alt-price">Desde ${formatCurrency(d.basePriceMXN)} MXN</div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.4;">${d.tagline}</p>
        </div>
        <button class="btn-sm-switch" data-door-id="${d.id}">
          <i class="fa-solid fa-eye"></i> Ver Esta Opción
        </button>
      </div>
    `;

    card.querySelector(".btn-sm-switch").addEventListener("click", () => {
      renderResults(alt, [state.currentResult.bestMatch], `Has seleccionado la alternativa **${d.name}**. Aquí tienes sus especificaciones y cotización.`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    dom.alternativesGrid.appendChild(card);
  });
}

// Renderizar Catálogo General
function renderCatalog(filter = "all") {
  dom.catalogGrid.innerHTML = "";

  const filtered = DOORS_DATABASE.filter(d => {
    if (filter === "all") return true;
    if (filter === "exterior") return d.category === "exterior";
    if (filter === "interior") return d.category === "interior";
    if (filter === "security") return d.securityLevel >= 4;
    if (filter === "pivot") return d.openingType.includes("pivot");
    return true;
  });

  filtered.forEach(d => {
    const item = document.createElement("div");
    item.className = "alt-card";
    item.innerHTML = `
      <div class="alt-thumb" style="height: 240px;">
        <img src="${d.image}" alt="${d.name}">
        <div class="alt-match-tag" style="background: var(--bg-surface);">${d.category.toUpperCase()}</div>
      </div>
      <div class="alt-body">
        <div>
          <h4 class="alt-title" style="font-size: 1.25rem;">${d.name}</h4>
          <div class="alt-price" style="font-size: 1.05rem; margin-bottom: 0.6rem;">Desde ${formatCurrency(d.basePriceMXN)} MXN</div>
          <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1rem;">${d.tagline}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.2rem;">
            ${d.badges.slice(0, 2).map(b => `<span class="tech-badge" style="font-size: 0.72rem;"><i class="fa-solid fa-check"></i> ${b}</span>`).join("")}
          </div>
        </div>
        <button class="btn-primary" style="padding: 0.65rem 1.2rem; font-size: 0.85rem; width: 100%; justify-content: center;" data-inspect-id="${d.id}">
          <i class="fa-solid fa-sliders"></i> Configurar Modelo
        </button>
      </div>
    `;

    item.querySelector("[data-inspect-id]").addEventListener("click", () => {
      renderResults({ door: d, matchPercentage: 99 }, [], `Configuración directa del modelo **${d.name}**.`);
      switchView("results");
    });

    dom.catalogGrid.appendChild(item);
  });
}

// Reiniciar Asesor
function resetAdvisor() {
  state.currentStepIndex = 0;
  state.userAnswers = {
    step_location: null,
    step_priority: null,
    step_style: null,
    step_format: null,
    step_budget: null
  };
  renderCurrentStep();
  switchView("wizard");
}

// Helpers
function formatCurrency(val) {
  return "$" + val.toLocaleString("es-MX");
}

function getOptionText(stepId, optionId) {
  const step = WIZARD_STEPS.find(s => s.id === stepId);
  if (!step) return optionId || "No especificado";
  const opt = step.options.find(o => o.id === optionId);
  return opt ? opt.title : optionId || "No especificado";
}

// Arrancar la app al cargar DOM
document.addEventListener("DOMContentLoaded", init);
