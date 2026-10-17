const COLS = [
  { key: "model",     label: "Model",     type: "str" },
  { key: "dimension", label: "Dimension", type: "str" },
  { key: "score",     label: "Score",     type: "num" },
  { key: "n",         label: "Runs (n)",  type: "num" },
];

export function renderSortableTable(container, rawData) {
  container.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = "Evaluation Runs Detail";
  container.appendChild(title);

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  table.append(thead, tbody);
  container.appendChild(table);

  let sortState = null; // { key, dir }

  // Cabeçalhos clicáveis
  const headRow = document.createElement("tr");
  for (const col of COLS) {
    const th = document.createElement("th");
    th.scope = "col";
    th.dataset.key = col.key;
    th.innerHTML = `${col.label}<span class="arrow">↕</span>`;
    
    th.addEventListener("click", () => {
      if (sortState?.key === col.key) {
        sortState = { key: col.key, dir: sortState.dir === "asc" ? "desc" : "asc" };
      } else {
        sortState = { key: col.key, dir: "asc" };
      }
      updateBody(rawData, tbody, sortState);
      syncArrows(headRow, sortState);
    });
    headRow.appendChild(th);
  }
  thead.appendChild(headRow);
  
  updateBody(rawData, tbody, null);
}

function updateBody(data, tbody, state) {
  const view = state 
    ? [...data].sort((a,b) => {
        const va = a[state.key], vb = b[state.key];
        const cmp = typeof va === 'number' ? va - vb : String(va).localeCompare(String(vb));
        return state.dir === "asc" ? cmp : -cmp;
      })
    : data;

  tbody.innerHTML = "";
  for (const row of view) {
    const tr = document.createElement("tr");
    for (const col of COLS) {
      const td = document.createElement("td");
      if (col.type === "num") td.className = "num";
      td.textContent = col.key === "score" ? row[col.key].toFixed(2) : row[col.key];
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
}

function syncArrows(headRow, state) {
  for (const th of headRow.children) {
    const arrow = th.querySelector(".arrow");
    if (state && th.dataset.key === state.key) {
      th.classList.add("sorted");
      arrow.textContent = state.dir === "asc" ? "▲" : "▼";
    } else {
      th.classList.remove("sorted");
      arrow.textContent = "↕";
    }
  }
}