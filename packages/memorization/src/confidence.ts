import type { ConfidenceLevel } from "@mahfuz/shared/types";

/**
 * Derive confidence level from SM-2 metrics.
 *
 * Binary model: passed last review → "mastered" (Ezber),
 * failed → "learning" (Öğreniyor) or "struggling" (Zor).
 * SM-2 still controls review scheduling via intervals.
 */
export function deriveConfidence(
  repetition: number,
  easeFactor: number,
  _interval: number,
): ConfidenceLevel {
  if (repetition === 0 && easeFactor < 1.8) return "struggling";
  if (repetition === 0) return "learning";
  return "mastered";
}
