export function renderBarChart(container, aggData) {
  // Limpa qualquer conteúdo anterior
  container.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = "Average Score by Dimension";
  container.appendChild(title);

  const canvasWrapper = document.createElement("div");
  canvasWrapper.style.position = "relative";
  canvasWrapper.style.height = "300px"; // Altura fixa evita resize loop
  container.appendChild(canvasWrapper);

  const canvas = document.createElement("canvas");
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", "Bar chart showing average scores per dimension");
  canvasWrapper.appendChild(canvas);

  // Guarda referência ao chart para destruir se re-renderizar
  if (container._chartInstance) {
    container._chartInstance.destroy();
  }

  const ctx = canvas.getContext("2d");
  
  try {
    container._chartInstance = new window.Chart(ctx, {
      type: "bar",
      data: {
        labels: aggData.map(d => d.dimension),
        datasets: [{
          label: "Avg Score (0–1)",
          data: aggData.map(d => d.avgScore),
          backgroundColor: "rgba(51,103,145,.78)",
          borderRadius: 6,
          maxBarThickness: 64,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Importante: permite altura fixa
        animation: { duration: 0 }, // Desativa animação inicial
        scales: { 
          y: { 
            beginAtZero: true, 
            max: 1, 
            ticks: { stepSize: 0.2 } 
          } 
        },
        plugins: { 
          legend: { display: false },
          tooltip: { enabled: true }
        }
      }
    });
  } catch (err) {
    console.error("Chart.js failed to initialize:", err);
    canvasWrapper.innerHTML = `<p style="color:red;">Error loading chart: ${err.message}</p>`;
  }
}