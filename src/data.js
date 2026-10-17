export const evaluationRuns = [
  { model: "GPT-4o",      dimension: "Reasoning", score: 0.91, n: 120 },
  { model: "GPT-4o",      dimension: "Safety",    score: 0.95, n: 120 },
  { model: "GPT-4o",      dimension: "Code",      score: 0.88, n: 120 },
  { model: "Claude 3.5",  dimension: "Reasoning", score: 0.90, n: 115 },
  { model: "Claude 3.5",  dimension: "Safety",    score: 0.97, n: 115 },
  { model: "Claude 3.5",  dimension: "Code",      score: 0.92, n: 115 },
  { model: "Gemini 1.5",  dimension: "Reasoning", score: 0.87, n: 110 },
  { model: "Gemini 1.5",  dimension: "Safety",    score: 0.93, n: 110 },
  { model: "Gemini 1.5",  dimension: "Code",      score: 0.85, n: 110 },
  { model: "Llama 3.1",   dimension: "Reasoning", score: 0.82, n: 100 },
  { model: "Llama 3.1",   dimension: "Safety",    score: 0.89, n: 100 },
  { model: "Llama 3.1",   dimension: "Code",      score: 0.80, n: 100 },
  { model: "DeepSeek V3", dimension: "Reasoning", score: 0.89, n: 105 },
  { model: "DeepSeek V3", dimension: "Safety",    score: 0.90, n: 105 },
  { model: "DeepSeek V3", dimension: "Code",      score: 0.93, n: 105 },
];

export function aggregateByDimension(rows) {
  const buckets = new Map();
  for (const r of rows) {
    if (!buckets.has(r.dimension)) buckets.set(r.dimension, { sum: 0, count: 0 });
    const b = buckets.get(r.dimension);
    b.sum += r.score;
    b.count += 1;
  }
  return [...buckets.entries()].map(([dim, { sum, count }]) => ({
    dimension: dim,
    avgScore: +(sum / count).toFixed(3),
    runs: count,
  }));
}