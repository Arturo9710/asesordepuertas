import { DOORS_DATABASE, WIZARD_STEPS } from "../data/doors.js";

/**
 * Motor de Cálculo y Recomendación del Asesor de Puertas
 * Evalúa las respuestas del usuario y genera un match ponderado y explicable.
 */
export function calculateRecommendations(userAnswers) {
  const scores = DOORS_DATABASE.map(door => {
    let score = 40; // Base baseline
    const reasons = [];

    const locAnswer = userAnswers.step_location;
    const priorityAnswer = userAnswers.step_priority;
    const styleAnswer = userAnswers.step_style;
    const formatAnswer = userAnswers.step_format;
    const budgetAnswer = userAnswers.step_budget;

    // 1. Evaluación de Ubicación (Crucial)
    if (door.locationSuitable.includes(locAnswer)) {
      score += 35;
      reasons.push("Diseñada y certificada exactamente para este tipo de vano y ubicación.");
    } else if (
      (locAnswer.startsWith("exterior") && door.category === "exterior") ||
      (locAnswer.startsWith("interior") && door.category === "interior")
    ) {
      score += 15;
    } else {
      score -= 25; // Penalización por incompatibilidad física evidente (ej. interior en intemperie)
    }

    // 2. Evaluación de Prioridad Técnica
    if (priorityAnswer === "max_security") {
      if (door.securityLevel === 5) {
        score += 35;
        reasons.push("Nivel de blindaje Grado 5 con cilindro antibumping y cerradura de alta seguridad.");
      } else if (door.securityLevel >= 4) {
        score += 25;
        reasons.push("Cerradura multipunto de 5 bulones de acero y anclajes reforzados.");
      }
    } else if (priorityAnswer === "architectural_luxury") {
      if (door.openingType === "pivot" || door.id === "volker-monumental-pivot") {
        score += 35;
        reasons.push("Impacto estético escultural monumental con apertura pivotante de autor.");
      } else if (door.openingType === "enrasada") {
        score += 25;
        reasons.push("Purismo arquitectónico con marco invisible enrasado al plomo de pared.");
      }
    } else if (priorityAnswer === "acoustic_comfort") {
      const db = parseInt(door.acousticRating);
      if (db >= 45) {
        score += 35;
        reasons.push(`Insonorización acústica líder en su clase de ${door.acousticRating}.`);
      } else if (db >= 40) {
        score += 22;
        reasons.push(`Aislamiento acústico superior de ${door.acousticRating}.`);
      }
    } else if (priorityAnswer === "weather_low_maintenance") {
      if (door.id.includes("thermo") || door.id.includes("fluted")) {
        score += 35;
        reasons.push("Materiales químicamente inertes y termoaislantes resistentes al sol, lluvia y salitre.");
      }
    } else if (priorityAnswer === "best_value") {
      if (door.priceCategory === "mid") {
        score += 25;
        reasons.push("Extraordinaria relación entre costo de inversión y prestaciones arquitectónicas.");
      }
    }

    // 3. Evaluación de Estilo y Materialidad
    if (styleAnswer === "wood_walnut_oak" && (door.material.includes("Nogal") || door.material.includes("Roble"))) {
      score += 20;
      reasons.push("Acabado en madera noble con textura natural tratada.");
    } else if (styleAnswer === "dark_metal_anthracite" && (door.material.includes("Acero") || door.material.includes("Antracita"))) {
      score += 20;
      reasons.push("Estética en acero electrocincado texturizado color grafito / antracita.");
    } else if (styleAnswer === "fluted_glass_metal" && door.id === "lumina-fluted-glass") {
      score += 30;
      reasons.push("Cristal acanalado estriado con perfilería perimetral en negro mate anodizado.");
    } else if (styleAnswer === "flush_invisible" && door.openingType === "enrasada") {
      score += 25;
      reasons.push("Integración sin molduras de pared continua enrasada.");
    }

    // 4. Evaluación de Formato / Apertura
    if (formatAnswer === "pivot_monumental" && door.openingType.includes("pivot")) {
      score += 22;
      reasons.push("Compatible con bisagra pivotante de suelo y techo oculta.");
    } else if (formatAnswer === "hinge_standard" && door.openingType === "batiente") {
      score += 18;
      reasons.push("Apertura batiente de fácil accionamiento con bisagras reforzadas.");
    } else if (formatAnswer === "flush_frameless" && door.openingType === "enrasada") {
      score += 25;
      reasons.push("Posibilidad de fabricación a medida de suelo a techo sin dintel.");
    } else if (formatAnswer === "sliding_pocket" && door.openingType.includes("glass")) {
      score += 20;
    }

    // 5. Evaluación de Presupuesto
    if (budgetAnswer === "budget_luxury" && (door.priceCategory === "high" || door.priceCategory === "mid_high")) {
      score += 15;
    } else if (budgetAnswer === "budget_premium" && (door.priceCategory === "mid_high" || door.priceCategory === "mid")) {
      score += 15;
    } else if (budgetAnswer === "budget_standard" && door.priceCategory === "mid") {
      score += 15;
    }

    return {
      door,
      rawScore: score,
      reasons: reasons.slice(0, 3)
    };
  });

  // Ordenar de mayor a menor puntuación
  scores.sort((a, b) => b.rawScore - a.rawScore);

  // Normalizar porcentajes
  const maxRaw = scores[0].rawScore;
  const normalized = scores.map((item, idx) => {
    let matchPct;
    if (idx === 0) matchPct = 98;
    else {
      matchPct = Math.round(Math.min(94, Math.max(65, (item.rawScore / maxRaw) * 94)));
    }
    return {
      ...item,
      matchPercentage: matchPct
    };
  });

  const bestMatch = normalized[0];
  const alternatives = normalized.slice(1, 3);

  // Generar justificación ejecutiva personalizada
  const locTitle = getOptionTitle("step_location", userAnswers.step_location);
  const prioTitle = getOptionTitle("step_priority", userAnswers.step_priority);
  
  const rationale = `Basado en tu búsqueda para **${locTitle}** y tu prioridad en **${prioTitle}**, el modelo **${bestMatch.door.name}** es la solución técnica óptima. Cumple con la exigencia estructural necesaria, incorpora herrajes certificados y ofrece una durabilidad contrastada para garantizar máxima satisfacción y valor arquitectónico a tu proyecto.`;

  return {
    bestMatch,
    alternatives,
    rationale,
    allRanked: normalized
  };
}

function getOptionTitle(stepId, optionId) {
  const step = WIZARD_STEPS.find(s => s.id === stepId);
  if (!step) return optionId;
  const opt = step.options.find(o => o.id === optionId);
  return opt ? opt.title : optionId;
}
