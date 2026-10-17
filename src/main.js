import { evaluationRuns, aggregateByDimension } from "./data.js";
import { renderBarChart } from "./components/barChart.js";
import { renderSortableTable } from "./components/sortableTable.js";

document.addEventListener("DOMContentLoaded", () => {
  // Renderiza gráfico agregado
  renderBarChart(
    document.getElementById("chart-card"),
    aggregateByDimension(evaluationRuns)
  );

  // Renderiza tabela detalhada ordenável
  renderSortableTable(
    document.getElementById("table-card"),
    evaluationRuns
  );
});